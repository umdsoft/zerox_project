import { NativeModules } from 'react-native';
const { BiometricModule } = NativeModules;

export default {
  authenticate() {
    return new Promise((resolve, reject) => {
      BiometricModule.authenticate(
        (error) => reject(error),
        (success) => resolve(success),
      );
    });
  },
};
