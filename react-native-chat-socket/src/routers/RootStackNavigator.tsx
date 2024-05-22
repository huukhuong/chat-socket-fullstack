import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParams } from './RootStackParams';
import { LogInPage, SignUpPage } from '@pages/auth';
import HomePage from '@pages/HomePage';
import ChatPage from '@pages/ChatPage';
import SplashPage from '@pages/SplashPage';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SplashPage">
        <Stack.Screen name="SplashPage" component={SplashPage} />
        <Stack.Screen name="LogInPage" component={LogInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
