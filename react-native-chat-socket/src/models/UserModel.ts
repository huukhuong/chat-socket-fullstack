export interface UserModel {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  avartar: string | null;
  isAdmin: boolean;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  accessToken: string;
  isOnline?: boolean;
}
