import Text from '@components/Text';
import React from 'react';
import { View } from 'react-native';

export const toastConfig = {
  success: (props: any) => (
    <View className={'px-4 w-screen'}>
      <View
        className={'bg-green-50 border-l-4 border-green-600 rounded-md p-3'}>
        {/*<Text className={'font-bold'}>Thông báo</Text>*/}
        <Text>{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props: any) => (
    <View className={'px-4 w-screen'}>
      <View className={'bg-red-50 border-l-4 border-red-600 rounded-md p-3'}>
        {/*<Text className={'font-bold'}>Thông báo</Text>*/}
        <Text>{props.text2}</Text>
      </View>
    </View>
  ),
};
