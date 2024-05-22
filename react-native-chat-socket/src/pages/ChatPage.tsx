import { Image, StatusBar, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '@routers/RootStackParams';
import appStyle from '@utils/appStyles';
import Text from '@components/Text';
import BounceButton from '@components/BounceButton';
import Icon from '@components/Icon';
import colors from '@utils/colors';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/appStore';
import { MessageModel } from '@models/MessageModel';
import socketService from '@services/socket.service';
import { useQuery } from '@tanstack/react-query';
import chatService from '@services/chat.service';

type Props = NativeStackScreenProps<RootStackParams, 'ChatPage'>;
const ChatPage = ({ navigation, route }: Props) => {
  const { receiverUser } = route.params;
  const flatListRef = useRef<FlashList<any>>(null);

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const { data: messages } = useQuery({
    queryKey: ['messages', currentUser, receiverUser],
    queryFn: () =>
      chatService.findMessagesBetweenUsers(currentUser?.id, receiverUser?.id),
  });

  const [listMessage, setListMessage] = useState<MessageModel[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socketService.getSocket()?.on('message', e => {
      setListMessage(e);
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  useEffect(() => {
    setListMessage(messages?.data || []);
  }, [messages]);

  const handleSend = () => {
    if (currentUser && receiverUser) {
      const message: MessageModel = {
        senderId: currentUser?.id,
        content: input,
        receiverId: receiverUser?.id,
        type: 'text',
      };

      setInput('');
      socketService.getSocket()?.emit('message', message);
    }
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
        <BounceButton onPress={() => navigation.goBack()}>
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
          <Text className="font-bold text-lg">{receiverUser?.fullName}</Text>
          <Text className="text-placeholder">Active now</Text>
        </View>
      </View>

      {/* MESSAGES LIST */}
      <View className="flex-1 bg-white">
        <FlashList
          ref={flatListRef}
          estimatedItemSize={200}
          data={listMessage}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isMe = item.senderId === currentUser?.id;

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
                  {item.content}
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
          value={input}
          onChangeText={setInput}
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
