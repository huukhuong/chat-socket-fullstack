import Images from '@assets/images';
import { UserModel } from '@models/UserModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import { setCurrentUser } from '@stores/features/auth/authSlice';
import colors from '@utils/colors';
import { getLocalItem, LocalKey } from '@utils/localSave';
import React, { useEffect } from 'react';
import { Image, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const SplashPage = () => {
  const navigation = useNavigation<NavigationHookType>();

  const dispatch = useDispatch();

  const logoPosition = useSharedValue(0);
  const logoAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoPosition.value }],
    };
  });
  logoPosition.value = withRepeat(
    withTiming(10, { duration: 500 }),
    Infinity,
    true,
  );

  useEffect(() => {
    getUserLocalStorage();
  }, []);

  const getUserLocalStorage = async () => {
    const userStr = await getLocalItem(LocalKey.userLogin);
    setTimeout(() => {
      if (userStr) {
        const userObj = JSON.parse(userStr) as UserModel;
        dispatch(setCurrentUser(userObj));
        navigation.replace('HomePage');
      } else {
        dispatch(setCurrentUser(null));
        navigation.replace('LoginPage');
      }
    }, 1000);
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />

      <LinearGradient
        colors={[colors.gradientLight, colors.gradientDark]}
        className="flex-1 justify-center items-center">
        <Animated.Image
          style={logoAnimation}
          source={Images.APP_LOGO}
          className="w-[200px] h-[200px]"
        />
      </LinearGradient>
    </View>
  );
};

export default SplashPage;
