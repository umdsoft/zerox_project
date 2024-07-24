import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import RadioIconFill from '.././../images/radioButtonFill';
import MeetInfoGiveDebtModal from '../../modal/MeetInfoGiveDebtModal';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';
import { storage } from '../../store/api/token/getToken';
import { URL } from '../../screens/constants';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import CheckBox from '@react-native-community/checkbox';

import DatePicker from 'react-native-date-picker';
import Person from '../../images/home/person';
import Juridic from '../../images/home/juridic';
import Famale from '../../images/Famale';
import RadioButtonIcon from '../../images/radioButton';
import OtherHeader from '../components/OtherHeader';
import { Provider } from 'react-native-paper';
import { settingDate } from '../../helper';
import MainText from '../components/MainText';
import { font, fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import socketService from '../../helper/socketService';
import { setNotification } from '../../store/reducers/HomeReducer';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

const GiveDebtUser = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { qarzoluvchi, type } = useRoute().params;
  const { user } = useSelector(state => state.HomeReducer);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);
  const [amount, setAmount] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [usdd, setUsdd] = useState('');
  //type 0 bulsa qarz olmoq
  //type 1 bulsa qarz bermoq
  useEffect(() => {
    if (amount.replace(/\s/g, '').length > 0 && checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amount, checked, date]);

  const getUsd = useCallback(async () => {
    try {
      const { data } = await axios.get(
        'https://cbu.uz/oz/arkhiv-kursov-valyut/json/',
      );
      console.log(data[0].Rate, 'rate');
      if (data) {
        setUsdd(data[0].Rate);
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    getUsd();
  }, []);

  // const toggleModal = useCallback(() => {
  //   navigation.navigate('Contract', {
  //     url: `https://pdf.zerox.uz/free_contract.php?debitor=${type === 0 ? qarzoluvchi?.uid : user?.data?.uid}&creditor=${type !== 1 ? user?.data?.uid : qarzoluvchi?.uid}&download=0&amount=${Number(amount.replace(/\s/g, ''))}&currency=UZS&day=${formatDateMinus(date)}`,
  //     title: t('300'),
  //   });
  // }, [navigation]);
  const toggleModal = () => {
    navigation.navigate('Contract', {
      url: `https://pdf.zerox.uz/free_contract.php?debitor=${type === 0 ? qarzoluvchi?.uid : user?.data?.uid}&creditor=${type !== 1 ? user?.data?.uid : qarzoluvchi?.uid}&download=0&amount=${Number(amount.replace(/\s/g, ''))}&currency=UZS&day=${formatDateMinus(date)}`,
      title: t('300'),
    });
  }

  // console.log(user);
  const fetchData = async () => {
    let a;
    if (active) {
      if (Number(amount.replace(/\s/g, '')) >= 100000000) {
        a = 100000;
      } else {
        if (Number(amount.replace(/\s/g, '')) <= 1000000) {
          a = 1000;
        } else {
          a = Number(Number(amount.replace(/\s/g, '')) * 0.001).toFixed(0);
        }
      }
    } else {
      a = Number(Number(amount.replace(/\s/g, '')) * usdd * 0.001).toFixed(0);
    }

    try {
      if (
        active
          ? Number(amount.replace(/\s/g, '')) < 10000
          : Number(amount.replace(/\s/g, '')) < 1
      ) {
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: {
            // title: 'Xatolik',
            desc: active
              ? 'Minimal qarz miqdori - 10 000 USZ.'
              : 'Minimal qarz miqdori - 1 USD.',
          },
        });
        return;
      }

      if (type === 0) {
        //qarz olish
        if (user.data.cnt === 0) {
          if (a >= user.data.balance) {
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
            return;
          }
        }

        //tekshirib gurish garak yenam sender ikki api properties qushildi
        setLoading(true);
        const { data } = await axios.post(
          URL + '/contract/create',
          {
            amount: Number(amount.replace(/\s/g, '')),
            creditor: user?.data?.id,
            debitor: qarzoluvchi?.id,
            currency: active ? 'UZS' : 'USD',
            end_date: formatDateMinus(date),
            reciver: qarzoluvchi?.id,
            con: 1,
            type: user.data.type === 1 && qarzoluvchi.id === 1 ? 1 : 0,
            sender: Number(user.data.id),
            res: Number(qarzoluvchi.id),
          },
          { headers: { Authorization: 'Bearer ' + storage.getString('token') } },
        );

        if (data.success) {
          setLoading(false);
          Toast.show({
            autoHide: true,
            visibilityTime: 2000,
            position: 'bottom',
            type: 'omad',
            props: { title: 'Muvaffaqiyatli', desc: 'Shartnoma yaratildi' },
          });
          socketService.emit('notification', user?.data?.id);
          socketService.on('notification', data => {
            dispatch(setNotification({ notification: data.not }));
          });
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabNavigator' }],
            });
          }, 2000);
        } else {
          setError(true);
          setLoading(false);
          Alert.alert('Error', JSON.stringify(data));
        }
      }
      if (type === 1) {
        //qarz berish
        setLoading(true);
        const { data } = await axios.post(
          URL + '/contract/create',
          {
            amount: Number(amount.replace(/\s/g, '')),
            creditor: qarzoluvchi?.id,
            debitor: user?.data?.id,
            currency: active ? 'UZS' : 'USD',
            end_date: formatDateMinus(date),
            reciver: qarzoluvchi?.id,
            type: user.data.type === 1 && qarzoluvchi.id === 1 ? 1 : 0,
            sender: qarzoluvchi.id,
            res: user.data.id,
            // con: 1,
          },
          { headers: { Authorization: 'Bearer ' + storage.getString('token') } },
        );

        if (data.success) {
          setLoading(false);
          socketService.emit('notification', user?.data?.id);
          socketService.on('notification', data => {
            dispatch(setNotification({ notification: data.not }));
          });
          Toast.show({
            autoHide: true,
            visibilityTime: 3000,
            position: 'bottom',
            type: 'omad',
            props: { title: 'Muvaffaqiyatli', desc: 'Shartnoma yaratildi' },
          });
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabNavigator' }],
            });
          }, 2000);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setError(true);
      setLoading(false);
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
  const pay = useCallback(
    sum => {
      let a = Number(sum.replace(/\s/g, ''));
      if (active) {
        if (a >= 100000000) {
          return 100000;
        } else {
          if (a <= 1000000) {
            return 1000;
          } else {
            return Number(a * 0.001).toFixed(0);
          }
        }
      } else {
        if (a * usdd <= 1000000) {
          return Number(1000);
        } else {
          if (a * usdd >= 100000000) {
            return Number(100000);
          } else {
            return Number(a * usdd * 0.001).toFixed(0);
          }
        }
      }
    },
    [active, usdd],
  );
  const renderRadioButtons = useMemo(() => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setActive(true);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {active ? (
            <RadioIconFill width={20} height={20} color={style.blue} />
          ) : (
            <RadioButtonIcon width={20} height={20} color={style.blue} />
          )}
          <MainText mrLeft={5} size={fontSize[12]}>
            UZS (so‘m)
          </MainText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive(false);
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          {active ? (
            <RadioButtonIcon width={20} height={20} color={style.blue} />
          ) : (
            <RadioIconFill width={20} height={20} color={style.blue} />
          )}

          <MainText mrLeft={5} size={fontSize[12]}>
            USD (dollar)
          </MainText>
        </TouchableOpacity>
      </View>
    );
  }, [active]);
  const renderInput = useMemo(() => {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          value={onValue(amount)}
          placeholder={active ? 'UZS' : 'USD'}
          placeholderTextColor={style.placeHolderColor}
          keyboardType="number-pad"
          onChangeText={text => {
            let a = Number(text.replace(/\s/g, ''));
            if (a > 0) {
              setAmount(text);
            } else {
              setAmount('');
            }
          }}
          style={styles.TextInput}
        />
      </View>
    );
  }, [active, amount]);
  const renderSum = useMemo(() => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <MainText textAlign={'center'} size={fontSize[13]}>
          Xizmat haqi sifatida hisobingizdan{' '}
          <MainText size={fontSize[13]} color={colors.red}>
            {onValue(pay(amount))}
          </MainText>{' '}
          so’m yechiladi.
        </MainText>
      </View>
    );
  }, [pay, amount]);


  useEffect(() => {
    console.log({ qarzoluvchi })
    console.log({ user })
  }, [])
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Provider>
        <View style={{ width: style.width, position: 'absolute', height: style.height / 3, }}>
          <BackGroundIcon width="100%" height="100%" />
        </View>
        <OtherHeader title={type === 1 ? t('141') : t('144')} />
        <ScrollView>
          <View style={[styles.main]}>
            <View style={styles.aboutUsContainer}>
              <View>


                {/* Qarz oluvchi */}
                <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center', }}>
                  <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50, }}>
                    {
                      type !== 1 ?
                        (
                          user?.data?.type === 2 ?
                            (
                              user?.data?.gender == "1" ?
                                (<Person width={40} height={40} color={style.blue} />) :
                                (<Famale width={40} height={40} color={style.blue} />)
                            )
                            :
                            (
                              <Juridic width={50} height={50} color={style.blue} />
                            )
                        )
                        :
                        (
                          qarzoluvchi.type === 2 ?
                            (
                              qarzoluvchi.gender == "1" ?
                                (<Person width={40} height={40} color={style.blue} />) :
                                (<Famale width={40} height={40} color={style.blue} />)
                            )
                            :
                            (
                              <Juridic width={50} height={50} color={style.blue} />
                            )
                        )
                    }


                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <MainText color={colors.red} size={fontSize[12]}>
                      {t('264')}:
                    </MainText>
                    <MainText size={fontSize[12]} style={styles.username}>
                      {type !== 1 ? user?.data?.last_name + ' ' + user?.data?.first_name + ' ' + user?.data?.middle_name : qarzoluvchi.last_name + ' ' + qarzoluvchi.first_name + ' ' + qarzoluvchi.middle_name}
                    </MainText>
                  </View>
                </View>

                {/* Qarz beruvchi */}
                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 15, alignItems: 'center', }}>
                  <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 50, }}>
                    {
                      type !== 1 ?
                        (
                          qarzoluvchi.type === 2 ?
                            (
                              qarzoluvchi.gender == "1" ?
                                (<Person width={40} height={40} color={style.blue} />) :
                                (<Famale width={40} height={40} color={style.blue} />)
                            )
                            :
                            (
                              <Juridic width={50} height={50} color={style.blue} />
                            )
                        )
                        :
                        (
                          user?.data?.type === 2 ?
                            (
                              user?.data?.gender == "1" ?
                                (<Person width={40} height={40} color={style.blue} />) :
                                (<Famale width={40} height={40} color={style.blue} />)
                            )
                            :
                            (
                              <Juridic width={50} height={50} color={style.blue} />
                            )
                        )
                    }

                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <MainText color={colors.green} size={fontSize[12]}>
                      {t('267')}:
                    </MainText>
                    <MainText size={fontSize[12]} style={styles.username}>
                      {type === 0 ? qarzoluvchi.last_name + ' ' + qarzoluvchi.first_name + ' ' + qarzoluvchi.middle_name : user?.data?.last_name + ' ' + user?.data?.first_name + ' ' + user?.data?.middle_name}
                    </MainText>
                  </View>
                </View>
              </View>
              <View>
                <View>{renderRadioButtons}</View>
                <View style={styles.TextInputLabelContainer}>
                  <View style={styles.inputTitle}>
                    <MainText size={fontSize[12]}>Summani kiriting</MainText>
                  </View>
                  {renderInput}
                </View>
                <View style={styles.TextInputLabelContainer}>
                  <View style={styles.inputTitle}>
                    <MainText size={fontSize[12]}>{t('273')}</MainText>
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => setOpen(!open)}
                      style={styles.TextInput}>
                      <MainText size={fontSize[14]}>
                        {settingDate(date) === settingDate(Date.now()) ? (
                          <MainText size={fontSize[14]} style={{ opacity: 0.5 }}>
                            dd.mm.yyyy
                          </MainText>
                        ) : (
                          settingDate(date)
                        )}
                      </MainText>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <CheckBox
                    value={checked}
                    tintColor={'#DBDBDB'}
                    onTintColor={style.blue}
                    tintColors={{
                      true: style.blue,
                      false: style.disabledButtonColor,
                    }}
                    onValueChange={() => setChecked(!checked)}
                  />
                  {/* //276 */}
                  <Text
                    style={{
                      fontSize: fontSize[12],
                      fontFamily: font.medium,
                      left: 4,
                    }}>
                    <Trans
                      i18nKey={'276'}
                      values={{
                        start: user?.data?.cnt,
                      }}
                      components={{
                        start: (
                          <Text
                            style={{
                              fontFamily: font.medium,
                              fontSize: fontSize[12],
                              color: style.blue,
                            }}
                            onPress={toggleModal}
                          />
                        ),
                      }}
                    />
                  </Text>
                  {/* <Text onPress={toggleModal} style={styles.text}>
                    {t('318')}{' '}
                  </Text>
                  <MainText size={fontSize[12]}>bilan tanishdim</MainText> */}
                </View>
                {type === 0 ? (
                  user?.data?.cnt === 0 ? null : (
                    <View style={{ alignSelf: 'center', marginBottom: 8 }}>
                      <Text style={{ color: 'black' }}>
                        <Trans
                          i18nKey={'708'}
                          values={{
                            nx: user?.data?.cnt,
                          }}
                          components={{
                            nx: <Text style={{ fontFamily: font.medium, }} />,
                          }}
                        />
                      </Text>
                    </View>
                  )
                ) : null}
                {checked && amount.length > 0
                  ? type === 0
                    ? user.data.cnt === 0
                      ? renderSum
                      : null
                    : null
                  : null}
                <View>
                  <TouchableOpacity
                    disabled={
                      disabled || settingDate(date) === settingDate(Date.now())
                    }
                    onPress={fetchData}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          disabled ||
                            settingDate(date) === settingDate(Date.now())
                            ? style.disabledButtonColor
                            : style.blue,
                      },
                    ]}>
                    <MainText color={colors.white}>{t('87')}</MainText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <MeetInfoGiveDebtModal toggleModal={toggleModal} visible={visible} />
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
            cancelText={t('798')}
            theme="light"
            modal={true}
            minimumDate={new Date()}
            onCancel={() => {
              setOpen(false);
            }}
            title={t('795')}
            onConfirm={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        )}

        {/* <DateModal
        date={date}
        setDate={setDate}
        open={open}
        setOpen={setOpen}
        title={`Qarzni qaytarish \nvaqtini belgilang `}
      /> */}

        <Toast config={toastConfig} />
      </Provider>
    </View >
  );
};

