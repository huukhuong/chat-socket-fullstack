import BounceButton from '@components/BounceButton';
import FormGroup from '@components/FormGroup';
import InputAuth from '@components/InputAuth';
import LoadingModal from '@components/LoadingModal';
import Text from '@components/Text';
import { SignUpModel } from '@models/SignUpModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import api from '@services/api';
import authService from '@services/auth.service';
import { setCurrentUser } from '@stores/features/auth/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@utils/colors';
import { LocalKey, setLocalItem } from '@utils/localSave';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
  const navigation = useNavigation<NavigationHookType>();

  const signUpMethods = useForm<SignUpModel>();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const signUpMutation = useMutation({
    mutationFn: (body: SignUpModel) => authService.signUp(body),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (response?.data) {
        const { email, password } = signUpMethods.getValues();
        dispatch(setCurrentUser(response.data));
        api.updateBearerToken(response.data.accessToken);

        setLocalItem(LocalKey.userLogin, JSON.stringify(response.data));
        setLocalItem(LocalKey.username, email);
        setLocalItem(LocalKey.password, password);

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

  const handleSignUp = () => {
    const body = signUpMethods.getValues();
    if (!body.fullName) {
      Toast.show({
        type: 'error',
        text2: 'Please enter your name',
      });
      return;
    }
    if (!body.email) {
      Toast.show({
        type: 'error',
        text2: 'Please enter your email address',
      });
      return;
    }
    if (!body.password || !body.password) {
      Toast.show({
        type: 'error',
        text2: 'Please enter your password',
      });
      return;
    }
    if (body.password !== body.confirmPassword) {
      Toast.show({
        type: 'error',
        text2: 'Confirm password not match',
      });
      return;
    }
    signUpMutation.mutate({ ...body, username: body.email });
  };

  return (
    <>
      <View className="flex-1 px-4 bg-white">
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <FormProvider {...signUpMethods}>
            <Text className="text-center font-bold text-primary text-2xl py-5 mt-10">
              Sign up with Email
            </Text>

            <Text className="text-center text-placeholder px-8 mb-3">
              Get chatting with friends and family today by signing up for our
              chat app!
            </Text>

            <FormGroup className="my-4" name="fullName" label="Your name">
              <InputAuth autoCapitalize="words" />
            </FormGroup>

            <FormGroup className="my-4" name="email" label="Your Email">
              <InputAuth />
            </FormGroup>

            <FormGroup className="my-4" name="password" label="Password">
              <InputAuth secureTextEntry />
            </FormGroup>

            <FormGroup
              className="my-4"
              name="confirmPassword"
              label="Confirm password">
              <InputAuth secureTextEntry />
            </FormGroup>

            <BounceButton className="mt-5" onPress={handleSignUp}>
              <View className="h-[50px] rounded-xl overflow-hidden">
                <LinearGradient
                  className="flex-1 justify-center items-center"
                  colors={[colors.gradientDark, colors.gradientLight]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text className="text-white font-bold">Sign up</Text>
                </LinearGradient>
              </View>
            </BounceButton>
          </FormProvider>
        </ScrollView>

        <View className="flex-row justify-center items-center bg-white p-2">
          <Text className="text-gray-500">Already have an account?</Text>
          <BounceButton onPress={() => navigation.navigate('LogInPage')}>
            <Text className="font-bold text-primary py-2 px-1">Log in</Text>
          </BounceButton>
        </View>
      </View>

      <LoadingModal />
    </>
  );
};

export default SignUpPage;
