import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { BackGroundIcon } from '../../../../helper/homeIcon';
import { style } from '../../../../theme/style';
import { fontSize } from '../../../../theme/font';
import { colors } from '../../../../theme/colors';
import DownloadIcon from '../../../../images/home/download.svg';
import ShareIcon from '../../../../images/home/share.svg';
import OtherHeader from '../../../components/OtherHeader';
import MainText from '../../../components/MainText';
import { t } from 'i18next';
import DownloadModal from '../../modal/DownloadModal';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../components/ToastConfig';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from "react-native-fs";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { storage } from '../../../../store/api/token/getToken';

const UseTerm = () => {
  // const source = require('../../../../theme/yoriqnoma.pdf')
  // const filePath = `${RNFS.ExternalDirectoryPath}/files/yoriqnoma.pdf`;
  const [loading, setLoading] = useState(true);

  const onDownload = async () => {
    Toast.show({ autoHide: true, visibilityTime: 3000, position: 'bottom', type: 'omad', props: { title: 'Muvaffaqiyatli', desc: t('783') + '...' }, });
    ReactNativeBlobUtil.config({
      appendExt: 'pdf',
      overwrite: true,
      addAndroidDownloads: {
        notification: true,
        title: `Yo‘riqnoma.pdf`,
        mediaScannable: false,
        mime: 'application/pdf',
        useDownloadManager: true,
        path: RNFS.DownloadDirectoryPath + `/Yo‘riqnoma.pdf`,
      },
      path: Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.MainBundlePath + `/Yo‘riqnoma.pdf`,
    })
      .fetch('GET', `https://pdf.zerox.uz/yoriqnoma.pdf`)
      .then((res) => {


      })
      .catch((error) => {
        Toast.show({ autoHide: true, visibilityTime: 3000, position: 'bottom', type: 'error2', props: { title: 'Xatolik', desc: 'Yuklashlash amalga oshmadi' }, });
      });
  };



  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', height: style.height / 2.5, width: '100%', }}  >
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('foydalanishyoriqnomasi')} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
            
            {/* ------------------------   Yuklab olish   ------------------------ */}
            <TouchableOpacity onPress={() => onDownload()} activeOpacity={0.8} style={styles.download}>
              <DownloadIcon width="20" height="20" />
              <MainText color={colors.white} size={fontSize[12]}>
                {t('120')}
              </MainText>
            </TouchableOpacity>
           
          </View>

          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading && (
              <View style={styles.indicator}>
                <ActivityIndicator size={'large'} color={style.blue} />
              </View>
            )}
            <Pdf
              trustAllCerts={false}
              enablePaging={true}
              activityIndicator={() => (<ActivityIndicator size={'large'} color={style.blue} />)}
              source={{ uri: `https://pdf.zerox.uz/yoriqnoma.pdf`, method: 'GET' }}
              onLoadComplete={() => { setLoading(false) }}
              onError={(error) => { console.log(error.message) }}
              onPressLink={(uri) => { console.log(`Link pressed: ${uri}`) }}
              style={styles.pdf} />
          </View>

        </View>
      </View>

    </View>
  );
};

export default UseTerm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pdfView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20,
  },

  userName: {
    fontSize: style.fontSize.small,
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
    lineHeight: 25,
  },
  download: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: style.StatusbarColor,
    padding: 10,
    width: style.width / 1.5,
    flexDirection: 'row',
  },
  downloadText: {
    color: '#fff',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },
  main: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  aboutUsContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    height: style.height / 1.3,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    alignSelf: 'center',
  },
});
