import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {BackGroundIcon} from '../../helper/homeIcon';
import {normalize, style} from '../../theme/style';
import {useNavigation} from '@react-navigation/native';
import Person from '../../images/home/person';
import Juridic from '../../images/home/juridic';
import CheckIcon from '../../images/home/check';
import QrCode from '../../images/home/Qr';
import {useDispatch, useSelector} from 'react-redux';
import {showModal} from '../../store/reducers/HomeReducer';
import LottieView from 'lottie-react-native';
import {t} from 'i18next';

const TakeDebt = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();

  const onNavigate = useCallback(
    name => {
      if (user.data.is_active === 1) {
        // yuridikni ichinga kirganda type kerakmaydi
        navigation.navigate(name, {type: 1});
      } else {
        dispatch(showModal({show: true}));
      }
    },
    [dispatch, navigation, user?.data?.is_active],
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          height: normalize(185),
          width: '100%',
        }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <View style={styles.header}>
        <View style={styles.aboutUsContainer}>
          <View style={{alignSelf: 'center'}}>
            <LottieView
              autoPlay
              source={require('../../images/lottie/qarzolish/Rp4eDvBQu4.json')}
              style={{width: 200, height: 200}}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 40,
              marginBottom: 20,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onNavigate('SearchUserScreen');
              }}
              style={styles.enterButton}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Person width={35} height={35} color={'#fff'} />
                <Text style={[styles.enterText, {color: '#fff'}]}>
                  {t('612')}
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onNavigate('SearchJuridicUser');
              }}
              style={[styles.enterButton, {marginLeft: 20}]}
            >
              <Juridic width={35} height={35} color={'#fff'} />
              <Text style={[styles.enterText, {color: '#fff'}]}>
                Yuridik shaxsni{'\n'}qidirish
              </Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onNavigate('HistoryDebt');
            }}
            style={[styles.button, {width: '80%', alignItems: 'flex-start'}]}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
              <CheckIcon width={35} height={35} color={'#fff'} />
              <Text
                style={[
                  styles.enterText,
                  {
                    color: '#fff',
                    textAlign: 'center',
                    alignItems: 'flex-start',
                  },
                ]}>
                {t('201')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.qr}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonqr}
            onPress={() => {
              onNavigate('QrScan');
            }}>
            <QrCode
              width={normalize(70)}
              height={normalize(70)}
              color={style.blue}
            />
            <Text style={[styles.enterText, {color: style.blue}]}>
              {t('789')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TakeDebt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.backgroundColor,
  },
  buttonqr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qr: {
    alignSelf: 'center',
    marginTop: normalize(40),
  },
  button: {
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    // height: style.textInputHeight,
    alignSelf: 'center',
    paddingVertical: 5,
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
    padding: 10,
  },
  header: {
    width: '95%',
    flex: 1,
    alignSelf: 'center',
  },
  userNameText: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#fff',
  },
  DrawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  enterButton: {
    width: '80%',
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    // height: style.textInputHeight,
    alignSelf: 'center',
    paddingVertical: 5,
  },
  drawer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  AlarmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  enterText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
    padding: 5,
    textAlign: 'center',
  },

  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    alignSelf: 'center',
  },
});
