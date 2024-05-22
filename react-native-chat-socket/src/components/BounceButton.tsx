import React, { useState } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface BounceButtonProps extends PressableProps {
  pressedScale?: number;
}

const BounceButton = ({ pressedScale = 0.97, ...props }: BounceButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const buttonAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: pressed ? withSpring(pressedScale) : withSpring(1) },
      ],
    };
  });

  const onPress = (e: GestureResponderEvent) => {
    setTimeout(() => {
      props.onPress && props.onPress(e);
    }, 300);
  };

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
      onPress={onPress}>
      <Animated.View style={buttonAnimated}>
        <>{props.children}</>
      </Animated.View>
    </Pressable>
  );
};

export default BounceButton;
