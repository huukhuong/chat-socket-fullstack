import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDevice } from './user-device.entity';
import { Repository } from 'typeorm';
import { AddUserDeviceDto } from './dto/add-user-device.dto';
import BaseResponse from 'src/utils/base-response';
import BaseException from 'src/utils/base-exception';

@Injectable()
export class UserDeviceService {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
  ) {}

  async addUserDevice(body: AddUserDeviceDto) {
    try {
      const userDevice = new UserDevice();
      userDevice.userId = body.userId;
      userDevice.deviceId = body.deviceId;
      userDevice.socketId = body.socketId;

      // tìm xem có tồn tại user + deviceId chưa
      // có rồi thì add user + socket thôi
      const userAndDeviceFound = await this.userDeviceRepository.findBy({
        userId: body.userId,
        deviceId: body.deviceId,
      });

      if (userAndDeviceFound.length) {
        userDevice.deviceId = null;
      }

      const record = this.userDeviceRepository.create(userDevice);
      const res = await this.userDeviceRepository.save(record);
      return new BaseResponse({
        statusCode: HttpStatus.CREATED,
        isSuccess: true,
        data: res,
      });
    } catch (e) {
      throw new BaseException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteUserDevice(body: AddUserDeviceDto) {
    try {
      const userDevice = await this.userDeviceRepository.findOne({
        where: [
          body.socketId
            ? {
                socketId: body.socketId,
              }
            : {},
          body.deviceId ? { deviceId: body.deviceId } : {},
        ],
      });

      const res = await this.userDeviceRepository.delete(userDevice);

      return new BaseResponse({
        statusCode: HttpStatus.OK,
        isSuccess: true,
        data: res,
      });
    } catch (e) {
      throw new BaseException({
        message: e.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getAllDeviceIds(userId: string) {
    const records = await this.userDeviceRepository.findBy({
      userId: userId,
    });

    return records.map((device) => device.deviceId);
  }

  async getAllSocketIds(userId: string) {
    const records = await this.userDeviceRepository.findBy({
      userId: userId,
    });

    return records.map((device) => device.socketId);
  }
}
