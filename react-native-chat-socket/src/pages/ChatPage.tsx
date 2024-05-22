import { Image, StatusBar, TextInput, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '@routers/RootStackParams';
import appStyle from '@utils/appStyles';
import Text from '@components/Text';
import BounceButton from '@components/BounceButton';
import Icon from '@components/Icon';
import colors from '@utils/colors';
import { FlashList } from '@shopify/flash-list';

type Props = NativeStackScreenProps<RootStackParams, 'ChatPage'>;
const ChatPage = ({ route }: Props) => {
  const { receiverUser } = route.params;
  const flatListRef = useRef<FlashList<any>>(null);

  useEffect(() => {}, []);

  const handleSend = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  return (
    <View className="flex-1">
      <StatusBar
        translucent={false}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      {/* HEADER */}
      <View
        style={appStyle.shadowMd}
        className="bg-white px-4 h-20 flex-row items-center z-10">
        <BounceButton>
          <Icon
            type="AntDesign"
            name="arrowleft"
            size={24}
            className="h-full justify-center items-center -ml-4 px-4"
          />
        </BounceButton>

        <View>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/75.jpg',
            }}
            className="h-12 w-12 rounded-full"
          />
          <View className="h-3 w-3 bg-green-500 rounded-full absolute bottom-0 right-1 border border-white" />
        </View>

        <View className="ml-3">
          <Text className="font-bold text-lg">Alex Linderson</Text>
          <Text className="text-placeholder">Active now</Text>
        </View>
      </View>

      {/* MESSAGES LIST */}
      <View className="flex-1 bg-white">
        <FlashList
          ref={flatListRef}
          estimatedItemSize={200}
          data={Array.from(Array(20))}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            const rand = Math.floor(Math.random() * 2) + 1;
            const isMe = rand % 2;

            return (
              <View
                className={`w-full px-4 py-2 flex-row ${
                  isMe ? 'justify-end' : 'justify-start'
                }`}>
                <Text
                  className={`rounded-xl px-4 py-2 ${
                    isMe
                      ? 'bg-primary rounded-tr-none text-white'
                      : 'bg-gray-200 rounded-tl-none text-black'
                  }`}>
                  Hello
                </Text>
              </View>
            );
          }}
          ListHeaderComponent={<View className="h-2" />}
          ListFooterComponent={<View className="h-2" />}
        />
      </View>

      {/* INPUT */}
      <View className="flex-row items-center bg-white border-t-[0.5px] border-placeholder px-4 py-2">
        <BounceButton
          pressedScale={0.8}
          className="-ml-4 px-4 h-[50px] justify-center">
          <Icon
            type="AntDesign"
            name="camera"
            color={colors.primary}
            size={24}
          />
        </BounceButton>

        <TextInput
          className="bg-gray-100 flex-1 rounded-2xl px-4 min-h-[45px] max-h-[200px]"
          placeholder="Write your message"
          multiline
          cursorColor={colors.primary}
        />

        <BounceButton
          onPress={handleSend}
          pressedScale={0.8}
          className="-mr-4 px-4 h-[50px] justify-center">
          <Icon type="Ionicons" name="send" color={colors.primary} size={24} />
        </BounceButton>
      </View>
    </View>
  );
};

export default ChatPage;
