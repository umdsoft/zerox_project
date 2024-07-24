import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundIcon} from '../../helper/homeIcon';
import {style} from '../../theme/style';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../components/ToastConfig';
import Loading from '../components/Loading';
import CheckBox from '@react-native-community/checkbox';
import {formatDate} from './DebtDateLengthAsk';
import DatePicker from 'react-native-date-picker';
import TextBold from '../components/TextBold';
import axios from 'axios';
import {storage} from '../../store/api/token/getToken';
import {URL} from '../constants';
import OtherHeader from '../components/OtherHeader';
import {settingDate} from '../../helper';
import {useDispatch, useSelector} from 'react-redux';
import socketService from '../../helper/socketService';
import {setNotification} from '../../store/reducers/HomeReducer';
import {t} from 'i18next';
import {Trans} from 'react-i18next';

const DebtDateLength = () => {
  const {item} = useRoute().params;
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.HomeReducer);
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = storage.getString('token');

    try {
      setLoading(true);
      const {data, status} = await axios.get(URL + `/contract/by/${item.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (status === 200) {
        setInfo(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onPress = async () => {
    const token = storage.getString('token');

    try {
      const {data, status} = await axios.post(
        URL + '/contract/deb-uzay',
        {
          contract: info.id,
          creditor: info.creditor,
          debitor: info.debitor,
          end_date: formatDate(date),
          inc: info.inc,
          old_amount: info.residual_amount,
          reciver: info.creditor,
          refundable_amount: info.refundable_amount,
          residual_amount: info.residual_amount,
          sender: info.debitor,
          res: info.debitor,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (status === 201) {
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'omad',
          props: {title: t('237'), desc: t('369')},
        });
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 2000);
      }
      if (status === 200 && data.msg === 'ex') {
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: {
            title: 'Xatolik',
            desc: 'Ushbu shartnoma bo‘yicha talabnoma yuborilgan',
          },
        });
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({notification: data.not}));
      });
    } catch (error) {
      console.warn(error);
      Toast.show({
        autoHide: true,
        visibilityTime: 3000,
        position: 'bottom',
        type: 'error2',
        props: {title: 'Xatolik', desc: 'Xatolik sodir bo`ldi'},
      });
    }
  };
  // console.log(JSON.stringify(checkingDate(item.end_date), null, 2));
  return (
    <View style={styles.container}>
      <View
        style={{position: 'absolute', height: style.height / 3, width: '100%'}}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('357')} />
      <View style={[styles.main]}>
        <View style={styles.aboutUsContainer}>
          {loading ? (
            <Loading />
          ) : (
            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
              <View>
                <View style={[styles.card]}>
                  <View style={styles.insideMoney}>
                    {/* //360 */}
                    <Text style={[styles.hisob, {fontSize: style.fontSize.xx}]}>
                      <Trans
                        t={t}
                        i18nKey="360"
                        values={{
                          start: settingDate(info.created_at),
                          id: info?.number,
                          end: settingDate(info?.end_date),
                        }}
                        components={{
                          start: <TextBold />,
                          id: (
                            <Text
                              onPress={() => {
                                navigation.navigate('DownloadStatistic', {
                                  item: info,
                                  id: info.id,
                                });
                              }}
                              style={{
                                color: style.blue,
                              }}
                            />
                          ),
                          end: <TextBold />,
                        }}
                      />
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.TextInputLabelContainer}>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() => setOpen(!open)}
                      style={styles.TextInput}>
                      <Text style={styles.dateText}>
                        {settingDate(date) === settingDate(Date.now())
                          ? t('363')
                          : settingDate(date)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <CheckBox
                    value={check}
                    tintColor={style.blue}
                    tintColors={{
                      true: style.blue,
                      false: style.disabledButtonColor,
                    }}
                    onValueChange={() => setCheck(!check)}
                  />
                  <Text
                    onPress={() => {
                      navigation.navigate('Dalol', {
                        type: 3,
                        data: info,
                        date: date,
                      });
                    }}
                    style={[
                      styles.phoneText,
                      {color: style.blue, maxWidth: '90%', marginLeft: 5},
                    ]}>
                    {t('366')}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  disabled={check === true ? false : true}
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={[
                    styles.registerButton,
                    {
                      marginTop: 20,
                      backgroundColor:
                        check === true ? style.blue : style.disabledButtonColor,
                    },
                  ]}>
                  <Text style={[styles.textButton]}>{t('87')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      {open && (
        <DatePicker
          open={open}
          date={date}
          style={{
            backgroundColor: '#fff',
            alignSelf: 'center',
          }}
          mode="date"
          confirmText="OK"
          androidVariant="nativeAndroid"
          cancelText="Bekor qilish"
          theme="light"
          modal={true}
          onCancel={() => {
            setOpen(false);
          }}
          title={t('795')}
          onConfirm={date => {
            setDate(date);
            setOpen(false);
          }}
          minimumDate={new Date(plus_day(item?.end_date))}
        />
      )}

      {/* <DateModal
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        title={`Yangi muddatni \nkiriting`}
      /> */}
      <Toast config={toastConfig} />
    </View>
  );
};

const plus_day = date => {
  const leta = date?.split('.').join('-');
  let today = new Date(leta);
  let tommorrow = today.setDate(today.getDate() + 1);
  return tommorrow;
};
export const checkingDate = text => {
  const leta = text?.split('.')?.join('-');

  const today = new Date(leta);

  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '.' + mm + '.' + yyyy;
};

export default DebtDateLength;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  buttontime: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
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
  dateText: {
    fontSize: style.fontSize.xx - 2,
    fontFamily: style.fontFamilyMedium,
    color: '#000',
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: style.fontSize.xx - 2,
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
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
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
