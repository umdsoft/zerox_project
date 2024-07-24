import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';

import {style} from '../../theme/style';
import MainText from './MainText';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/font';
// Parol quyidagi talablarga javob berishi kerak:
// - kamida 8 ta belgidan iborat
// - kamida 1 ta kichik harf
// - kamida 1 ta katta harf
// - kamida 1 ta raqam
// - kamida 1 ta maxsus belgi
// - bo'sh joy bo'lmasligi

const PasswordInput = ({
  password,
  onChangeText,
  title = '',
  setSpace,
  setLower,
  setMin,
  setNumber,
  setSymbole,
  setUpper,
}) => {
  useEffect(() => {
    let hasUpperCase = /[A-Z]/.test(password);
    let hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let trim = password.includes(' ');

    if (trim === true) {
      setSpace(false);
    } else {
      setSpace(true);
    }
    if (hasLowerCase === true) {
      setLower(true);
    } else {
      setLower(false);
    }
    if (hasUpperCase === true) {
      setUpper(true);
    } else {
      setUpper(false);
    }
    if (hasNumber === true) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (hasSymbole === true) {
      setSymbole(true);
    } else {
      setSymbole(false);
    }
    if (password.length >= 8) {
      setMin(true);
    } else {
      setMin(false);
    }
  }, [password]);

  return (
    <View>
      <View style={styles.TextInputLabelContainer}>
        <View style={styles.retryPassword}>
          <MainText color={colors.black} size={fontSize[12]}>
            {title}
          </MainText>
        </View>
        <View style={{flex: 1}}>
          <TextInput
            value={password}
            onChangeText={onChangeText}
            keyboardType="default"
            style={styles.TextInput}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(PasswordInput);

const styles = StyleSheet.create({
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 15,
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  retryPassword: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  text: type => {
    return {
      color: type ? 'green' : '#000',
      marginLeft: 10,
      fontFamily: style.fontFamilyMedium,
      fontSize: style.fontSize.xx - 2,
    };
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '100%',
    flexDirection: 'row',
  },
});
