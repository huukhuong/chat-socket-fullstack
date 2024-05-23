import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRelationshipService } from './user-relationship.service';
import { RequestFriendDto } from './dto/request-friend.dto';

@Controller('user-relationship')
@ApiTags('User Relationship')
@ApiBearerAuth()
export class UserRelationshipController {
  constructor(
    private readonly userRelationShipService: UserRelationshipService,
  ) {}

  @Post('request-friend')
  requestFriend(@Body() body: RequestFriendDto) {
    return this.userRelationShipService.requestFriend(body);
  }

  @Put('accept-friend/:relationId')
  acceptFriend(@Param('relationId') relationId: number) {
    return this.userRelationShipService.acceptFriend(Number(relationId));
  }
}
