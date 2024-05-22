import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalKey = {
  userLogin: 'userLogin',
  baseUrl: 'baseUrl',
  username: 'username',
  password: 'password',
  language: 'language',
  deviceId: 'deviceId',
};

export const setLocalItem = async (key: string, data: string) => {
  return await AsyncStorage.setItem(key, data);
};

export const getLocalItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeLocalItem = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
