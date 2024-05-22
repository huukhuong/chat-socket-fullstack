import { View } from 'react-native';
import React from 'react';
import BounceButton from '@components/BounceButton';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@stores/features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import Text from '@components/Text';
import { LocalKey, removeLocalItem } from '@utils/localSave';

const HomePage = () => {
  const navigation = useNavigation<NavigationHookType>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    removeLocalItem(LocalKey.userLogin);
    navigation.replace('LogInPage');
  };

  return (
    <View className="flex-1 bg-white">
      <BounceButton onPress={handleLogout} className="mx-auto my-10">
        <View className="bg-primary px-6 py-3 rounded-md">
          <Text className="text-white">Clear user</Text>
        </View>
      </BounceButton>
    </View>
  );
};

export default HomePage;
