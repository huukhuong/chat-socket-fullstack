import { LoginModel } from '@models/LoginModel';
import api from './api';
import { UserModel } from '@models/UserModel';
import { SignUpModel } from '@models/SignUpModel';

const login = async (body: LoginModel) => {
  return await api.post<UserModel>('/auth/login', body);
};

const signUp = async (body: SignUpModel) => {
  return await api.post<UserModel>('/auth/signup', body);
};

const listUsers = async () => {
  return await api.get<UserModel[]>('/auth/all');
};

const authService = {
  login,
  signUp,
  listUsers,
};
export default authService;
