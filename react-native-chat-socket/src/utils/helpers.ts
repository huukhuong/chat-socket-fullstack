import uuid from 'react-native-uuid';
import { getLocalItem, LocalKey, setLocalItem } from './localSave';

const getDeviceId = async () => {
  let deviceId = await getLocalItem(LocalKey.deviceId);

  if (!deviceId) {
    deviceId = uuid.v4().toString();
    await setLocalItem(LocalKey.deviceId, deviceId);
  }

  console.log('deviceId: ' + deviceId);
  return deviceId;
};

export { getDeviceId };
