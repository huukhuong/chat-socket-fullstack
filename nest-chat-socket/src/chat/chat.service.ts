import { HttpStatus, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/auth/user.entity';
import BaseException from 'src/utils/base-exception';
import BaseResponse from 'src/utils/base-response';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendMessage(body: SendMessageDto) {
    const senderUser = this.userRepository.findOneBy({
      id: body.senderId,
    });

    if (!senderUser) {
      throw new BaseException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Không tìm thấy người gửi',
      });
    }

    const receiverUser = this.userRepository.findOneBy({
      id: body.receiverId,
    });

    if (!receiverUser) {
      throw new BaseException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Không tìm thấy người nhận',
      });
    }

    try {
      const message = new Message();
      message.content = body.content;
      message.senderId = body.senderId;
      message.receiverId = body.receiverId;
      message.type = body.type;
      message.isEdited = false;
      console.log(message);

      await this.messageRepository.save(message);

      return new BaseResponse({
        isSuccess: true,
        statusCode: HttpStatus.OK,
        data: message,
      });
    } catch (error) {
      throw new BaseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Đã có lỗi xảy ra. ${error}`,
      });
    }
  }

  async findAll() {
    return await this.messageRepository.find();
  }
}
