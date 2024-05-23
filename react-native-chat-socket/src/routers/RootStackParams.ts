import { UserModel } from '@models/UserModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  SplashPage: undefined;
  SignUpPage: undefined;
  LogInPage: undefined;
  HomePage: undefined;
  ChatPage: { receiverUser?: UserModel };
  FriendRequestPage: undefined;
};

export type NavigationHookType = NativeStackNavigationProp<RootStackParams>;
