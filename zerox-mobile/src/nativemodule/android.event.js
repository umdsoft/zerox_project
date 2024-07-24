import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
let androidFace, iosFace;
let eimzo, smsListener, AppInfoInstalled, eventIos;
if (Platform.OS === 'android') {
  const { OpenFaceIdNativeScreen } = NativeModules?.FaceIdModule;
  const { OpenEimzo, AppInstalled } = NativeModules?.Eimzo;
  androidFace = OpenFaceIdNativeScreen;
  eimzo = OpenEimzo;
  AppInfoInstalled = AppInstalled;
}
if (Platform.OS === 'ios') {
  const { startMyId } = NativeModules?.MyIdModule;
  eventIos = new NativeEventEmitter(NativeModules?.MyIdModule);
  iosFace = startMyId;
}

export { androidFace, eimzo, smsListener, AppInfoInstalled, iosFace, eventIos };
