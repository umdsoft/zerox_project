import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { style } from '../../theme/style';
import { BackGroundIcon } from '../../helper/homeIcon';
import OtherHeader from '../components/OtherHeader';
import axios from 'axios';
import { URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../store/api/token/getToken';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../components/ToastConfig';
import BackgroundTimer from 'react-native-background-timer';
import AskPermission from '../../images/AskPermissonIcon';
import AskPermissionNearby from '../../images/AskPermissonNearby';
import EyeIcon from '../../images/Eye';
import socketService from '../../helper/socketService';
import { setNotification } from '../../store/reducers/HomeReducer';
import { t } from 'i18next';
const UserInfo = () => {
  const userInfo = useSelector(state => state.HomeReducer);
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, type } = params;

  const [active, setActive] = useState(false);
  const [first, setFirst] = useState(false);
  const [timer, setTimer] = useState(20);
  const [resolve, setResolve] = useState(false);
  const [reject, setReject] = useState(false);
  const [check, setCheck] = useState(true);

  const startTimerx = async () => {
    const token = storage.getString('token');
    const obj = {
      creditor: userInfo?.user?.data?.id,
      debitor: userInfo?.user?.data?.id,
      reciver: user?.id,
      // notificationType: ""
    };
    setActive(true);
    setFirst(true);
    setCheck(false);
    setReject(false);
    setResolve(false);

    try {
      const { data, status } = await axios.post(URL + '/notification/reqquest', obj, { headers: { Authorization: `Bearer ${token}` } },);
      Toast.show({ autoHide: true, position: 'bottom', visibilityTime: 2000, type: 'omad', props: { title: t('237'), desc: t('222') }, });
      if (status === 201) {
        setTimeout(() => {
          socketService.emit('notification', user?.id);
          socketService.on('notification', data => {
            dispatch(setNotification({ notification: data.not }));
          });
          navigation.navigate('Home');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: style.width, position: 'absolute', height: style.height / 3, }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('825')} />
      <View style={styles.main}>
        <View style={styles.aboutUsContainer}>
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20, }}>


            <View>
              <View style={[styles.TextInputLabelContainer, { width: '100%' }]}>
                <View style={styles.inputTitle}>
                  <Text style={styles.phoneText}>FISH : </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput value={user?.last_name + ' ' + user.first_name + ' ' + user.middle_name} multiline={true} placeholderTextColor={style.placeHolderColor} editable={false} keyboardType="default" style={[styles.TextInput, { paddingLeft: 15, paddingTop: 18, paddingBottom: 18, },]} />
                </View>
              </View>
              <View style={[styles.TextInputLabelContainer, { width: '100%' }]}>
                <View style={styles.inputTitle}>
                  <Text style={styles.phoneText}>{t('114')}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput placeholderTextColor={style.placeHolderColor} value={user?.uid} multiline={true} editable={false} keyboardType="default" style={[styles.TextInput, { paddingLeft: 15, width: '100%', paddingTop: 18, paddingBottom: 18, },]} />
                </View>
              </View>
            </View>




            <View>
              <Text style={styles.tix}>
                {resolve ? t('240') : reject ? t('252') : !active ? t('213') : t('225')}
              </Text>
              <TouchableOpacity
                disabled={active && first}
                onPress={() => {
                  startTimerx()
                }}
                activeOpacity={0.8}
                style={[styles.getUserInfoButton, { backgroundColor: active && first ? style.disabledButtonColor : resolve ? '#48BB78' : style.blue, flexDirection: 'row', },]}>
                {resolve ? <EyeIcon /> : <AskPermission />}
                <Text style={[styles.textButton, { fontSize: style.fontSize.small, marginLeft: 8 },]}>   {resolve ? t('216') : t('219')}  </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => { navigation.navigate('GiveDebtUser', { qarzoluvchi: user, type: type, }) }} activeOpacity={0.8} style={[styles.getUserInfoButton, { flexDirection: 'row', }]}>
                <AskPermissionNearby />
                <Text style={[styles.textButton, { fontSize: style.fontSize.small, marginLeft: 8 },]}>
                  {type === 1 ? t('216') : t('282')}
                </Text>
              </TouchableOpacity>
            </View>




          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export const secToMin = sec => {
  if (sec === undefined) {
    return '00:00';
  } else {
    return new Date(sec * 1000).toISOString().substring(14, 19);
  }
};

export default UserInfo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  dateText: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#000',
  },
  textButton: {
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: '#fff',
    textAlign: 'center',
  },
  registerButton: {
    width: '90%',
    height: style.buttonHeight,
    backgroundColor: style.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tix: {
    fontSize: style.fontSize.xa + 1.5,
    fontFamily: style.fontFamilyMedium,
    marginTop: 10,
    color: '#000',
  },
  button: {
    width: '100%',
    paddingVertical: 23,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  TextInput: {
    // paddingVertical: 18,
    width: '90%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    textTransform: 'uppercase',
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
  getUserInfoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: style.blue,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  phoneText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small,
    color: style.textColor,
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyBold,
    color: style.textColor,
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
    marginBottom: 10,
  },
});
