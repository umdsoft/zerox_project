import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { normalize, style } from '../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import { storage } from '../../store/api/token/getToken';
import ProfileIcon from '../../images/Profile';
import ContractIcon from '../../images/Contract';
import SecurityIcon from '../../images/Security';
import LanguageIcon from '../../images/Language';
import ExitIcon from '../../images/Exit';
import Person from '../../images/home/person';
import Juridic from '../../images/home/juridic';
import OtherHeader from '../components/OtherHeader';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/reducers/HomeReducer';
import Famale from '../../images/Famale';
import { Modal } from 'react-native-paper';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/font';
import { onListTimePostAction } from '../../store/api/home';
import { getUniqueId } from 'react-native-device-info';
import { t } from 'i18next';

const UserScreen = () => {
  const route = useRoute();
  const { user } = route.params;
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const navigation = useNavigation();
  const navigateScreen = useCallback(
    name => {
      navigation.navigate(name);
    },
    [navigation],
  );

  const onCheckIsActive = useCallback(() => {
    if (user.data.is_active === 1) {
      navigateScreen('UserDetails');
    } else {
      dispatch(showModal({ show: true }));
    }
  }, [dispatch, navigateScreen, user]);

  const UserInfo = () => {
    if (user.data.is_active === 2) {
      return (
        <View style={[styles.info]}>
          <MainText size={fontSize[12]}>Tasdiqlanmagan foydalanuvchi</MainText>
          <TouchableOpacity
            onPress={() => {
              navigateScreen('ScanFaceMyId');
            }}
            style={styles.active}>
            <MainText color={colors.white} size={fontSize[12]}>
              {user.data.is_active === 2
                ? "Identifikatsiyadan o'tish"
                : 'Identifikatsiyalangan mijoz'}
            </MainText>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
          <View style={styles.info}>
            <MainText color={colors.blue} size={fontSize[11]}>
              Familiya
            </MainText>
            <MainText size={fontSize[13]}>{user?.data?.last_name}</MainText>
          </View>
          <View style={styles.info}>
            <MainText color={colors.blue} size={fontSize[11]}>
              Ism
            </MainText>
            <MainText size={fontSize[13]}>{user?.data?.first_name}</MainText>
          </View>
          <View style={styles.info}>
            <MainText color={colors.blue} size={fontSize[11]}>
              Otasining ismi
            </MainText>
            <MainText size={fontSize[13]}>{user?.data?.middle_name}</MainText>
          </View>
        </>
      );
    }
  };

  const onLastTime = useCallback(async () => {
    const device_id = await getUniqueId();
    dispatch(onListTimePostAction({ device_id }));
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: style.height / 2.5,
          position: 'absolute',
          width: style.width,
        }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={t('801')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.Main}>
            <View style={styles.aboutUsContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.userImageContainer}>
                  {user?.data?.type === 2 ? (
                    user?.data?.gender === 2 ? (
                      <Famale
                        width={normalize(50)}
                        height={normalize(normalize(100))}
                        color={style.blue}
                      />
                    ) : (
                      <Person
                        width={normalize(50)}
                        height={normalize(100)}
                        color={style.blue}
                      />
                    )
                  ) : (
                    <Juridic
                      width={normalize(50)}
                      height={normalize(100)}
                      color={style.blue}
                    />
                  )}
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  {user.data.type === 2 ? (
                    UserInfo()
                  ) : (
                    <>
                      <View style={styles.info}>
                        <MainText color={colors.blue} size={fontSize[12]}>
                          Direktor
                        </MainText>
                        <MainText size={fontSize[14]}>
                          {user?.data?.director}
                        </MainText>
                      </View>
                      <View style={styles.info}>
                        <MainText color={colors.blue} size={fontSize[12]}>
                          Kompaniya
                        </MainText>
                        <MainText size={fontSize[14]}>
                          {user?.data?.company}
                        </MainText>
                      </View>
                      <View style={styles.info}>
                        <MainText color={colors.blue} size={fontSize[12]}>
                          Manzil
                        </MainText>
                        <MainText size={fontSize[14]}>
                          {user?.data?.address}
                        </MainText>
                      </View>
                    </>
                  )}
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={onCheckIsActive}
                  style={styles.TouchableOpacity}>
                  <ProfileIcon size={22} color={style.blue} />
                  <MainText mrLeft={8} color={colors.black} size={fontSize[14]}>
                    {t('804')}
                  </MainText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Contract', {
                      url: 'https://pdf.zerox.uz/oferta.pdf',
                      title: t('672'),
                    });
                  }}
                  style={styles.TouchableOpacity}>
                  <ContractIcon size={22} color={style.blue} />
                  <MainText mrLeft={8} color={colors.black} size={fontSize[14]}>
                    {t('672')}
                  </MainText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigateScreen('Language');
                  }}
                  style={styles.TouchableOpacity}>
                  <LanguageIcon size={22} color={style.blue} />
                  <MainText mrLeft={8} color={colors.black} size={fontSize[14]}>
                    {t('til')}
                  </MainText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigateScreen('Security');
                  }}
                  style={styles.TouchableOpacity}>
                  <SecurityIcon size={22} color={style.blue} />
                  <MainText mrLeft={8} color={colors.black} size={fontSize[14]}>
                    {t('810')}
                  </MainText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setHide(true);
                  }}
                  style={styles.TouchableOpacity}>
                  <ExitIcon size={22} color={style.blue} />
                  <MainText mrLeft={8} color={colors.black} size={fontSize[14]}>
                    {t('663')}
                  </MainText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ExitModal
        hide={hide}
        setHide={setHide}
        navigation={navigation}
        onLastTime={onLastTime}
      />
    </View>
  );
};

const ExitModal = ({ hide, setHide, navigation, onLastTime }) => {
  return (
    <Modal
      onDismiss={() => {
        setHide(false);
      }}
      visible={hide}>
      <View style={styles.modal}>
        <View>
          <MainText size={fontSize[14]}>{t('666')}</MainText>
          <View style={styles.brnCn}>
            <TouchableOpacity
              onPress={() => {
                setHide(false);
              }}
              style={styles.btn}>
              <MainText color={colors.white} size={fontSize[14]}>
                {t('18')}
              </MainText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onLastTime();
                storage.delete('firsttime');
                storage.delete('token');
                storage.delete('localpassword');
                storage.delete('fcmtoken');
                navigation.reset({
                  routes: [{ name: 'SelectLanguageScreen' }],
                  index: 0,
                });
                setHide(false);
              }}
              style={styles.btn}>
              <MainText color={colors.white} size={fontSize[14]}>
                {t('663')}
              </MainText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: normalize(40),
    backgroundColor: style.blue,
    borderRadius: 12,
  },
  brnCn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  titlex: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 12,
    padding: 10,

    // height: normalize(110),
    // maxHeight: normalize(110),
  },
  active: {
    backgroundColor: style.blue,
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 8,
    marginTop: 12,
  },
  TouchableOpacity: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 5,
  },
  optionTx: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa + 3,
    color: '#000',
    marginLeft: 5,
  },
  name: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa + 3,
    color: '#000',
  },
  info: {
    marginTop: 5,
    maxWidth: '100%',
  },
  title: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xa + 1,
    color: style.blue,
  },
  userImageContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Main: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  aboutUsContainer: {
    backgroundColor: '#EAF2FB',

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
    paddingBottom: 20,
    marginBottom: 5,
  },
});
