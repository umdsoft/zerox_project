import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundIcon} from '../../../helper/homeIcon';
import {style} from '../../../theme/style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {sortText} from '../../components/StatisticCard';

import Loading from '../../components/Loading';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../components/ToastConfig';
import CheckBox from '@react-native-community/checkbox';
import TextBold from '../../components/TextBold';
import axios from 'axios';
import {storage} from '../../../store/api/token/getToken';
import {URL} from '../../constants';
import OtherHeader from '../../components/OtherHeader';
import {settingDate} from '../../../helper';
import socketService from '../../../helper/socketService';
import {useDispatch, useSelector} from 'react-redux';
import {setNotification} from '../../../store/reducers/HomeReducer';
import {t} from 'i18next';
import {Trans} from 'react-i18next';
const CharityDebt = () => {
  const {item} = useRoute().params;
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.HomeReducer);
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(error, 'error');
      setLoading(false);
    }
  };

  const onPress = async () => {
    const token = storage.getString('token');
    try {
      const {data, status} = await axios.post(
        URL + '/contract/vos-kechish',
        {
          contract: info?.id,
          creditor: info?.creditor,
          end_date: info?.end_date,
          debitor: info?.debitor,
          inc: info?.inc,
          reciver: info?.creditor,
          refundable_amount: 0,
          residual_amount: info?.residual_amount,
          vos_summa: info?.residual_amount,
          sender: info.debitor,
          res: info.debitor,
          old_amount: Number(info.residual_amount),
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      console.log('red', data);

      if (status === 200 && data.msg === 'ex') {
        Toast.show({
          autoHide: true,
          visibilityTime: 2000,
          position: 'bottom',
          type: 'omad',
          props: {
            title: 'Muvaffaqiyatli',
            desc: "Ushbu qarz shartnomasi bo‘yicha Sizga so'rov yuborilgan. Bildirishnomalar bo'limi orqali tanishing.",
          },
        });
      }
      if (status === 201) {
        Toast.show({
          autoHide: true,
          visibilityTime: 2000,
          position: 'bottom',
          type: 'omad',
          props: {
            title: 'Muvaffaqiyatli',
            desc: 'Qarzdan voz kechildi.',
          },
        });
        setTimeout(() => {
          navigation.navigate('BottomTabNavigator');
        }, 2000);
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({notification: data.not}));
      });
    } catch (error) {
      Toast.show({
        autoHide: true,
        visibilityTime: 3000,
        position: 'bottom',
        type: 'error2',
        props: {title: 'Xatolik', desc: 'Xatolik sodir bo`ldi.'},
      });
    }
  };
  console.log(info, 'sadasdas');

  return (
    <View style={styles.container}>
      <View
        style={{position: 'absolute', height: style.height / 3, width: '100%'}}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('372')} />
      <View style={[styles.main]}>
        <View style={styles.aboutUsContainer}>
          {loading ? (
            <Loading />
          ) : (
            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
              <View>
                {/* 375 */}
                {/*   {sortText(info?.residual_amount)} {info?.currency} */}
                <Text style={[styles.hisob, {fontSize: style.fontSize.xx}]}>
                  <Trans
                    t={t}
                    i18nKey="375"
                    values={{
                      start: settingDate(info.created_at),
                      id: info?.number,
                      end:
                        sortText(info?.residual_amount) + ' ' + info?.currency,
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
                    navigation.navigate('Dalol', {type: 2, data: info});
                  }}
                  style={[
                    styles.phoneText,
                    {color: style.blue, maxWidth: '90%', marginLeft: 5},
                  ]}>
                  {t('366')}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  disabled={!check}
                  onPress={onPress}
                  activeOpacity={0.8}
                  style={[
                    styles.registerButton,
                    {
                      marginTop: 20,
                      backgroundColor: !check
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

      <Toast config={toastConfig} />
    </View>
  );
};

export default CharityDebt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
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
    flex: 1,
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
    overflow: 'hidden',
  },
});
