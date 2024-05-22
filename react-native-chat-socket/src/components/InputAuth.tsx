import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const InputAuth = (props: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(focused ? 1000 : 0, {
      duration: focused ? 300 : 100,
    });
  }, [focused]);

  return (
    <View className={`border-b border-placeholder`}>
      <TextInput
        className="h-[50px]"
        autoCapitalize="none"
        {...props}
        onFocus={e => {
          props.onFocus && props.onFocus(e);
          setFocused(true);
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e);
          setFocused(false);
        }}
      />
      <View className="absolute -bottom-[1px] left-0 right-0 items-center">
        <Animated.View
          style={{
            width,
          }}
          className={'bg-primary h-[2px]'}
        />
      </View>
    </View>
  );
};

export default InputAuth;
