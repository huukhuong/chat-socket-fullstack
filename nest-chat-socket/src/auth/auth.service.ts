import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import BaseException from 'src/utils/base-exception';
import BaseResponse from 'src/utils/base-response';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { User } from './user.entity';
import { UserDevice } from 'src/user-device/user-device.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
    private readonly jwtService: JwtService,
  ) {}

  async all() {
    const listUsers = await this.userRepository.find();
    return new BaseResponse({
      statusCode: HttpStatus.OK,
      isSuccess: true,
      data: listUsers,
    });
  }

  async login(params: LoginDto) {
    params = {
      ...params,
      username: params.username.trim(),
      password: params.password.trim(),
    };
    const userFind = await this.userRepository.findOne({
      where: [{ username: params.username }, { email: params.username }],
    });

    if (!userFind) {
      throw new BaseException({
        message: 'Email does not exist',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (userFind.deletedAt) {
      throw new BaseException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Your account has been locked',
      });
    }

    const checkPassword = bcrypt.compareSync(
      params.password,
      userFind.password,
    );

    if (!checkPassword) {
      throw new BaseException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Your password is incorrect',
      });
    }

    try {
      const userWithToken = await this.generateToken(userFind);
      const { user, accessToken, refreshToken } = userWithToken;
      delete user.password;

      return new BaseResponse({
        data: { ...user, accessToken, refreshToken },
        message: 'Logged in successfully',
      });
    } catch (error) {
      throw new BaseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async signUp(params: SignupDto, isAdmin = false) {
    params = {
      ...params,
      username: params.username.trim(),
      password: params.password.trim(),
      email: params.email.trim(),
      fullName: params.fullName.trim(),
    };
    const duplicatedUser = await this.userRepository.findOneBy({
      username: params.username,
    });

    if (duplicatedUser) {
      throw new BaseException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Username already exists',
      });
    }

    const duplicatedEmail = await this.userRepository.findOneBy({
      email: params.email,
    });

    if (duplicatedEmail) {
      throw new BaseException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Email already exists',
      });
    }

    const hashPassword = await this.hashPassword(params.password);

    const newUser = this.userRepository.create({
      fullName: params.fullName,
      username: params.username,
      email: params.email,
      password: hashPassword,
      isAdmin: isAdmin,
    });

    try {
      await this.userRepository.save(newUser);
      return this.login({
        username: params.username,
        password: params.password,
      });
    } catch (e) {
      throw new BaseException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async logout(deviceId: string) {
    try {
      const userDevice = await this.userDeviceRepository.findOne({
        where: { deviceId },
      });
      await this.userDeviceRepository.delete(userDevice);
      return new BaseResponse({
        data: null,
        message: 'Logout successfully',
      });
    } catch (e) {
      throw new BaseException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async lockUser(userId: string, status: boolean) {
    const userFound = await this.userRepository.findOneBy({ id: userId });

    if (!userFound) {
      throw new BaseException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }

    try {
      if (status) {
        const deletedUser = await this.userRepository.findOne({
          where: { id: userId },
          withDeleted: true,
        });

        if (deletedUser) {
          await this.userRepository.restore({ id: userId });
        }
      } else {
        await this.userRepository.softDelete({ id: userId });
      }

      return new BaseResponse({
        statusCode: 200,
        isSuccess: true,
        data: userFound.id,
        message: status
          ? `Mở khóa tài khoản ${userFound.username} thành công`
          : `Khóa tài khoản ${userFound.username} thành công`,
      });
    } catch (e) {
      throw new BaseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Có lỗi xảy ra.\n' + e.message,
      });
    }
  }

  async findOne(userId: string) {
    const userFound = await this.userRepository.findOneBy({ id: userId });
    if (userFound) {
      return new BaseResponse({
        statusCode: 200,
        isSuccess: true,
        data: userFound,
        message: 'Founded',
      });
    } else {
      throw new BaseException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not exists',
      });
    }
  }

  async setOnline(userId: string, isOnline: boolean): Promise<boolean> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        console.error(`User with ID ${userId} not found.`);
        return false;
      }

      await this.userRepository.update(userId, { isOnline });
      return true;
    } catch (error) {
      console.error(`Error setting online status for user ${userId}:`, error);
      return false;
    }
  }

  private async generateToken(payload: User) {
    const payloadJson = {
      userId: payload.id,
      username: payload.username,
    };

    const accessToken = await this.jwtService.signAsync(payloadJson, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN,
    });
    const refreshToken = await this.jwtService.signAsync(payloadJson, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
    });

    await this.userRepository.update(
      { id: payload.id },
      { refreshToken: refreshToken, updatedAt: () => 'updatedAt' },
    );

    const result: UserWithTokenDto = {
      user: { ...payload, refreshToken },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return result;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
