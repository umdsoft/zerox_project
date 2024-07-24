import {
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback } from 'react';

import { normalize, style } from '../../../theme/style';
import {
  QrCodeIcon,
  AboutIcon,
  DeviceIcon,
  SecurityIcon,
  ShareIcon,
  ServiceSupport,
  Facebook,
  Instagram,
  Telegram,
  Twitter,
  Youtube,
} from '../../../helper/drawerIcon';
import { useNavigation } from '@react-navigation/native';
import { PurseIcon } from '../../../helper/homeIcon';
import { useDispatch, useSelector } from 'react-redux';
import { sortText } from '../../components/StatisticCard';

import LogoAndShior from '../../../images/LogoAndShior';
import { useTranslation } from 'react-i18next';
import { showModal } from '../../../store/reducers/HomeReducer';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import TarifIcon from '../../../images/drawer/Tarif';
import { t } from 'i18next';
import { WebView } from 'react-native-webview';



const DrawerScreen = () => {
  const { user } = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigation = useNavigation();

  const onShare = useCallback(async () => {
    console.log("SHARE")
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=uz.yt.eimzo',
        url: 'https://play.google.com/store/apps/details?id=uz.yt.eimzo',
        title: 'Ishonch kafolati',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const onCheckIsActive = useCallback(
    name => {
      if (user?.data?.is_active === 1) {
        navigation.navigate(name, { user: user?.data });
      } else {
        dispatch(showModal({ show: true }));
      }
    },
    [dispatch, navigation, user?.data],
  );

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    console.log(supported)
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({ autoHide: true, position: 'bottom', visibilityTime: 2000, type: 'omad', props: { desc: t('171') }, });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.main}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: normalize(50),
            }}>
            <LogoAndShior width={normalize(120)} height={normalize(110)} />
            <View style={styles.view} />
          </View>

          <View style={styles.buttonContainer}>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  onCheckIsActive('UserMoneyResult');
                }}
                activeOpacity={0.8}>
                <View style={styles.MobileInfoContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.moneyTitle}>{t('129')} </Text>
                      <Text style={styles.money}>
                        {`${sortText(user?.data?.balance)}`} {t('som')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <PurseIcon width={25} height={25} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  onCheckIsActive('QrCode');
                }}
                style={styles.button}>
                <QrCodeIcon width={25} height={25} />
                <Text style={styles.buttonText}>{t('102')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UseTerm');
                }}
                style={styles.button}>
                <SecurityIcon width={25} height={25} />
                <Text style={styles.buttonText}>{t('105')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={onShare} style={styles.button}>
                <ShareIcon width={25} height={25} />
                <Text style={styles.buttonText}>{t('share')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://t.me/zeroxuz_bot');
                }}
                style={styles.button}>
                <ServiceSupport width={25} height={25} />
                <Text style={styles.buttonText}>{t('support')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Types');
                }}
                style={styles.button}>
                <TarifIcon width={25} height={25} />
                <Text style={styles.buttonText}>{t('111')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AboutMe');
                }}
                style={styles.button}>
                <AboutIcon width={25} height={25} />
                <Text style={styles.buttonText}>{t('about')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialBar}>
              <TouchableOpacity onPress={() => { Linking.openURL('https://m.facebook.com/ZeroxUZ/?wtsid=rdr_0l15a0hwRSQsgzZtE') }} style={styles.socialButton}>
                <Facebook width={35} height={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/zeroxuz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==') }} style={styles.socialButton}>
                <Instagram width={35} height={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://t.me/ZeroxUZ') }} style={styles.socialButton}>
                <Telegram width={35} height={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://x.com/zeroxuz') }} style={styles.socialButton}>
                <Twitter width={35} height={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL("https://www.youtube.com/@zeroxuz") }} style={styles.socialButton}>
                <Youtube width={35} height={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    alignSelf: 'center',
    height: 3,
    width: '80%',
    maxWidth: '80%',
    backgroundColor: '#E0E1E228',
    borderRadius: 15,
    marginTop: 10,
  },
  moneyTitle: {
    color: '#fff',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },
  money: {
    color: '#fff',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },
  MobileInfoContainer: {
    padding: 5,
    backgroundColor: style.blue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    maxWidth: normalize(150),
  },
  buttonText: {
    fontSize: style.fontSize.xx - 2,
    fontFamily: style.fontFamilyBold,
    color: '#A0AEC0',
    marginLeft: 15,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
  main: {
    flex: 1,
    marginHorizontal: 20,
  },
  ishonch: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
    marginTop: 10,
  },
  buttonContainer: {
    fleX: 1,
    marginTop: 20,
  },
  socialBar: {
    marginTop: 50,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialButton: {
    width: "23%",
  },
});
