import { View, ViewProps } from 'react-native';
import React, { ReactNode } from 'react';

interface ComponentProps extends ViewProps {
  children: ReactNode;
}

const FormRow = ({ children, ...props }: ComponentProps) => {
  return (
    <View className={'flex-row justify-between space-x-2 my-0'} {...props}>
      {children}
    </View>
  );
};

export default FormRow;
