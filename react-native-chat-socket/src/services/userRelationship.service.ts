import { FriendRequestModel } from '@models/FriendRequestModel';
import api from './api';

const getListRequests = async (userId?: string) => {
  return await api.get<FriendRequestModel[]>(
    'user-relationship/list-requests/' + userId,
  );
};

const requestFriend = async (params: {
  userRequestId: string;
  userTargetId: string;
}) => {
  return await api.post('user-relationship/request-friend', params);
};

const acceptFriend = async (relationId: number) => {
  return await api.put('user-relationship/accept-friend/' + relationId);
};

const cancelFriendRequest = async (relationId: number) => {
  return await api.put('user-relationship/cancel-friend/' + relationId);
};

const deleteFriend = async (relationId: number) => {
  return await api.put('user-relationship/delete-friend/' + relationId);
};

const userRelationshipService = {
  getListRequests,
  requestFriend,
  acceptFriend,
  cancelFriendRequest,
  deleteFriend,
};

export default userRelationshipService;
