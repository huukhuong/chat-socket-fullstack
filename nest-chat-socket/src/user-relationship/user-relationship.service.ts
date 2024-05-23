import { HttpStatus, Injectable } from '@nestjs/common';
import { RequestFriendDto } from './dto/request-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { RelationshipType, UserRelationship } from './user-relationship.entity';
import BaseException from 'src/utils/base-exception';
import BaseResponse from 'src/utils/base-response';

@Injectable()
export class UserRelationshipService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRelationship)
    private readonly userRelationshipRepository: Repository<UserRelationship>,
  ) {}

  async requestFriend(body: RequestFriendDto) {
    const userRequest = await this.userRepository.findOneBy({
      id: body.userRequestId,
    });

    if (!userRequest) {
      throw new BaseException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User request not found',
      });
    }

    const userTarget = await this.userRepository.findOneBy({
      id: body.userTargetId,
    });

    if (!userTarget) {
      throw new BaseException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User target not found',
      });
    }

    try {
      const userRelationShip = new UserRelationship();
      userRelationShip.userFirstId = userRequest.id;
      userRelationShip.userSecondId = userTarget.id;
      userRelationShip.type = RelationshipType.PendingFirstSecond;
      const record = this.userRelationshipRepository.create(userRelationShip);
      await this.userRelationshipRepository.save(record);
      return new BaseResponse({
        statusCode: HttpStatus.CREATED,
        isSuccess: true,
        data: record,
        message: 'Request friend successfully',
      });
    } catch (error) {
      throw new BaseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error}`,
      });
    }
  }

  async acceptFriend(relationId: number) {
    const relation = await this.userRelationshipRepository.findOneBy({
      id: relationId,
    });

    if (relation) {
      relation.type = RelationshipType.Friends;
      await this.userRelationshipRepository.update(relationId, relation);
      return new BaseResponse({
        statusCode: HttpStatus.OK,
        isSuccess: true,
        data: relation,
        message: 'Accept friend successfully',
      });
    } else {
      throw new BaseException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Request not found',
      });
    }
  }
}
