import React, {useCallback, useEffect, useState} from 'react';
import './src/i18n/index';
import {
  ImageBackground,
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View, 
} from 'react-native';
import 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import Logo from './src/images/LogoAndShior';
import Navigation from './src/navigation/Navigation';

import {normalize, style} from './src/theme/style';
import {useNetInfo} from '@react-native-community/netinfo';

import {io} from 'socket.io-client';
import './src/store/api/token/getToken';
import {SOCKET_URL} from './src/screens/constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import {i18n} from './src/i18n/index';
import FaceIdModal from './src/screens/home/modal/FaceIdModal';
import {NavigationContainer} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './src/screens/components/ToastConfig';
import ContractModal from './src/screens/home/modal/ContractModal';
import NoInternet from './src/screens/home/modal/NoInternet';
import {checkingInternet} from './src/store/reducers/HomeReducer';
import UpdateModal from './src/screens/home/modal/UpdateModal';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  secure: true,
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const netInfo = useNetInfo();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, [netInfo.isConnected]);

  useEffect(() => {
    if (netInfo.isConnected) {
      dispatch(checkingInternet({internet: false}));
    } else {
      dispatch(checkingInternet({internet: true}));
    }
  }, [netInfo, dispatch]);
  const onChangeIntenet = useCallback(() => {
    if (netInfo.isConnected) {
      dispatch(checkingInternet({internet: false}));
    } else {
      dispatch(checkingInternet({internet: true}));
    }
  }, [netInfo, dispatch]);

  if (isLoading) {
    return <Enter />;
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <Navigation />
          <FaceIdModal />
          <ContractModal />
          <NoInternet onChangeIntenet={onChangeIntenet} />
          <UpdateModal />
        </I18nextProvider>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

const Enter = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        backgroundColor={'#fff'}
        barStyle="dark-content"
        animated={true}
      />
      <ImageBackground
        style={styles.ImageBackground}
        resizeMode="cover"
        source={require('./src/images/backtwopeople.png')}>
        <View style={styles.logoContainer}>
          <Logo width={normalize(120)} height={normalize(120)} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    width: style.width,
    height: style.height,
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ishonch: {
    fontSize: style.fontSize.xs + 2,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
});
