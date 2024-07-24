import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './components/ToastConfig';

const TestTextInput = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="OKAY"
        onPress={() => {
          Toast.show({
            position: 'bottom',
            type: 'error2',
            autoHide: true,
            props: {title: 'ZOR', desc: 'ISHqilib buladi'},
          });
        }}
      />
      <Toast config={toastConfig} type="error2" />
    </View>
  );
};

export default TestTextInput;

const styles = StyleSheet.create({});
