import React from 'react';
import Text from './Text';

type Props = {
  label?: string;
  required?: string;
};
const FormLabel = ({ label, required }: Props) => {
  return label ? (
    <Text className={`mb-1 md:text-lg font-bold ml-1 text-primary`}>
      {label + ' '}
      {required ? <Text className={'font-bold text-red-500'}>*</Text> : null}
    </Text>
  ) : null;
};

export default FormLabel;
