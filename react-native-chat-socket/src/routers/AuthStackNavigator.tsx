import { LogInPage, SignUpPage } from '@pages/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParams } from './RootStackParams';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParams>();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LogInPage">
        <Stack.Screen name="LogInPage" component={LogInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;
