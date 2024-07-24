import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { BottomTabNavigator } from '../../navigation/BottomTabBar';
import { BackGroundIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';

import { Portal, Provider } from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from '../../notification/notification';
import { getMe, getNotifications } from '../../store/api/home';
import { createFmtTokenAction } from '../../store/api/user';
import { storage } from '../../store/api/token/getToken';
import { useNavigation } from '@react-navigation/native';
import { PERMISSIONS, request } from 'react-native-permissions';

import axios from 'axios';

const Main = () => {
  const { user, notification } = useSelector(state => state.HomeReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onGetLocalToken = useCallback(async () => {
    storage.getString('fcmtoken');
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      storage.set('fcmtoken', token);
      console.log(token, 'token');
      dispatch(createFmtTokenAction({ fmt_token: token })).then(() => {
        dispatch(getMe());
      });
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const requestUserPermission = async () => {
      request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
        if (result === 'granted') {
          console.log('granted');
        }
        if (result === 'denied') {
          console.log('denied');
        }
      });
    };
    requestUserPermission();
  }, []);

  useEffect(() => {
    // const fetchToken = async () => {
    //   const token = await getFcmToken();
    //   console.log(token, 'ffff');
    //   console.log(user, 'user');
    //   if (user.data.rtf_token !== token) {
    //     dispatch(createFmtTokenAction({fmt_token: token}));
    //   }
    // };
    // const fetchTokenByLocal = async () => {
    //   await getFcmTokenFromLocalStorage();
    // };
    // fetchToken();
    // fetchTokenByLocal();
    onGetLocalToken();
    requestUserPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      navigation.navigate('Notification');
      console.log(remoteMessage.data, 'Data');
      dispatch(getNotifications());
      // Alert.alert('titoe', 'asdsadsad');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // Alert.alert('action', 'action');
          dispatch(getNotifications());
          navigation.navigate('Notification');
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch(error => console.log('failed', error));

    messaging().onMessage(async remoteMessage => {
      console.log('romome meesage', remoteMessage);
      dispatch(getNotifications());
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);




  // const askPermminsion = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Notification granted');
  //     } else {
  //       console.log('notification permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   askPermminsion();
  // }, []);

  useEffect(() => {
    const getUsd = () => {
      axios
        .get('https://cbu.uz/oz/arkhiv-kursov-valyut/json/')
        .then(val => {
          dispatch(setUsd({ usd: val.data[0].Rate }));
        })
        .catch(err => {
          throw err;
        });
    };
    getUsd();
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <Provider>
        <Portal>
          <StatusBar backgroundColor={style.blue} />
          <View style={styles.main}>
            <BackGroundIcon width="100%" height="100%" />
          </View>
          <Header
            user={user?.data}
            data={notification}
            show={notification?.bild?.length > 0}
            count={notification?.bild?.length}
          />

          <BottomTabNavigator />
        </Portal>
      </Provider>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    height: style.height / 2.5,
    width: '100%',
  },
});
