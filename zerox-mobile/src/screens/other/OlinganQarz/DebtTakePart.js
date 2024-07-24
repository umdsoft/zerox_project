import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { BackGroundIcon } from '../../../helper/homeIcon';
import { style } from '../../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import { toastConfig } from '../../components/ToastConfig';
import { URL } from '../../constants';
import { sortText } from '../../components/StatisticCard';

import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';
import { storage } from '../../../store/api/token/getToken';
import OtherHeader from '../../components/OtherHeader';
import { settingDate } from '../../../helper';
import socketService from '../../../helper/socketService';
import { setNotification } from '../../../store/reducers/HomeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import TextBold from '../../components/TextBold';

const DebtTakePart = () => {
  const navigation = useNavigation();
  const { item } = useRoute().params;
  const [sum, setSum] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.HomeReducer);
  const [checked, setChecked] = useState(false);

  const onPress = async () => {
    const token = storage.getString('token');
    try {
      const dd = {
        contract: item.id,
        creditor: item.creditor,
        debitor: item.debitor,
        end_date: item.end_date,
        inc: Number(sum.replace(/\s/g, '')) + Number(item.inc),
        reciver: item.debitor,
        refundable_amount: Number(sum.replace(/\s/g, '')),
        old_amount: Number(item.residual_amount),
        residual_amount:
          Number(item.residual_amount) - Number(sum.replace(/\s/g, '')),
        status: 0,
        type: 1,
        ntype: 1,
        sender: item.creditor,
        res: item.debitor,
      };

      const { data, status } = await axios.post(URL + '/contract/act', dd, {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'application/json',
      });

      if (data.msg === 'ex' && status === 200) {
        Toast.show({
          autoHide: true,
          props: {
            title: 'Xatolik',
            desc: "Qarzni qaytarish bo‘yicha so‘rov oldin jo'natilgan.",
          },
          visibilityTime: 2000,
          position: 'bottom',
          type: 'error2',
        });
      }
      if (status === 201) {
        Toast.show({
          autoHide: true,
          props: {
            title: 'Muvaffaqiyatli',
            desc: t('450'),
          },
          visibilityTime: 2000,
          position: 'bottom',
          type: 'omad',
        });
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 2000);
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({ notification: data.not }));
      });
    } catch (err) {
      Toast.show({
        autoHide: true,
        props: {
          title: 'Xatolik',
          desc: 'Xatolik sodir bo`ldi',
        },
        text1: '',
        visibilityTime: 2000,
        position: 'bottom',
        type: 'error2',
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeText = text => {
    if (Number(text.replace(/\s/g, '')) >= 1) {
      if (Number(text.replace(/\s/g, '')) <= Number(item.amount - item.inc)) {
        setSum(text);
      } else {
        setSum('');
      }
    } else {
      setSum('');
    }
  };

  const onValue = text => {
    const arr = [];
    text
      .toString()
      .split('')
      .forEach((item, i) => {
        if (item !== ' ') {
          arr.push(item);
        }
      });

    return arr.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const renderInput = useMemo(() => {
    return (
      <View style={styles.TextInputLabelContainer}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={onValue(sum)}
            placeholder={t('270')}
            placeholderTextColor={style.placeHolderColor}
            keyboardType="numeric"
            onChangeText={onChangeText}
            style={styles.TextInput}
          />
        </View>
      </View>
    );
  }, [onChangeText, sum]);

  return (
    <View style={styles.container}>
      <View
        style={{ position: 'absolute', height: style.height / 3, width: '100%' }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('444')} />
      <View style={[styles.main]}>
        <View style={styles.aboutUsContainer}>
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
            <View>
              <View style={[styles.card]}>
                <View style={styles.insideMoney}>
                  <Text style={[styles.hisob]}>
                    <Trans
                      i18nKey={'447'}
                      values={{
                        start: settingDate(item.created_at),
                        end: item.number,
                        id: item.number,
                        name: item?.debitor_name,
                        sum: `${sortText(item.amount - item.inc) + ' ' + item.currency}`,
                      }}
                      components={{
                        start: <TextBold />,
                        id: (
                          <Text
                            onPress={() => {
                              navigation.navigate('DownloadStatistic', {
                                item: item,
                                id: item.id,
                              });
                            }}
                            style={{
                              color: style.blue,
                            }}
                          />
                        ),
                        end: <TextBold />,
                        name: <TextBold />,
                        sum: <TextBold />,
                      }}
                    />
                  </Text>
                </View>
              </View>
            </View>
            <View>
              {renderInput}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <CheckBox
                  value={checked}
                  tintColor={style.blue}
                  tintColors={{
                    true: style.blue,
                    false: style.disabledButtonColor,
                  }}
                  onValueChange={() => setChecked(!checked)}
                />
                <Text
                  onPress={() => {
                    navigation.navigate('Dalol', {
                      type: 5,
                      data: item,
                      sum: sum.replace(/\s/g, ''),
                    });
                  }}
                  style={[
                    styles.phoneText,
                    { color: style.blue, maxWidth: '90%', marginLeft: 5 },
                  ]}>
                  {t('366')}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={onPress}
                disabled={!checked && sum.length < 0}
                activeOpacity={0.8}
                style={[
                  styles.registerButton,
                  {
                    marginTop: 20,
                    backgroundColor:
                      sum.length > 0 && checked
                        ? style.blue
                        : style.disabledButtonColor,
                  },
                ]}>
                <Text style={[styles.textButton]}>{t('351')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Toast config={toastConfig} />
    </View>
  );
};

export default DebtTakePart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  mainText: {
    fontFamily: style.fontFamilyBold,
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
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
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
    fontSize: style.fontSize.xx - 2.5,
    color: style.textColor,
  },
  hisob: {
    fontSize: style.fontSize.xx,
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
    marginTop: 20,
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
