import BounceButton from '@components/BounceButton';
import Icon from '@components/Icon';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import { FlashList } from '@shopify/flash-list';
import { setCurrentUser } from '@stores/features/auth/authSlice';
import colors from '@utils/colors';
import { LocalKey, removeLocalItem } from '@utils/localSave';
import React from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const navigation = useNavigation<NavigationHookType>();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    removeLocalItem(LocalKey.userLogin);
    navigation.replace('LogInPage');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />

      <LinearGradient
        colors={[colors.gradientDark, colors.gradientLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      {/* HEADER */}
      <View
        className={`bg-transparent flex-row justify-between items-center px-4 pt-4`}
        style={{ marginTop: insets.top }}>
        <BounceButton>
          <Icon
            type="AntDesign"
            name="search1"
            size={24}
            color="#fff"
            className="bg-white/30 h-12 w-12 justify-center items-center rounded-full"
          />
        </BounceButton>

        <Text className="font-bold text-white text-xl">HOME</Text>

        <BounceButton>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }}
            className="h-12 w-12 rounded-full"
          />
        </BounceButton>
      </View>

      {/* STORIES LIST */}
      <View className="py-8">
        <FlashList
          estimatedItemSize={100}
          data={Array.from(Array(10))}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => {
            return (
              <BounceButton pressedScale={0.9}>
                <View className="w-16 h-16 rounded-full p-[1.5px] border-2 border-yellow-400">
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                    }}
                    className="h-full w-full rounded-full"
                  />
                </View>
              </BounceButton>
            );
          }}
          ItemSeparatorComponent={() => <View className="w-3" />}
          ListFooterComponent={<View className="w-4" />}
          ListHeaderComponent={<View className="w-4" />}
        />
      </View>

      {/* CHATS LIST */}
      <View className="flex-1 bg-white rounded-t-3xl overflow-hidden">
        <FlashList
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          data={Array.from(Array(20))}
          renderItem={() => {
            return (
              <View className="bg-placeholder">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatPage', {
                      receiverUser: undefined,
                    })
                  }
                  activeOpacity={0.8}
                  className="bg-white flex-row items-center px-4 py-3 space-x-3">
                  <View>
                    <Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                      }}
                      className="h-14 w-14 rounded-full"
                    />
                    <View className="h-3 w-3 bg-green-500 rounded-full absolute bottom-0 right-1 border border-white" />
                  </View>

                  <View className="flex-1">
                    <Text className="font-bold text-lg">Alex Linderson</Text>
                    <Text className="text-placeholder">How are you today?</Text>
                  </View>

                  <View>
                    <Text className="text-placeholder mb-2">2 min ago</Text>
                    <View className="bg-red-500 ml-auto w-6 h-6 rounded-full justify-center items-center">
                      <Text className="text-white font-bold text-xs">2</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={<View style={{ height: insets.bottom }} />}
          ListHeaderComponent={<View className="h-4" />}
        />
      </View>
    </View>
  );
};

export default HomePage;
