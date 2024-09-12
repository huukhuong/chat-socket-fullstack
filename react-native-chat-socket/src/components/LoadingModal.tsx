import { ActivityIndicator, Dimensions, Modal, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '@utils/colors';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const LoadingModal = () => {
  const { width, height } = Dimensions.get('screen');
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isFetching + isMutating !== 0);
  }, [isFetching, isMutating]);

  return (
    <Modal visible={loading} transparent>
      <View
        className="absolute z-50 top-0 left-0 bg-black/40 justify-center items-center"
        style={{
          height: height,
          width: width,
        }}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
