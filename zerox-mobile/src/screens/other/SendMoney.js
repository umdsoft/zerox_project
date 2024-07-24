import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { BackGroundIcon, PurseIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import TextInputMask from 'react-native-text-input-mask';
import { URL } from '../constants';
import { sortText } from '../components/StatisticCard';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../components/ToastConfig';
import axios from 'axios';
import { storage } from '../../store/api/token/getToken';
import OtherHeader from '../components/OtherHeader';
import { textInputPlace } from '../../helper/index';
import MainText from '../components/MainText';
import { fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import socketService from '../../helper/socketService';
import { setNotification } from '../../store/reducers/HomeReducer';
import { useDispatch } from 'react-redux';
import { t } from 'i18next';

const SendMoney = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [id, setId] = useState('');
  const [sum, setSum] = useState('');
  const [client, setClient] = useState('');
  const dispatch = useDispatch();

  const _sendMoney = async () => {
    const token = storage.getString('token');
    if (user.uid === id.split('/').join('')) {
      Toast.show({
        autoHide: true,
        visibilityTime: 3000,
        position: 'bottom',
        type: 'error2',
        props: {
          title: 'Xatolik',
          desc: "Siz o'zingizga pul o'tkaza olmaysiz.",
        },
      });
      return;
    }
    try {
      if (Number(sum.replace(/\s/g, '')) <= 999) {
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: {
            title: 'Xatolik',
            desc: t('822'),
          },
        });
      } else {
        if (Number(sum.replace(/\s/g, '')) <= user?.balance) {
          console.log(id.split('/').join(''), Number(sum.replace(/\s/g, '')));
          const { data } = await axios.post(
            URL + '/user/transfer',
            {
              user_id: id.split('/').join(''),
              amount: Number(sum.replace(/\s/g, '')),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (data.success) {
            Toast.show({
              autoHide: true,
              visibilityTime: 3000,
              position: 'bottom',
              type: 'omad',
              props: {
                title: 'Muvaffaqiyatli',
                desc: t('630'),
              },
            });
            // console.log(JSON.stringify(user.data));
            socketService.emit('notification', user?.id);
            socketService.on('notification', data => {
              dispatch(setNotification({ notification: data.not }));
            });

            setTimeout(() => {
              navigation.reset({
                routes: [{ name: 'BottomTabNavigator' }],
                index: 0,
              });
            }, 2000);
          }
        } else {
          Toast.show({
            autoHide: true,
            visibilityTime: 3000,
            position: 'bottom',
            type: 'error2',
            props: {
              title: 'Xatolik',
              desc: t('288'),
            },
          });
        }
      }
    } catch (error) {
      console.warn(error.message, 'eror');
      Toast.show({
        autoHide: true,
        visibilityTime: 3000,
        position: 'bottom',
        type: 'error2',
        props: {
          title: 'Xatolik',
          desc: t('819' + '.'),
        },
      });
    }
  };

  const onGetUser = useCallback(async id => {
    try {
      const { data } = await axios.get(
        URL + `/user/candidate/${id.split('/').join('')}`,
      );

      if (data.success && data.data) {
        setClient(
          data?.data?.first_name?.slice(0, 1) +
          '.' +
          data?.data?.middle_name?.slice(0, 1) +
          '.' +
          data?.data?.last_name,
        );
      } else {
        setClient(t('819'));
      }
    } catch (error) {
      setClient('');
    }
  }, []);

  const renderId = useMemo(() => {
    return (
      <View style={styles.TextInputLabelContainer}>
        <View style={styles.inputTitle}>
          <MainText size={fontSize[12]}>{t('609')}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <TextInputMask
            value={id}
            keyboardType="default"
            placeholderTextColor={style.placeHolderColor}
            placeholder="100000/AA"
            mask="[000000]{/}[AA]"
            autoCapitalize="characters"
            onChangeText={(formated, text) => {
              setId(text.toUpperCase());
              setTimeout(() => {
                onGetUser(text.toUpperCase());
              }, 300);
            }}
            style={styles.TextInput}
          />
        </View>
      </View>
    );
  }, [id, onGetUser]);


  const sortText = text => {
    return text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
  };

  const renderSum = useMemo(() => {
    return (
      <View style={[styles.TextInputLabelContainer, { marginTop: 0 }]}>
        <View style={styles.inputTitle}>
          <MainText size={fontSize[12]}>{t('270')}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={textInputPlace(sum)}
            onChangeText={text => {
              setSum(text);
            }}
            placeholderTextColor={style.placeHolderColor}
            placeholder={t('1 000')}
            keyboardType="numeric"
            style={styles.TextInput}
          />
        </View>
      </View>
    );
  }, [sum]);

  return (
    <View style={styles.container}>
      <View
        style={{ position: 'absolute', height: style.height / 3, width: '100%' }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('816')} />
      <View style={styles.main}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <View style={{ alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', flex: 1, }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 8, }}>
              <View>
                <MainText size={fontSize[12]}>{t('129')}</MainText>
                <MainText size={fontSize[12]} color={colors.green}>
                  {`${sortText(user?.balance)}`} {t('som')}
                </MainText>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <PurseIcon width={25} height={25} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.aboutUsContainer}>
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
            <View>
              {/* <View
                style={[
                  styles.card,
                  {
                    height: 35,
                    maxWidth: '80%',
                    alignSelf: 'center',
                  },
                ]}>
                <View style={styles.insideMoney}>
                  <MainText size={fontSize[11]}>
                    "{user.uid}" {t('813')}
                  </MainText>
                </View>
              </View> */}
              <View style={[styles.card, { marginTop: 10 }]}>
                <View>
                  <MainText textAlign={'center'} size={fontSize[15]}>
                    {t('597')}
                  </MainText>
                </View>
              </View>
            </View>
            <View>
              {renderId}
              {client.length === 0 ? (
                <View style={{ height: 20, backgroundColor: 'white' }} />
              ) : (
                <Text style={styles.clientText}>{client}</Text>
              )}
              {renderSum}
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                disabled={
                  sum.length === 0 ||
                    id.length === 0 ||
                    client === 'Foydalanuvchi topilmadi'
                    ? true
                    : false
                }
                activeOpacity={0.8}
                onPress={_sendMoney}
                style={[
                  styles.registerButton,
                  { marginTop: 20 },
                  {
                    backgroundColor:
                      sum.length === 0 ||
                        id.length === 0 ||
                        client === 'Foydalanuvchi topilmadi'
                        ? style.disabledButtonColor
                        : style.blue,
                  },
                ]}>
                <MainText color={colors.white} size={fontSize[14]}>
                  {t('615')}
                </MainText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  clientText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx - 1,
    color: 'black',
    marginTop: 10,
    marginBottom: 15,
  },
  inputTitle: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    fontSize: fontSize[14],
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    textTransform: 'uppercase',
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  hisob: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    textAlign: 'center',
  },
  textButton: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#fff',
  },
  registerButton: {
    width: '100%',
    height: style.buttonHeight,
    backgroundColor: style.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideMoney: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    width: '100%',
    elevation: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    flex: 1,
  },
  info: {
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    textAlign: 'left',
  },
  header: {
    backgroundColor: '#fff',
    height: style.height / 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  aboutUsContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
