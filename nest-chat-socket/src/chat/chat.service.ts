import { HttpStatus, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/auth/user.entity';
import BaseException from 'src/utils/base-exception';
import BaseResponse from 'src/utils/base-response';
import {
  RelationshipType,
  UserRelationship,
} from 'src/user-relationship/user-relationship.entity';
import { FriendWithLastMessageDto } from './dto/friend-with-last-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRelationship)
    private readonly userRelationshipRepository: Repository<UserRelationship>,
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

  async findBetweenUsers(userId1: string, userId2: string) {
    const queryBuilder = this.messageRepository
      .createQueryBuilder('message')
      .where('message.senderId = :userId1 AND message.receiverId = :userId2', {
        userId1,
        userId2,
      })
      .orWhere(
        'message.senderId = :userId2 AND message.receiverId = :userId1',
        { userId1, userId2 },
      )
      .orderBy('message.createdAt', 'ASC');

    const res = await queryBuilder.getMany();

    return new BaseResponse({
      isSuccess: true,
      statusCode: HttpStatus.OK,
      data: res,
    });
  }

  async getFriendsWithLastestMessage(userId: string) {
    try {
      // Step 1: Get the list of friends
      const relationships = await this.userRelationshipRepository.find({
        where: [{ userFirstId: userId }, { userSecondId: userId }],
      });

      // only get friends
      const friendIds = relationships
        .filter((e) => e.type === RelationshipType.Friends)
        .map((rel) =>
          rel.userFirstId === userId ? rel.userSecondId : rel.userFirstId,
        );

      // Step 2: For each friend, get the last message
      const friendsWithLastMessage: FriendWithLastMessageDto[] = [];
      for (const friendId of friendIds) {
        const user = await this.userRepository.findOneBy({
          id: friendId,
        });

        const lastMessage = await this.messageRepository
          .createQueryBuilder('message')
          .where(
            '(message.senderId = :userId AND message.receiverId = :friendId) OR (message.senderId = :friendId AND message.receiverId = :userId)',
            { userId, friendId },
          )
          .orderBy('message.createdAt', 'DESC')
          .getOne();

        friendsWithLastMessage.push({
          user,
          lastMessage,
        });
      }

      return new BaseResponse({
        isSuccess: true,
        statusCode: HttpStatus.OK,
        data: friendsWithLastMessage,
      });
    } catch (error) {
      throw new BaseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error}`,
      });
    }
  }
}
