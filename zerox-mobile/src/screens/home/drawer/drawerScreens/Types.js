import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OtherHeader from '../../../components/OtherHeader';
import {BackGroundIcon} from '../../../../helper/homeIcon';
import {style} from '../../../../theme/style';
import Pdf from 'react-native-pdf';
import {t} from 'i18next';
const pdf_url = {uri: 'https://pdf.zerox.uz/tarif.pdf', method: 'GET'};
const Types = () => {
  return (
    <View style={styles.con}>
      <View style={styles.backImage}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('111')} />
      <View>
        <Pdf
          trustAllCerts={false}
          enablePaging={true}
          source={pdf_url}
          activityIndicator={() => (
            <ActivityIndicator size={'large'} color={style.blue} />
          )}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

export default Types;

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  backImage: {
    position: 'absolute',
    height: style.height / 2.5,
    width: '100%',
  },
  pdf: {
    width: '100%',
    height: '90%',
  },
});
