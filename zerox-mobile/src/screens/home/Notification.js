import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../navigation/TopTabBar';
import NewsNotificationCard from '../components/NewsNotification';
import { useDispatch, useSelector } from 'react-redux';
import Qarzdanvozkechilganligitogrisida from './notifications/all/Qarzdanvozkechilganligitogrisida';
import QarzShartnomasiniRasmiylashtirishTogrisida from './notifications/all/QarzShartnomasiniRasmiylashtirishTogrisida';
import Qarzmuddatiuzaytirilganligitogrisida from './notifications/all/Qarzmuddatiuzaytirilganligitogrisida';
import QarzToliqQaytarilganli from './notifications/all/QarzToliqQaytarilganli';
import Qarzniqaytarishtalabqilinganligitogrisida from './notifications/all/Qarzniqaytarishtalabqilinganligitogrisida';
import Qarzqismanqaytarilganli from './notifications/all/Qarzqismanqaytarilganli';
import Qarzmuddatiniuzaytirishsoralganligitogrisida from './notifications/all/Qarzmuddatiniuzaytirishsoralganligitogrisida';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../components/ToastConfig';
import {
  filter_notification,
  setNotification,
} from '../../store/reducers/HomeReducer';
import Qarzniqaytarishqabulqilinmaganligitogrisida from './notifications/all/Qarzniqaytarishqabulqilinmaganligitogrisida';
import QarzniQaytarishQabulQilinganligiTogrisida from './notifications/all/QarzniQaytarishQabulQilinganligiTogrisida';
import QarzShartnomasiningRadQilinganligiTogrisida from './notifications/all/QarzShartnomasiningRadQilinganligiTogrisida';
import QarzShartnomasiningQabulQilinganligiTogrisida from './notifications/all/QarzShartnomasiningQabulQilinganligiTogrisida';
import QarzMuddatiniUzaytirishRadEtilganligiTogrisida from './notifications/all/QarzMuddatiniUzaytirishRadEtilganligiTogrisida';
import axios from 'axios';
import { storage } from '../../store/api/token/getToken';
import { URL } from '../constants';
import QarzShartnomasiRuxsatSorash from './notifications/all/QarzShartnomasiRuxsatSorash';
import QarzniQaytarishRadQilinganligi from './notifications/all/QarzniQaytarishRadQilinganligi';
import OtherHeader from '../components/OtherHeader';
import QarzShartnomasiQabulQilinmaganligiHaqida from './notifications/all/QarzShartnomasiQabulQilinmaganligiHaqida';
import QarzShartnomasiRejectTime from './notifications/all/QarzShartnomasiRejectTime';
import PulMablagOtkazilganligi from './notifications/all/PulMablagOtkazilganligi';
import PulMablagOtkazilganligiHaqida from './notifications/all/PulMablagOtkazilganligiHaqida';
import { toastMessage } from '../../helper';
import { HomeApi } from '../../store/api/home';
import NewUser from './notifications/all/NewUser';
import RecoveryPassword from './notifications/all/RecoveryPassword';
import QarzniMuddatUzaytirishQabul from './notifications/all/QarzniMuddatUzaytirishQabul';
import MalumotniKorishgaRadEtildi from './notifications/all/MalumotniKorishgaRadEtildi';
import MalumotniKorishgaRuxsatBerildi from './notifications/all/MalumotniKorishgaRuxsatBerildi';
import MainText from '../components/MainText';
import { fontSize } from '../../theme/font';
import socketService from '../../helper/socketService';
import { t } from 'i18next';
const TopTab = createMaterialTopTabNavigator();
const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={'Bildirishnoma'} />
      <View style={{ flex: 1 }}>
        <View style={styles.main}>
          <View style={styles.aboutUsContainer}>
            <TopTab.Navigator tabBar={props => <TopTabBar {...props} />}>
              <TopTab.Screen
                options={{ tabBarLabel: t('657') }}
                name="Bildrishnoma"
                component={Bildrishnoma}
              />
              <TopTab.Screen
                options={{ tabBarLabel: t('660') }}
                name="News"
                component={News}
              />
            </TopTab.Navigator>
          </View>
        </View>
      </View>
    </View>
  );
};

