/**
 * @format
 */
import React from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { Store } from './src/store/store/Store';
import messaging from '@react-native-firebase/messaging';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
const { fontScale, scale } = Dimensions.get('screen');

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
});

const MainApp = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
