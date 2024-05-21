import React, { useState } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const BounceButton = (props: PressableProps) => {
  const [pressed, setPressed] = useState(false);
  const buttonAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressed ? withSpring(0.95) : withSpring(1) }],
    };
  });

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}>
      <Animated.View style={buttonAnimated}>
        <>{props.children}</>
      </Animated.View>
    </Pressable>
  );
};

export default BounceButton;
