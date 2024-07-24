import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { BackGroundIcon } from '../../../helper/homeIcon';
import { style } from '../../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import ShareIcon from '../../../images/home/share.svg';
import DownloadIcon from '../../../images/home/download.svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../components/ToastConfig';
import Pdf from 'react-native-pdf';
import DownloadModal from '../modal/DownloadModal';
import Share from 'react-native-share';
import OtherHeader from '../../components/OtherHeader';
import RNFS from 'react-native-fs';
import MainText from '../../components/MainText';
import { fontSize } from '../../../theme/font';
import { colors } from '../../../theme/colors';
import { t } from 'i18next';
import { storage } from '../../../store/api/token/getToken';

const DownloadStatistic = () => {
  const { item, id } = useRoute().params;

  const [hide, setHide] = useState(false);
  const [path, setPath] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const onShare = async () => {
    const lang = storage.getString('lang');
    ReactNativeBlobUtil.config({ fileCache: true, overwrite: true, appendExt: 'pdf', path: ReactNativeBlobUtil.fs.dirs.DownloadDir + `/${item?.number?.split('/')?.join('-')}-sonli-qarz-shartnomasi.pdf`, })
      .fetch('GET', `https://pdf.zerox.uz/index.php?id=${item?.uid}&download=0&lang=${lang}`,)
      .then(res => {
        if (Platform.OS === 'android') {
          Share.open({ url: `${`file://` + res.path()}` });
        }
        else {
          Share.open({ url: `${res.path()}` });
        }
      })
      .catch(() => {
        Toast.show({ autoHide: true, visibilityTime: 3000, position: 'bottom', type: 'error2', props: { title: 'Xatolik', desc: 'Ulashish amalga oshmadi' }, });
      });
  };

  const onDownload = async () => {
    const lang = storage.getString('lang');
    Toast.show({ autoHide: true, visibilityTime: 3000, position: 'bottom', type: 'omad', props: { title: 'Muvaffaqiyatli', desc: t('783') + '...' }, });
    ReactNativeBlobUtil.config({
      appendExt: 'pdf',
      overwrite: true,
      addAndroidDownloads: {
        notification: true,
        title: `${item?.number?.split('/')?.join('-')}-sonli-qarz-shartnomasi.pdf`,
        mediaScannable: false,
        mime: 'application/pdf',
        useDownloadManager: true,
        path: RNFS.DownloadDirectoryPath + `/${item?.number?.split('/')?.join('-')}-sonli-qarz-shartnomasi.pdf`,
      },
      path: Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.MainBundlePath + `/${item?.number?.split('/')?.join('-')}-sonli-qarz-shartnomasi.pdf`,
    })
      // .fetch('GET', `https://pdf.zerox.uz/index.php?id=${item?.uid}&download=0&lang=${lang}`,)
      .fetch('GET', `https://pdf.zerox.uz/index.php?id=${item?.uid}&download=0&lang=${storage.getString('lang') || 'uz'}`)
      .then((res) => {
        setPath(res.data);
        setHide(true);
      })
      .catch((error) => {
        Toast.show({ autoHide: true, visibilityTime: 3000, position: 'bottom', type: 'error2', props: { title: 'Xatolik', desc: 'Yuklashlash amalga oshmadi' }, });
      });
  };
  console.log(`https://pdf.zerox.uz/index.php?id=${item.uid}&download=0&lang=${storage.getString('lang') || 'uz'}`);

  return (
    <View style={styles.container}>
      <View
        style={{ position: 'absolute', height: style.height / 3, width: '100%' }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('300')} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>
          <View style={{ marginTop: 20 }}>
            <MainText textAlign={'center'} size={fontSize[12]}>
              {t('393', { count: item.number })}
            </MainText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 }}>
            {/* ------------------------   Yuklab olish   ------------------------ */}
            <TouchableOpacity onPress={onDownload} activeOpacity={0.8} style={styles.download}>
              <DownloadIcon width="20" height="20" />
              <MainText color={colors.white} size={fontSize[12]}>
                {t('120')}
              </MainText>
            </TouchableOpacity>
            {/* ------------------------   Ulashish   ------------------------ */}
            <TouchableOpacity onPress={onShare} activeOpacity={0.8} style={styles.download}>
              <ShareIcon width="20" height="20" />
              <MainText color={colors.white} size={fontSize[12]}>
                {t('123')}
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
              // source={{ uri: `https://pdf.zerox.uz/index.php?id=${item.uid}&download=0&lang=uz`, method: 'GET' }}
              source={{ uri: `https://pdf.zerox.uz/index.php?id=${item.uid}&download=0&lang=${storage.getString('lang') || 'uz'}`, method: 'GET' }}
              onLoadComplete={() => { setLoading(false) }}
              style={styles.pdf}
            />
          </View>
        </View>
      </View>
      <DownloadModal hide={hide} onHide={setHide} data={item} path={path} />
      <Toast config={toastConfig} />
    </View>
  );
};

export default DownloadStatistic;

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
    fontFamily: style.fontFamilyBold,
    padding: 80,
    alignSelf: 'center',
  },
  download: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: style.StatusbarColor,
    padding: 10,
    width: style.width / 3,
    flexDirection: 'row',
  },
  downloadText: {
    color: '#fff',
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  aboutUsContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
  },

  title: {
    fontSize: style.fontSize.xx,
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
