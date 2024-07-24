import { ScrollView, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { BackGroundIcon } from '../../../../helper/homeIcon';
import { style, normalize } from '../../../../theme/style';
import LogoAndShior from '../../../../images/LogoAndShior';
import OtherHeader from '../../../components/OtherHeader';
import MainText from '../../../components/MainText';
import { fontSize } from '../../../../theme/font';
import { t } from 'i18next';
import { font } from '../../../../theme/font';

const AboutMe = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('about')} backgroundColor={'#fff'} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>

          <View style={styles.aboutBox}>
            <LogoAndShior width={140} height={140} style={{ marginTop: 150 }} />
            <MainText size={12} mTop={10} ft={font.medium}  >Ilova naqli: 1.0.0</MainText>
            <Text style={{ textAlign: 'center', marginTop: 40, paddingRight: 10, paddingLeft: 10 }}>
              <MainText ft={font.bold}>ZeroX </MainText>
              <MainText ft={font.medium} > - jismoniy va yuridik shaxslar o‘rtasidagi qarz munosabatlarini elektron ro‘yxatga olish va tartibga solish tizimi </MainText>
            </Text>

            <MainText size={14} color={'#3182CE'} style={{ position: 'absolute', bottom: 40, left: 10, }}>www.zerox.uz</MainText>
            <MainText size={14} style={{ position: 'absolute', bottom: 10, left: 10, }}>© 2022-2024. «Zerox» MCHJ</MainText>
          </View>

        </View>
      </View>
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
 
  main: {
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
    flex: 1,
    paddingBottom: 20,
    marginTop: 20,
  },
  aboutUsContainer: {
    backgroundColor: '#fff',
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
    overflow: 'hidden',
    padding: 10,
  },
  aboutBox: {
    flex: 1,
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
    position: 'relative'
  },


  backButtonContainer: {
    marginTop: 10,
  },
  backImage: {
    position: 'absolute',
    height: style.height / 2.5,
    width: '100%',
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
    width: style.width / 3,
    flexDirection: 'row',
  },
  downloadText: {
    color: '#fff',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },



  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    alignSelf: 'center',
  },
});
