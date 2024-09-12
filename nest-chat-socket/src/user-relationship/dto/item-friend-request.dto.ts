import { RelationshipType } from "../user-relationship.entity";

export class ItemFriendRequestDto {
  id: number;
  type: RelationshipType;
  userFirst: UserItemRequest;
  userSecond: UserItemRequest;
}

class UserItemRequest {
  id: string;
  fullName: string;
  avartar: string;
}
