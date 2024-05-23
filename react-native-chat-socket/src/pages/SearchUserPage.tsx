import BounceButton from '@components/BounceButton';
import Icon from '@components/Icon';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookType } from '@routers/RootStackParams';
import userRelationshipService from '@services/userRelationship.service';
import { FlashList } from '@shopify/flash-list';
import { RootState } from '@stores/appStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import appStyle from '@utils/appStyles';
import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const SearchUserPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationHookType>();

  const queryClient = useQueryClient();

  const { data: listNotRelation, refetch: fetchListRequests } = useQuery({
    queryKey: ['listNotRelation', currentUser?.id],
    queryFn: () => userRelationshipService.getListNotRelation(currentUser?.id),
  });

  const sendRequestMutation = useMutation({
    mutationFn: (body: { userRequestId: string; userTargetId: string }) =>
      userRelationshipService.requestFriend(body),
    onSuccess: _ => {
      queryClient.invalidateQueries({ queryKey: ['acceptFriend'] });
      fetchListRequests();
    },
  });

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={'dark-content'} />
      <View
        className="bg-white p-4 flex-row items-center"
        style={{
          ...appStyle.shadowMd,
          height: insets.top + 60,
          paddingTop: insets.top,
        }}>
        <BounceButton onPress={() => navigation.goBack()}>
          <Icon
            type="AntDesign"
            name="arrowleft"
            size={24}
            className="h-full justify-center items-center -ml-4 px-4"
          />
        </BounceButton>

        <Text className="font-bold text-center text-xl">Friend requests</Text>
      </View>

      <View className="bg-white p-4">
        <Text className="font-bold text-center text-xl">
          Add new friend and start your chatbox
        </Text>
      </View>

      <View className="flex-1">
        {listNotRelation?.data && listNotRelation.data.length ? (
          <FlashList
            estimatedItemSize={200}
            data={listNotRelation?.data || []}
            renderItem={({ item }) => (
              <View className="flex-row items-center space-x-3 px-4 py-2">
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/76.jpg',
                  }}
                  className="w-20 h-20 rounded-full border border-placeholder"
                />

                <View className="flex-1 space-y-2">
                  <Text className="font-bold text-lg">{item.fullName}</Text>

                  <View className="flex-row items-center space-x-2">
                    <BounceButton
                      className="flex-1"
                      onPress={() =>
                        sendRequestMutation.mutate({
                          userRequestId: currentUser?.id || '',
                          userTargetId: item.id,
                        })
                      }>
                      <View className="bg-primary justify-center items-center rounded-lg h-[40px]">
                        <Text className="text-white">Add friend</Text>
                      </View>
                    </BounceButton>

                    <View className="flex-1" />
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>No user available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchUserPage;
