import {Text} from 'react-native';
import React from 'react';
import {font, fontSize} from '../../theme/font';
import {colors} from '../../theme/colors';

const MainText = ({
  size,
  pdLeft = 0,
  pdRight = 0,
  mrLeft = 0,
  mrRight = 0,
  mTop = 0,
  mBottom = 0,
  style,
  children = '',
  onPress = () => {},
  color = colors.black,
  ft,
  lineH,
  textAlign,
}) => {
  return (
    <Text
      // onPress={onPress}
      style={[
        style,
        {
          paddingLeft: pdLeft,
          paddingRight: pdRight,
          marginLeft: mrLeft,
          marginRight: mrRight,
          fontSize: size ?? fontSize['14'],
          color: color,
          fontFamily: ft ?? font.medium,
          lineHeight: lineH,
          textAlign: textAlign,
          marginBottom: mBottom,
          marginTop: mTop,
        },
      ]}>
      {children}
    </Text>
  );
};

export default MainText;