export default GiveDebtUser;

export function formatDateMinus(date) {
  const tt = new Date(date);

  return tt.toISOString().slice(0, 10);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },

  text: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.blue,
    marginLeft: 5,
  },
  count: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#000',
  },
  vim: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '100%',
  },
  dateText: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#000',
  },
  button: {
    width: '85%',
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    height: style.textInputHeight,
    alignSelf: 'center',
  },
  username: {
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    maxWidth: '90%',
  },
  titleGiveDebt: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: 'red',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  cardViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  userImage: {
    width: style.width / 6,
    height: style.width / 6,
    borderRadius: style.width / 6,
  },
  time: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },

  main: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  aboutUsContainer: {
    backgroundColor: '#EAF2FB',
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
    marginBottom: 10,
    paddingVertical: 20,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    fontFamily: style.fontFamilyMedium,
    fontSize: fontSize[14],
    color: style.textColor,
  },
  buttontime: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '90%',
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#EAF2FB',
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  inputTitle: {
    position: 'absolute',
    marginLeft: 15,
    flex: 1,
    zIndex: 1,
    top: -10,
    backgroundColor: '#EAF2FB',
    paddingLeft: 5,
    paddingRight: 5,
  },
  containerrr: {
    flex: 1,
    width: style.width / 2.4,
    backgroundColor: '#fff',
    borderRadius: 8,
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
  sum: {
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.MoneyColor,
  },
  title: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyBold,
    color: style.textColor,
  },
});
