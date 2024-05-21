import Images from '@assets/images';
import BounceButton from '@components/BounceButton';
import FormGroup from '@components/FormGroup';
import InputAuth from '@components/InputAuth';
import Text from '@components/Text';
import { LoginModel } from '@models/LoginModel';
import colors from '@utils/colors';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginPage = () => {
  const loginMethods = useForm<LoginModel>();

  const handleLogin = () => {
    loginMethods.handleSubmit(async () => {
      // TODO: call api login
      console.log(loginMethods.getValues());
    })();
  };

  return (
    <View className="flex-1 px-4 bg-white">
      <ScrollView keyboardShouldPersistTaps="handled">
        <FormProvider {...loginMethods}>
          <Text className="text-center font-bold text-primary text-2xl py-5 mt-10">
            Log in to Chatbox
          </Text>

          <Text className="text-center text-placeholder px-8">
            Welcome back! Sign in using your social account or email to continue
            us
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

          <FormGroup className="my-4" name="username" label="Username">
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
                <Text className="text-white font-bold">Đăng nhập</Text>
              </LinearGradient>
            </View>
          </BounceButton>

          <BounceButton className="justify-center items-center mt-2 py-2 px-4 mx-auto">
            <Text className="text-primary font-bold">Forgot password?</Text>
          </BounceButton>
        </FormProvider>
      </ScrollView>
    </View>
  );
};

export default LoginPage;
