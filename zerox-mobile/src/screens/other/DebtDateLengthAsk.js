import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../components/ToastConfig';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { storage } from '../../store/api/token/getToken';
import { URL } from '../constants';
import TextBold from '../components/TextBold';
import OtherHeader from '../components/OtherHeader';
import { settingDate } from '../../helper';
import socketService from '../../helper/socketService';
import { setNotification } from '../../store/reducers/HomeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
const DebtDateLengthAsk = () => {
  const { item } = useRoute().params;

  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.HomeReducer);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, [getData]);

  const getData = useCallback(async () => {
    const token = storage.getString('token');
    try {
      setLoading(true);
      const { data, status } = await axios.get(URL + `/contract/by/${item?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 200) {
        setInfo(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [item?.id]);

  const onPress = async () => {
    const token = storage.getString('token');
    console.log(formatDate(plus_day(date)));
    try {
      const { data, status } = await axios.post(
        URL + '/contract/act',
        {
          contract: info.id,
          creditor: info.creditor,
          debitor: info.debitor,
          end_date: formatDate(plus_day(date)),
          inc: info.inc,
          ntype: 3,
          reciver: info.debitor,
          old_amount: Number(info.residual_amount),
          refundable_amount: info.refundable_amount,
          residual_amount: info.residual_amount,
          status: 0,
          type: 3,
          sender: info.creditor,
          res: info.debitor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (status === 201) {
        Toast.show({
          autoHide: true,
          props: {
            title: 'Muvaffaqiyatli',
            desc: t('462'),
          },
          visibilityTime: 3000,
          position: 'bottom',
          type: 'omad',
        });
        socketService.emit('notification', user?.data?.id);
        socketService.on('notification', data => {
          dispatch(setNotification({ notification: data.not }));
        });
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 2000);
      }
      if (data.msg === 'ex') {
        Toast.show({
          autoHide: true,
          props: {
            title: 'Muvaffaqiyatli',
            desc: "Ushbu qarz shartnomasi bo‘yicha so'rov yuborilgan. Iltimos, kuting!",
          },
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
        });
      }
    } catch (err) {
      Toast.show({
        autoHide: true,
        props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' },
        visibilityTime: 3000,
        position: 'bottom',
        type: 'error2',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ position: 'absolute', height: style.height / 3, width: '100%' }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('456')} />
      <View style={[styles.main]}>
        <View style={styles.aboutUsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading />
            </View>

          ) : (
            <View
              style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
              <View>
                <View style={[styles.card]}>
                  <View style={styles.insideMoney}>
                    <Text style={[styles.hisob, { fontSize: style.fontSize.xx }]}>
                      <Trans
                        t={t}
                        i18nKey="459"
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
                  <View style={styles.inputTitle}>
                    {/* <Text style={styles.phoneText}>
                      Yangi muddatni kiriting
                    </Text> */}
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => setOpen(!open)}
                      style={styles.TextInput}>
                      <Text style={styles.dateText}>
                        {settingDate(date) === settingDate(Date.now())
                          ? t('363').slice(0, -1)
                          : settingDate(date)}
                        {/* {date !== new Date()
                          ? settingDate(date)
                          : settingDate(info?.end_date)} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  disabled={checkingDate(date)}
                  onPress={onPress}
                  activeOpacity={0.8}
                  style={[
                    styles.registerButton,
                    {
                      marginTop: 20,
                      backgroundColor: checkingDate(date)
                        ? style.disabledButtonColor
                        : style.blue,
                    },
                  ]}>
                  <Text style={[styles.textButton]}>{t('351')}</Text>
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
          minimumDate={new Date(plus_day(info?.end_date))}
          onCancel={() => {
            setOpen(false);
          }}
          title="Sanani kiriting"
          onConfirm={date => {
            setDate(date);
            setOpen(false);
          }}
        />
      )}

      <Toast config={toastConfig} />
    </View>
  );
};

export default DebtDateLengthAsk;
const plus_day = date => {
  let today = new Date(date);
  let tommorrow = today.setDate(today.getDate() + 1);
  return tommorrow;
};
export function formatDate(date) {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = yyyy + '-' + mm + '-' + dd;

  return formattedToday;
}
export function checkingDate(date) {
  let now = new Date();
  let then = new Date(date);
  if (now.getTime() <= then.getTime()) {
    return false;
  } else {
    return true;
  }
}
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
  buttontime: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
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
  loadingContainer: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    width: "100%", height: "100%",
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
