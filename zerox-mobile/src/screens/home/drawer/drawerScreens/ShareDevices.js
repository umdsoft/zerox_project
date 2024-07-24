import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BackGroundIcon} from '../../../../helper/homeIcon';
import {style} from '../../../../theme/style';

import OtherHeader from '../../../components/OtherHeader';
import MainText from '../../../components/MainText';
import {font, fontSize} from '../../../../theme/font';
import socketService from '../../../../helper/socketService';

import {useDispatch, useSelector} from 'react-redux';
import IosIcon from '../../../../images/ios';
import AndroidIcon from '../../../../images/android';
import LaptopIcon from '../../../../images/laptop';

import {colors} from '../../../../theme/colors';
import {getUniqueId} from 'react-native-device-info';
import {getDevicesAction, onDeleteDevices} from '../../../../store/api/home';

const ShareDevices = () => {
  const {user, devices} = useSelector(state => state.HomeReducer);
  const [data, setData] = useState([]);
  const [currect, setCurrent] = useState({});
  const dispatch = useDispatch();
  const checking = useCallback(async () => {
    const id = await getUniqueId();
    const a = devices.filter(item => item.device_id === id);
    const b = devices.filter(item => item.device_id !== id);

    setData(b);
    setCurrent(a[0]);
  }, []);

  const onDeleteDevice = useCallback(async () => {
    let c = [];

    devices.map((item, index) => {
      if (item.id !== currect.id) {
        c.push(item.id);
      }
    });

    dispatch(onDeleteDevices({data: c}))
      .then(value => {
        dispatch(getDevicesAction());
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    checking();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          height: style.height / 2.5,
          width: '100%',
        }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={'Ulangan qurilmalar'} />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.aboutUsContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <MainText size={fontSize[12]}>Hozirgi seans</MainText>
            </View>
            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.blue,
                    borderRadius: 50,
                  }}>
                  {renderImage(currect)}
                </View>
                <View style={{marginLeft: 10}}>
                  <MainText size={14} ft={font.bold}>
                    {currect?.device_name}
                  </MainText>
                  <MainText size={13}>
                    ZeroX{' '}
                    {Platform.OS === 'ios'
                      ? `IOS ${currect?.system_version}`
                      : `Android ${currect?.system_version}`}
                  </MainText>
                  <MainText size={12} color="gray">
                    {currect?.location} • {socketService.connected()}
                  </MainText>
                </View>
              </View>
              {data.length === 0 ? null : (
                <TouchableOpacity onPress={onDeleteDevice} style={styles.btn}>
                  <MainText color="red" size={fontSize[12]}>
                    Barcha seanslarni o'chirish
                  </MainText>
                </TouchableOpacity>
              )}
            </View>
            {data.length === 0 ? (
              <View style={{marginTop: 20, alignItems: 'center'}}>
                <MainText size={fontSize[12]}>
                  Sizda boshqa seanslar mavjud emas
                </MainText>
              </View>
            ) : (
              <View style={{marginTop: 10}}>
                <MainText size={fontSize[12]}>Active seanslar</MainText>
                <View>
                  {data.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.blue,
                            borderRadius: 50,
                          }}>
                          {renderImage(item)}
                        </View>
                        <View style={{marginLeft: 10}}>
                          <MainText size={14} ft={font.bold}>
                            {item.device_name}
                          </MainText>
                          <MainText size={13}>
                            ZeroX {renderText(item)}
                          </MainText>
                          <MainText size={12} color="gray">
                            {item?.location}
                          </MainText>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const renderImage = item => {
  console.log(item);
  switch (item?.os_type) {
    case 'Destop':
      return <LaptopIcon width={24} height={24} color="white" />;
    case 'Apple':
      return <IosIcon width={24} height={24} color="white" />;
    case 'google':
      return <AndroidIcon width={24} height={24} color="white" />;
    default:
      return <AndroidIcon width={24} height={24} color="white" />;
  }
};

const renderText = item => {
  if (item.os_type === 'Apple') {
    return `IOS ${item?.system_version}`;
  }
  if (item.os_type === 'Android') {
    return `Android ${item?.system_version}`;
  }
  return `Android ${item?.system_version}`;
};

export default ShareDevices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  btn: {
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: style.fontSize.xx,
    color: style.textColor,
    fontFamily: style.fontFamilyMedium,
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
    color: '#fff',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
  },
  main: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
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

  title: {
    fontSize: style.fontSize.xs,
    color: style.textColor,
    fontFamily: style.fontFamilyBold,
    alignSelf: 'center',
  },
});
