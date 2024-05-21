import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParams } from './RootStackParams';
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/HomePage';
import ChatPage from '@pages/ChatPage';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
