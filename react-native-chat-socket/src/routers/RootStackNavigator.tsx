import { SignUpPage } from '@pages/auth';
import ChatPage from '@pages/ChatPage';
import HomePage from '@pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParams } from './RootStackParams';
import FriendRequestPage from '@pages/FriendRequestPage';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />

        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{
            animation: 'ios',
          }}
        />

        <Stack.Screen
          name="FriendRequestPage"
          component={FriendRequestPage}
          options={{
            animation: 'ios',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
