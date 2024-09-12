import { FriendRequestModel } from '@models/FriendRequestModel';
import api from './api';
import { UserModel } from '@models/UserModel';

const getListRequests = async (userId?: string) => {
  return await api.get<FriendRequestModel[]>(
    '/user-relationship/list-requests/' + userId,
  );
};

const getListNotRelation = async (userId?: string) => {
  return await api.get<UserModel[]>(
    '/user-relationship/list-not-relation/' + userId,
  );
};

const requestFriend = async (params: {
  userRequestId: string;
  userTargetId: string;
}) => {
  return await api.post('/user-relationship/request-friend', params);
};

const acceptFriend = async (relationId: number) => {
  return await api.put('/user-relationship/accept-friend/' + relationId);
};

const cancelFriendRequest = async (relationId: number) => {
  return await api.put('/user-relationship/cancel-friend/' + relationId);
};

const deleteFriend = async (relationId: number) => {
  return await api.put('/user-relationship/delete-friend/' + relationId);
};

const userRelationshipService = {
  getListRequests,
  getListNotRelation,
  requestFriend,
  acceptFriend,
  cancelFriendRequest,
  deleteFriend,
};

export default userRelationshipService;
