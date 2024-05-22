import Images from '@assets/images';
import BounceButton from '@components/BounceButton';
import FormGroup from '@components/FormGroup';
import InputAuth from '@components/InputAuth';
import LoadingModal from '@components/LoadingModal';
import Text from '@components/Text';
import { LoginModel } from '@models/LoginModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import api from '@services/api';
import authService from '@services/auth.service';
import { setCurrentUser } from '@stores/features/auth/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@utils/colors';
import { getLocalItem, LocalKey, setLocalItem } from '@utils/localSave';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, ScrollView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const navigation = useNavigation<NavigationHookType>();

  const loginMethods = useForm<LoginModel>();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  useEffect(() => {
    fillRememberCredentials();
  }, []);

  const fillRememberCredentials = async () => {
    const username = await getLocalItem(LocalKey.username);
    const password = await getLocalItem(LocalKey.password);

    loginMethods.setValue('username', username || '');
    loginMethods.setValue('password', password || '');
  };

  const loginMutation = useMutation({
    mutationFn: (body: LoginModel) => authService.login(body),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (response?.data) {
        const { username, password } = loginMethods.getValues();
        dispatch(setCurrentUser(response.data));
        api.updateBearerToken(response.data.accessToken);

        setLocalItem(LocalKey.userLogin, JSON.stringify(response.data));
        setLocalItem(LocalKey.username, username);
        setLocalItem(LocalKey.password, password);
        navigation.replace('HomePage');

        Toast.show({
          type: 'success',
          text2: response.message,
        });
      }
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });

  const handleLogin = async () => {
    const { username, password } = loginMethods.getValues();
    if (!username) {
      Toast.show({
        type: 'error',
        text2: 'Please enter username or email address',
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: 'error',
        text2: 'Please enter your password',
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <>
      <View className="flex-1 px-4 bg-white">
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <FormProvider {...loginMethods}>
            <Text className="text-center font-bold text-primary text-2xl py-5 mt-10">
              Log in to Chatbox
            </Text>

            <Text className="text-center text-placeholder px-8">
              Welcome back! Sign in using your social account or email to
              continue us
            </Text>

            <View className="flex-row justify-center items-center my-6">
              <Image source={Images.IC_FACEBOOK} className="w-16 h-16" />
              <Image source={Images.IC_GOOGLE} className="w-16 h-16" />
              <Image source={Images.IC_APPLE} className="w-16 h-16" />
            </View>

            <View className="flex-row justify-center items-center mb-3">
              <View className="h-[1px] bg-gray-300 w-full" />
              <Text className="absolute bg-white px-4 text-placeholder font-bold text-lg">
                OR
              </Text>
            </View>

            <FormGroup
              className="my-4"
              name="username"
              label="Username or Email">
              <InputAuth />
            </FormGroup>

            <FormGroup className="my-4" name="password" label="Password">
              <InputAuth secureTextEntry />
            </FormGroup>

            <BounceButton className="mt-5" onPress={handleLogin}>
              <View className="h-[50px] rounded-xl overflow-hidden">
                <LinearGradient
                  className="flex-1 justify-center items-center"
                  colors={[colors.gradientDark, colors.gradientLight]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text className="text-white font-bold">Log in</Text>
                </LinearGradient>
              </View>
            </BounceButton>

            <BounceButton className="justify-center items-center mt-2 py-2 px-4 mx-auto">
              <Text className="text-primary font-bold">Forgot password?</Text>
            </BounceButton>
          </FormProvider>
        </ScrollView>
      </View>

      <LoadingModal />
    </>
  );
};

export default LoginPage;
