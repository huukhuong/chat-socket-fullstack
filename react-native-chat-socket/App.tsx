import { LogInPage } from '@pages/auth';
import SplashPage from '@pages/SplashPage';
import AuthStackNavigator from '@routers/AuthStackNavigator';
import RootStackNavigator from '@routers/RootStackNavigator';
import { appStore, RootState } from '@stores/appStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toastConfig } from '@utils/toastConfig';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';

const queryClient = new QueryClient();

const App = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <>
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
        {currentUser === undefined ? (
          <SplashPage />
        ) : currentUser === null ? (
          <AuthStackNavigator />
        ) : (
          <RootStackNavigator />
        )}
      </SafeAreaView>

      <Toast config={toastConfig} />
    </>
  );
};

const AppProvider = () => {
  return (
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProvider;
