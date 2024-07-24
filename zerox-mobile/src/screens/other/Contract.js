import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {BackGroundIcon} from '../../helper/homeIcon/index';
import {style} from '../../theme/style';

import {useNavigation, useRoute} from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import {toastConfig} from '../components/ToastConfig';
import Pdf from 'react-native-pdf';

import OtherHeader from '../components/OtherHeader';

const Contract = () => {
  const [loading, setLoading] = useState(true);
  const {url, title} = useRoute().params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{position: 'absolute', height: style.height / 3, width: '100%'}}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={title} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={styles.download}
            >
              <DownloadIcon width="20" height="20" />
              <Text style={styles.downloadText}>Yuklab olish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={styles.download}
            >
              <ShareIcon width="20" height="20" />
              <Text style={styles.downloadText}>Ulashish</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color={style.blue} />
              </View>
            )}
            <Pdf
              trustAllCerts={false}
              enablePaging={true}
              activityIndicator={() => (
                <ActivityIndicator size={'large'} color={style.blue} />
              )}
              source={{
                uri: url,
                method: 'GET',
              }}
              onLoadComplete={() => {
                setLoading(false);
              }}
              style={styles.pdf}
            />
          </View>
        </View>
      </View>
      {/* <DownloadModal hide={hide} onHide={setHide} data={item} path={path} /> */}
      <Toast config={toastConfig} />
    </View>
  );
};

export default Contract;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
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
