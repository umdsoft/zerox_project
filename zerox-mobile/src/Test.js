import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import {Trans} from 'react-i18next';

const Test = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        <Trans
          t={t}
          value={1}
          values={{start: 'John'}}
          i18nKey="459"
          components={{
            bold: <Text style={{fontWeight: 'bold', color: 'red'}} />,
          }}
        />
      </Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
