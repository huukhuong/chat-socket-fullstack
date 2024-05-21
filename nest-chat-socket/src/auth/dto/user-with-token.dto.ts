import { User } from '../user.entity';

export interface UserWithTokenDto {
  user: User;
  accessToken: string;
  refreshToken: string;
}
