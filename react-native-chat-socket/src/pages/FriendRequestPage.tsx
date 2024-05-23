import BounceButton from '@components/BounceButton';
import Text from '@components/Text';
import { RelationshipType } from '@models/RelationshipType';
import userRelationshipService from '@services/userRelationship.service';
import { FlashList } from '@shopify/flash-list';
import { RootState } from '@stores/appStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const FriendRequestPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const insets = useSafeAreaInsets();

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

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={'dark-content'} />
      <View style={{ height: insets.top }} />

      <View className="bg-white p-4">
        <Text className="font-bold text-center text-xl">Friend requests</Text>
      </View>

      <View className="flex-1">
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
                    {requestByMe ? (
                      <View className="flex-1 bg-primary/40 justify-center items-center rounded-lg h-[40px]">
                        <Text className="text-white">Request sent</Text>
                      </View>
                    ) : null}

                    {!requestByMe && item.type === RelationshipType.Cancel ? (
                      <>
                        <BounceButton
                          className="flex-1"
                          onPress={() => acceptMutation.mutate(item.id)}>
                          <View className="bg-red-100 justify-center items-center rounded-lg h-[40px]">
                            <Text className="text-red-500 font-bold">User refuses</Text>
                          </View>
                        </BounceButton>

                        <View className="flex-1" />
                      </>
                    ) : (
                      <>
                        <BounceButton
                          className="flex-1"
                          onPress={() => acceptMutation.mutate(item.id)}>
                          <View className="bg-primary justify-center items-center rounded-lg h-[40px]">
                            <Text className="text-white">Accept</Text>
                          </View>
                        </BounceButton>

                        <BounceButton
                          onPress={() => {
                            if (requestByMe) {
                              deleteMutation.mutate(item.id);
                            } else {
                              cancelMutation.mutate(item.id);
                            }
                          }}
                          className="flex-1">
                          <View className="bg-gray-200 justify-center items-center rounded-lg h-[40px]">
                            <Text className="text-black">Cancel</Text>
                          </View>
                        </BounceButton>
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FriendRequestPage;
