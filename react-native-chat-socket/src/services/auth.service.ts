import { LoginModel } from '@models/LoginModel';
import api from './api';
import { UserModel } from '@models/UserModel';

const login = async (body: LoginModel) => {
  return await api.post<UserModel>('/auth/login', body);
};

const authService = {
  login,
};
export default authService;
