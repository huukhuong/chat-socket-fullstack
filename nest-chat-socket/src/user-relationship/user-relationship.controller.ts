import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('list-requests/:userId')
  listRequests(@Param('userId') userId: string) {
    return this.userRelationShipService.listRequests(userId);
  }

  @Get('list-not-relation/:userId')
  listNotRelation(@Param('userId') userId: string) {
    return this.userRelationShipService.listNotRelation(userId);
  }

  @Post('request-friend')
  requestFriend(@Body() body: RequestFriendDto) {
    return this.userRelationShipService.requestFriend(body);
  }

  @Put('accept-friend/:relationId')
  acceptFriend(@Param('relationId') relationId: number) {
    return this.userRelationShipService.acceptFriend(Number(relationId));
  }

  @Put('cancel-friend/:relationId')
  cancelFriendRequest(@Param('relationId') relationId: number) {
    return this.userRelationShipService.cancelFriendRequest(Number(relationId));
  }

  @Put('delete-friend/:relationId')
  deleteFriend(@Param('relationId') relationId: number) {
    return this.userRelationShipService.deleteFriend(Number(relationId));
  }
}
