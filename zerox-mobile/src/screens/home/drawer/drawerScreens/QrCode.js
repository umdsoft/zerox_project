import { Alert, StyleSheet, TouchableOpacity, View, Text, Image, Platform, PermissionsAndroid, ToastAndroid, } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackGroundIcon } from '../../../../helper/homeIcon';
import { style, normalize } from '../../../../theme/style';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import ShareIcon from '../../../../images/home/share.svg';
import DownloadIcon from '../../../../images/home/download.svg';
import { useSelector } from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from "react-native-fs";
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';
import universalStyle from '../../../../theme/universalStyle';
import OtherHeader from '../../../components/OtherHeader';
import { useTranslation } from 'react-i18next';
import MainText from '../../../components/MainText';
import { fontSize } from '../../../../theme/font';
import { colors } from '../../../../theme/colors';
import { t } from 'i18next';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';


// https://www.npmjs.com/package/node-html-to-image

const QrCode = () => {
  const { user } = useSelector(state => state.HomeReducer);
  const logo = require('../../../../images/Shior')
  const [item, setItem] = useState(`https://zerox.uz/user?id=${user?.data?.uid}`);
  const [productQRref, setProductQRref] = useState();

  const onDownload = async () => {
    productQRref.toDataURL(async (data) => {

      let options = {
        html: `
          <div style="width: 600px; height: 750px; margin: 120px auto; display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <div style="width: 430px;height: 700px;margin: 10% auto;display: flex;flex-direction: column;justify-content: center;align-items: center;background-color: #374151;padding: 25px;border-radius: 15px;">
              <div style="width: 400px;height: 700px;display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 20px;border-radius: 15px;background-color: white;">
                <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;align-items: center;">
                  <span style="font-size: 80px;color: #3563B2;font-family:serif;">Zero</span>
                  <span style="font-size: 80px;color: #EB494F;font-family:serif;">X</span>
                </div>
                <img src="data:image/jpeg;base64,${data}" style="margin: 10px auto; width: 85%; " />
                <p style=" font-size: 35px;color: black;font-family: Montserrat-Medium;margin-top: 10px;">ID raqami: ${user?.data?.uid}</p>
              </div>
              <p style="font-size: 35px;color: rgb(247, 247, 247);font-family: Montserrat-Medium; margin-top: 20px;text-align: center;">
                ${user.data.last_name + ' ' + user.data.first_name + ' ' + user.data.middle_name}
              </p>

            </div>
            <p style="font-size: 30px;color: black;font-family: Montserrat-Medium;;margin-top: 10px;text-align: center;">
              Qarz shartnomasini tez va oson rasmiylashtirish uchun ushbu QR-kodni ZeroX ilovasi yordamida skaynerlang va tegishli jarayonlarni amalga oshiring.
            </p>
          </div>
        `,
        fileName: user?.data?.uid,
        directory: 'Documents',
        fonts: ['../../../../../assets/fonts/Montserrat-Medium.ttf']
      };

      let file = await RNHTMLtoPDF.convert(options);
      FileViewer.open(file.filePath);

      // -------------------------   RASM holatida tuklash   -------------------------
      // let filePath = RNFS.CachesDirectoryPath + `/${user?.data?.uid}.png`;
      // RNFS.writeFile(filePath, data, 'base64')
      //   .then(async (response) => {
      //     FileViewer.open(filePath);
      //   })
    });
  }


  const onShare = () => {
    productQRref.toDataURL((data) => {
      const options = {
        html: `
          <div style="width: 600px; height: 750px; margin: 120px auto; display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <div style="width: 430px;height: 700px;margin: 10% auto;display: flex;flex-direction: column;justify-content: center;align-items: center;background-color: #374151;padding: 25px;border-radius: 15px;">
              <div style="width: 400px;height: 700px;display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 20px;border-radius: 15px;background-color: white;">
                <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;align-items: center;">
                  <span style="font-size: 80px;color: #3563B2;font-family:serif;">Zero</span>
                  <span style="font-size: 80px;color: #EB494F;font-family:serif;">X</span>
                </div>
                <img src="data:image/jpeg;base64,${data}" style="margin: 10px auto; width: 85%; " />
                <p style=" font-size: 35px;color: black;font-family: Montserrat-Medium;margin-top: 10px;">ID raqami: ${user?.data?.uid}</p>
              </div>
              <p style="font-size: 35px;color: rgb(247, 247, 247);font-family: Montserrat-Medium; margin-top: 20px;text-align: center;">
                ${user.data.last_name + ' ' + user.data.first_name + ' ' + user.data.middle_name}
              </p>

            </div>
            <p style="font-size: 30px;color: black;font-family: Montserrat-Medium;;margin-top: 10px;text-align: center;">
              Qarz shartnomasini tez va oson rasmiylashtirish uchun ushbu QR-kodni ZeroX ilovasi yordamida skaynerlang va tegishli jarayonlarni amalga oshiring.
            </p>
          </div>
        `,
        fileName: `${user?.data?.uid}`,
        directory: 'docs',
        fonts: ['../../../../../assets/fonts/Montserrat-Medium.ttf']
      };


      RNHTMLtoPDF.convert(options)
        .then(({ filePath }) => {
          console.log("filePath", filePath)

          Share.open({ url: `file://${filePath}` })
            .then((res) => {
              console.log("Share is good", res)
            })
            .catch((error) => {
              console.log("Share is bad", error.message)
            })

        })
        .catch((error) => {
          console.log("RNHTMLtoPDF", error.message)
        })



    });
  }


  return (
    <View style={styles.container}>
      <View style={universalStyle.backimage}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('qrcode')} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>
          <View style={styles.darkBg}>
            <View style={styles.row}>
              <View style={styles.logoBox} >
                <Text style={styles.logoBoxA}>Zero</Text>
                <Text style={styles.logoBoxB}>X</Text>
              </View>
              <QRCode
                getRef={(c) => setProductQRref(c)}
                style={{ marginBottom: 20, }}
                ecl="M"
                color={"#0063b6"}
                backgroundColor="#fff" size={170} logoBorderRadius={5}
                logo={require('../../../../images/iconapp.jpg')}
                value={item}
              />
              <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 15, fontSize: 16 }}>
                {t('idNumber')} : {user?.data.uid}
              </Text>
            </View>

            <View style={styles.max}>
              <MainText textAlign={"center"} color={colors.white} size={fontSize[14]}>
                {user?.data?.last_name + ' ' + user?.data?.first_name + ' ' + user.data.middle_name}
              </MainText>
            </View>
          </View>
          <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', textAlign: 'center', marginTop: 15, fontSize: 16 }}>
            {t('117')}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => onDownload()} style={styles.download}>
              <DownloadIcon width="20%" height="100%" />
              <MainText color={colors.white} size={fontSize[12]}>
                {t('120')}
              </MainText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShare()} style={styles.download}>
              <ShareIcon width="20%" height="100%" />
              <MainText color={colors.white} size={fontSize[12]}>
                {t('123')}
              </MainText>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    // backgroundColor: style.StatusbarColor,
    paddingRight: 26,
    marginBottom: 10
  },

  logoBoxA: {
    fontFamily: 'serif',
    fontSize: 40,
    color: '#2D62B6'
  },

  logoBoxB: {
    fontFamily: 'serif',
    fontSize: 40,
    color: '#EF4444'
  },

  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  buttons: { marginTop: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-evenly' },
  max: { alignSelf: 'center', marginBottom: 15 },
  userName: {
    fontSize: style.fontSize.xx,
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
  },
  row: {
    alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor: 'white',
    padding: 30,
    borderRadius: 20
  },
  download: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: style.StatusbarColor,
    padding: 10,
    width: style.width / 3,
    maxWidth: style.width / 3,
    flexDirection: 'row',
  },
  downloadText: {
    color: '#fff',
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
  },
  main: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  darkBg: {
    width: '69%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#394052",
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
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 0,
  },

  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    alignSelf: 'center',
  },
});
