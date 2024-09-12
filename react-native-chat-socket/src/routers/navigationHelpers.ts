import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParams } from './RootStackParams';

export const navigationRef = createNavigationContainerRef();

export function navigate<T extends keyof RootStackParams>(
  screen: T,
  params?: RootStackParams[T],
) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(screen, params);
  }
}
