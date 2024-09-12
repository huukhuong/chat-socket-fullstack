import { RelationshipType } from './RelationshipType';

export interface FriendRequestModel {
  id: number;
  type: RelationshipType;
  userFirst: UserItemRequestModel;
  userSecond: UserItemRequestModel;
}

interface UserItemRequestModel {
  id: string;
  avartar: string | null;
  fullName: string;
}
