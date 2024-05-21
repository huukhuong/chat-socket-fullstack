import Animated, { BounceInLeft } from 'react-native-reanimated';
import { Controller, useFormContext } from 'react-hook-form';
import { View, ViewProps } from 'react-native';
import React from 'react';
import Text from './Text';
import FormLabel from './FormLabel';

interface FormGroupProps extends ViewProps {
  label?: string;
  name: string;
  required?: string;
  children?: React.ReactElement;
  render?: ({
    onChange,
    onBlur,
    value,
  }: {
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    value?: any;
  }) => React.ReactElement;
  additionalButton?: React.ReactElement | React.JSX.Element;
  validation?: (value: any) => string | boolean;
  disabled?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  name,
  required,
  children,
  render,
  additionalButton,
  validation,
  disabled,
  ...props
}) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;
  const error = errors[name];

  return (
    <View className={'my-1'} {...props}>
      <View className="flex-row items-center">
        <FormLabel label={label} required={required} />

        {additionalButton}
      </View>

      <Controller
        control={control}
        rules={{
          validate: validation,
          required: required?.trim() ? required : undefined,
        }}
        render={({ field: { onChange, onBlur, value } }) =>
          render
            ? render({ onChange, onBlur, value })
            : React.cloneElement(children as React.ReactElement, {
                label: label,
                inform: true,
                placeholder: children?.props.placeholder || label,
                onChange: (e: any) => {
                  setValue(name, e);
                  onChange(e);
                },
                onChangeText: (e: any) => {
                  setValue(name, e);
                  onChange(e);
                },
                onValueChange: (e: any) => {
                  setValue(name, e);
                  onChange(e);
                },
                onBlur: () => {
                  children?.props?.onBlur && children.props.onBlur();
                  onBlur();
                },
                value,
              })
        }
        name={name}
      />

      {error && (
        <Animated.View entering={BounceInLeft}>
          <Text className="text-red-500 text-xs md:text-lg mt-1 -mb-2 px-1">
            {error.message?.toString()}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default FormGroup;
