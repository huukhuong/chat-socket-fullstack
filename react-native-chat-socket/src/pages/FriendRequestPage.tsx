import BounceButton from '@components/BounceButton';
import Icon from '@components/Icon';
import Text from '@components/Text';
import { FriendRequestModel } from '@models/FriendRequestModel';
import { RelationshipType } from '@models/RelationshipType';
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

const FriendRequestPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationHookType>();

  const queryClient = useQueryClient();

  const { data: listRequests, refetch: fetchListRequests } = useQuery({
    queryKey: ['friendsRequests', currentUser?.id],
    queryFn: () => userRelationshipService.getListRequests(currentUser?.id),
  });

  const acceptMutation = useMutation({
    mutationFn: (relationId: number) =>
      userRelationshipService.acceptFriend(relationId),
    onSuccess: _ => {
      queryClient.invalidateQueries({ queryKey: ['acceptFriend'] });
      fetchListRequests();
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (relationId: number) =>
      userRelationshipService.cancelFriendRequest(relationId),
    onSuccess: _ => {
      queryClient.invalidateQueries({ queryKey: ['cancelFriendRequest'] });
      fetchListRequests();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (relationId: number) =>
      userRelationshipService.deleteFriend(relationId),
    onSuccess: _ => {
      queryClient.invalidateQueries({ queryKey: ['deleteFriend'] });
      fetchListRequests();
    },
  });

  const renderButtons = (requestByMe: boolean, item: FriendRequestModel) => {
    if (requestByMe) {
      return (
        <>
          <View className="flex-1 bg-primary/40 justify-center items-center rounded-lg h-[40px]">
            <Text className="text-white">Request sent</Text>
          </View>

          <BounceButton
            onPress={() => deleteMutation.mutate(item.id)}
            className="flex-1">
            <View className="bg-gray-200 justify-center items-center rounded-lg h-[40px]">
              <Text className="text-black">Cancel</Text>
            </View>
          </BounceButton>
        </>
      );
    }

    if (item.type === RelationshipType.Cancel) {
      return (
        <>
          <BounceButton className="flex-1">
            <View className="bg-red-100 justify-center items-center rounded-lg h-[40px]">
              <Text className="text-red-500 font-bold">User refuses</Text>
            </View>
          </BounceButton>
          <View className="flex-1" />
        </>
      );
    }

    return (
      <>
        <BounceButton
          className="flex-1"
          onPress={() => acceptMutation.mutate(item.id)}>
          <View className="bg-primary justify-center items-center rounded-lg h-[40px]">
            <Text className="text-white">Accept</Text>
          </View>
        </BounceButton>

        <BounceButton
          onPress={() => cancelMutation.mutate(item.id)}
          className="flex-1">
          <View className="bg-gray-200 justify-center items-center rounded-lg h-[40px]">
            <Text className="text-black">Cancel</Text>
          </View>
        </BounceButton>
      </>
    );
  };

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

      <View className="flex-1">
        {listRequests?.data && listRequests.data.length ? (
          <FlashList
            estimatedItemSize={200}
            data={listRequests?.data || []}
            renderItem={({ item }) => {
              let requestByMe = false;
              if (
                item.userFirst.id === currentUser?.id &&
                item.type === RelationshipType.Pending
              ) {
                requestByMe = true;
              }

              const displayUser =
                currentUser?.id === item.userFirst.id
                  ? item.userSecond
                  : item.userFirst;

              return (
                <View
                  key={item.id}
                  className="flex-row items-center space-x-2 px-4 py-2">
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/76.jpg',
                    }}
                    className="w-20 h-20 rounded-full border border-placeholder"
                  />

                  <View className="space-y-2 flex-1">
                    <Text className="font-bold text-lg">
                      {displayUser.fullName}
                    </Text>

                    <View className="flex-row items-center space-x-2">
                      {renderButtons(requestByMe, item)}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>No friend request available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FriendRequestPage;
