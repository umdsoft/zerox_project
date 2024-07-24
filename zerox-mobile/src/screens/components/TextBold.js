import {Text} from 'react-native';
import React from 'react';
import {style} from '../../theme/style';

const TextBold = ({children, styles}) => {
  return (
    <Text
      style={{
        fontFamily: style.fontFamilyBold,
        fontSize: style.fontSize.xx - 1,
        color: 'black',
        ...styles,
      }}>
      {children}
    </Text>
  );
};

export default TextBold;
