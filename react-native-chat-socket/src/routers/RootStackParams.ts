import { UserModel } from '@models/UserModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  SplashPage: undefined;
  LoginPage: undefined;
  HomePage: undefined;
  ChatPage: { receiverUser: UserModel };
};

export type NavigationHookType = NativeStackNavigationProp<RootStackParams>;
