import RootStackNavigator from '@routers/RootStackNavigator';
import { appStore } from '@stores/appStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toastConfig } from '@utils/toastConfig';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView
          edges={['top']}
          style={{ flex: 0, backgroundColor: '#000000' }}
        />

        <SafeAreaView
          edges={['left', 'right', 'bottom']}
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
          }}>
          <RootStackNavigator />
        </SafeAreaView>

        <Toast config={toastConfig} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