const News = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { notification } = useSelector(state => state.HomeReducer);

  const onRefresh = useCallback(() => {
    setLoading(true);
    dispatch(HomeApi())
      .then(res => {
        setLoading(false);
      })
      .catch(_err => {
        setLoading(false);
        navigation.reset({ routes: [{ name: 'LoginWithPhone' }], index: 0 });
      });
  }, [dispatch, navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        data={notification?.news}
        keyExtractor={({ id }) => id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <MainText size={fontSize[12]}> {t('831')}</MainText>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return <NewsNotificationCard data={item} key={index.toString()} />;
        }}
      />
    </View>
  );
};
const Bildrishnoma = () => {
  const dispatch = useDispatch();

  const { notification, user } = useSelector(state => state.HomeReducer);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setLoading(true);
    dispatch(HomeApi())
      .then(res => {
        setLoading(false);
      })
      .catch(_err => {
        setLoading(false);
        navigation.reset({ routes: [{ name: 'LoginWithPhone' }], index: 0 });
      });
  }, [dispatch, navigation]);


  // Notoficationni o'chirish
  const okay = async (idx, type) => {
    const token = storage.getString('token');
    try {
      dispatch(filter_notification(idx));
      const info = await axios.put(URL + `/notification/ok/${idx}`, {}, { headers: { Authorization: `Bearer ${token}` }, },);
      if (info?.status === 200) {
        socketService.emit('notification', user?.data?.id);
        socketService.on('notification', data => { dispatch(setNotification({ notification: data.not })) });
        Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: toastMessage(type) }, type: 'omad', visibilityTime: 3000, });
      }
    }
    catch (error) {
      Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' }, type: 'error2', visibilityTime: 3000, });
    }
  };
  const onSuccess = async (item, status, type) => {
    console.log(item.type)
    const token = storage.getString('token');
    const onAsk = async () => {
      const { data } = await axios.put(
        URL + `/notification/success/${item.id}`,
        {
          act: item.act,
          contract: item.contract,
          creditor: item.creditor,
          debitor: item.debitor,
          reciver: type === 'debitor' ? item.debitor : item.creditor,
          stype: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        socketService.emit('notification', item.debitor);
        socketService.on('notification', data => {
          dispatch(setNotification({ notification: data.not }));
        });
        Toast.show({
          autoHide: true, position: 'bottom', props: {
            desc: t('258')
          }, type: 'omad', visibilityTime: 3000,
        });
        dispatch(filter_notification(item.id));
      }
    };

    try {
      onAsk();
    } catch (error) {
      Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Xatolik', desc: 'Mobil hisobingizda yetarli mablag’ mavjud emas. Iltimos, hisobingizni yetarli miqdorda to’ldiring.', }, type: 'error2', visibilityTime: 3000, });
    }
  };
  const onReject = async (item, status, type) => {
    const token = storage.getString('token');

    try {
      dispatch(filter_notification(item.id));
      const { data } = await axios.put(
        URL + `/notification/success/${item.id}`,
        {
          act: item.act,
          contract: item.contract,
          creditor: item.creditor,
          debitor: item.debitor,
          reciver: type === 'creditor' ? item.creditor : item.debitor,
          stype: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        Toast.show({
          autoHide: true,
          position: 'bottom',
          props: { title: 'Muvaffaqiyatli', desc: 'Rad etildi' },
          type: 'omad',
          visibilityTime: 3000,
        });
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({ notification: data.not }));
      });
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' },
        type: 'error2',
        visibilityTime: 3000,
      });
    }
  };
  const onQismanQaytarilgan = async (item, status) => {
    const token = storage.getString('token');

    try {
      const { data } = await axios.post(
        URL + `/notification/qisman-qaytarish/${item.id}`,
        {
          act: item.act,
          contract: item.contract,
          creditor: item.creditor,
          debitor: item.debitor,
          reciver: item.reciver === item.debitor ? item.creditor : item.debitor,
          stype: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        Toast.show({
          autoHide: true,
          position: 'bottom',
          props: {
            title: 'Muvaffaqiyatli',
            desc: status === 1 ? 'Tasdiqlandi.' : 'Rad etildi',
          },
          type: 'omad',
          visibilityTime: 3000,
        });
        dispatch(filter_notification(item.id));
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({ notification: data.not }));
      });
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' },
        type: 'error2',
        visibilityTime: 3000,
      });
    }
  };
  const onToliqQaytgan = async (item, status) => {
    const token = storage.getString('token');

    try {
      const { data } = await axios.post(
        URL + `/notification/toliq-qaytarish/${item.id}`,
        {
          act: item.act,
          contract: item.contract,
          creditor: item.creditor,
          debitor: item.debitor,
          reciver: item.reciver === item.debitor ? item.creditor : item.debitor,
          stype: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        Toast.show({
          autoHide: true,
          position: 'bottom',
          props: {
            title: 'Muvaffaqiyatli',
            desc: status === 1 ? 'Tasdiqlandi' : 'Rad etildi',
          },
          type: 'omad',
          visibilityTime: 3000,
        });
        dispatch(filter_notification(item.id));
      }
      socketService.emit('notification', user?.data?.id);
      socketService.on('notification', data => {
        dispatch(setNotification({ notification: data.not }));
      });
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' },
        type: 'error2',
        visibilityTime: 3000,
      });
    }
  };
  const onQarzMuddatUzaytirish = async (item, status) => {
    const token = storage.getString('token');

    try {
      const info = await axios.post(
        URL + `/notification/time/${item.id}`,
        {
          debitor: item.debitor,
          creditor: item.creditor,
          contract: item.contract,
          stype: status,
          act: item.act,
          reciver: item.reciver !== item.debitor ? item.debitor : item.creditor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (info.data.success) {
        if (status == 1) {
          Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: t('258') }, type: 'omad', visibilityTime: 3000, });
        }
        if (status == 2) {
          Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: t('195') }, type: 'omad', visibilityTime: 3000, });
        }

        dispatch(filter_notification(item.id));
        socketService.emit('notification', user?.data?.id);
        socketService.on('notification', data => {
          dispatch(setNotification({ notification: data.not }));
        });
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        props: { title: 'Xatolik', desc: 'Xatolik sodir bo`ldi' },
        type: 'error2',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        keyExtractor={({ id }) => `${Math.round(Math.random() * 99919)}` + id?.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <MainText size={fontSize[12]}>
              {t('831')}
              </MainText>
            </View>
          );
        }}
        data={notification?.bild}
        renderItem={({ item, index }) => {


          switch (item.type) {
            //buldi bi batafsil qoldi
            case 0:
              return (
                <QarzShartnomasiniRasmiylashtirishTogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                  onSuccess={onSuccess}
                  onReject={onReject}
                />
              );
            case 1:
              return (
                <QarzToliqQaytarilganli
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                  onToliqQaytgan={onToliqQaytgan}
                  onQismanQaytarilgan={onQismanQaytarilgan}
                />
              );
            case 4:
              return (
                <Qarzdanvozkechilganligitogrisida
                  item={item}
                  okay={okay}
                  key={index.toString()}
                  navigation={navigation}
                />
              );
            case 2:
              return (
                <Qarzqismanqaytarilganli
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                  onToliqQaytgan={onToliqQaytgan}
                />
              );
            case 3:
              return (
                <Qarzmuddatiniuzaytirishsoralganligitogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                  onQarzMuddatUzaytirish={onQarzMuddatUzaytirish}
                  reject={onReject}
                />
              );
            case 17:
              return (
                <Qarzniqaytarishtalabqilinganligitogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                />
              );

            //buldi bi
            case 16:
              return (
                <Qarzmuddatiuzaytirilganligitogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                />
              );
            case 12:
              return (
                <Qarzmuddatiuzaytirilganligitogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                />
              );
            case 9:
              return (
                <Qarzniqaytarishqabulqilinmaganligitogrisida
                  item={item}
                  key={index.toString()}
                  okay={okay}
                  navigation={navigation}
                />
              );
            case 15:
              return (
                <Qarzniqaytarishqabulqilinmaganligitogrisida
                  item={item}
                  navigation={navigation}
                  okay={okay}
                  key={index.toString()}
                />
              );
            case 10:
              return (
                <QarzniQaytarishQabulQilinganligiTogrisida
                  item={item}
                  navigation={navigation}
                  okay={okay}
                  key={index.toString()}
                />
              );
            case 7:
              return (
                <QarzShartnomasiningRadQilinganligiTogrisida
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 8:
              return (
                <QarzShartnomasiningQabulQilinganligiTogrisida
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 13:
              return (
                <QarzMuddatiniUzaytirishRadEtilganligiTogrisida
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 11:
              return (
                <QarzniQaytarishQabulQilinganligiTogrisida
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );



            case 22:
              return (
                <QarzniQaytarishRadQilinganligi
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 21:
              return (
                <QarzShartnomasiRejectTime
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 24:
              return (
                <PulMablagOtkazilganligi
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 23:
              return (
                <PulMablagOtkazilganligiHaqida
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 25:
              return (
                <NewUser
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 26:
              return (
                <RecoveryPassword
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );
            case 27:
              return (
                <QarzniMuddatUzaytirishQabul
                  item={item}
                  key={index.toString()}
                  navigation={navigation}
                  okay={okay}
                />
              );


            case 19:
              return (<QarzShartnomasiRuxsatSorash item={item} navigation={navigation} okay={okay} key={index.toString()} />);
            case 31:
              return (<MalumotniKorishgaRadEtildi item={item} navigation={navigation} okay={okay} key={index.toString()} />)
            case 30:
              return (<MalumotniKorishgaRuxsatBerildi item={item} navigation={navigation} okay={okay} key={index.toString()} />)

          }
        }}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  pdfView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20,
  },
  userName: {
    fontSize: style.fontSize.x,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    padding: 80,
    alignSelf: 'center',
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
    color: style.textColor,
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
  },
  main: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
    paddingBottom: 10,
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
    padding: 10,
    zIndex: 1,
  },

  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
    alignSelf: 'center',
    textAlign: 'center',
  },
  headers: {
    height: style.height / 2.5,
    position: 'absolute',
    width: style.width,
  },
});
