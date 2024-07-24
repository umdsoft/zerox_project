import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import OtherHeader from '../components/OtherHeader';
import { BackGroundIcon } from '../../helper/homeIcon';
import { normalize, style } from '../../theme/style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBarSendMoney from '../../navigation/TopTabBarSendMoney';
import { useFetch } from '../../hooks/useFetch';
import Loading from '../components/Loading';
import { URL, renderHTMLS } from '../constants';
import PdfIcon from '../../images/pdf';
import { sortText } from '../components/StatisticCard';

import Transfer from '../../images/Transfer';
import Transfer2 from '../../images/Transfer2';
import { Modal } from 'react-native-paper';
import Cancel from '../../images/Cancel';
import Success from '../../images/Success';
import LottieView from 'lottie-react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import Money from '../../images/Money';
import FileViewer from 'react-native-file-viewer';
import { settingDate } from '../../helper';
import { t } from 'i18next';
const TopTab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('screen');
const SendMoneyHistory = () => {
  let modalRef = useRef(null);

  //type 2 kirim 1 bulsa chiqim

  const openModal = useCallback((item, type) => {
    modalRef?.open(true, item, type);
  }, []);
  const closeModal = useCallback(() => {
    console.log('close');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <BackGroundIcon width="100%" height="100%" />
      </View>

      <OtherHeader title={t('834')} />

      <View style={styles.topbar}>
        <TopTab.Navigator tabBar={props => <TopTabBarSendMoney {...props} />}>
          <TopTab.Screen
            name="Enter"
            component={() => (
              <Enter openModal={openModal} closeModal={closeModal} />
            )}
            options={{ title: t('576') }}
          />
          <TopTab.Screen
            name="Exit"
            component={() => (
              <Exit openModal={openModal} closeModal={closeModal} />
            )}
            options={{ title: t('579') }}
          />
        </TopTab.Navigator>
      </View>
      <ShowDetailsModal getRef={props => (modalRef = props)} />
    </View>
  );
};
const ListStatistic = ({ item, index, type, openModal }) => {
  const mainInfo = userType => {
    switch (userType) {
      case 3:
        return (
          <Text style={styles.number2}>
            {item?.dname}
            {Number(type) === 2 ? `\n${t('591')}` : `\n${t('588')}`}
          </Text>
        );
      case 2:
        return (
          <Text style={styles.name}>
            {item?.dname}
            {'\n'}
            {Number(type) === 2 ? `\n${t('591')}` : `\n${t('588')}`}
          </Text>
        );
      case 5:
        return (
          <Text style={styles.number2}>
            Parolni tiklash jarayonida MyID orqali identifikatsiya uchun to’lov
          </Text>
        );

      case 1:
        return (
          <Text style={styles.number2}>
            {item?.number + '-sonli qarz shartnomasi uchun'}
          </Text>
        );
      case 4:
        return <Text style={styles.number2}>{t('594')}</Text>;
    }
  };

  const renderIcon = iconType => {
    switch (iconType) {
      case 4:
        return (
          <Money width={normalize(16)} color={'#fff'} height={normalize(16)} />
        );
      case 5:
        return (
          <Money width={normalize(16)} color={'#fff'} height={normalize(16)} />
        );

      case 1:
        return (
          <Transfer2
            width={normalize(16)}
            color={'#fff'}
            height={normalize(16)}
          />
        );

      default:
        return (
          <Transfer
            width={normalize(16)}
            color={'#fff'}
            height={normalize(16)}
          />
        );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        openModal(item, type);
      }}
      style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.icon}>{renderIcon(item.type)}</View>
        <View style={{ flex: 1 }}>
          {mainInfo(item.type)}
          <View style={styles.uzs}>
            <Text style={[styles.number(type), { color: '#000' }]}>
              {settingDate(item?.created_at)} {item?.time?.slice(0, 5)}
            </Text>
            <Text style={styles.number(type)}>
              {type === 2 ? ' + ' : ' - '}
              {sortText(item?.amount)} {t('som')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Enter = ({ openModal, closeModal }) => {
  const { data, error, loading } = useFetch({
    method: 'GET',
    url: URL + '/home/cs?status=0',
  });
  console.log(data)
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[styles.container]}>
      <FlatList
        contentContainerStyle={styles.flat}
        data={data.data}
        keyExtractor={({ id }) =>
          `${Math.round(Math.random) * 10000}` + id?.toString()
        }
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                autoPlay
                source={require('../../images/not-found.json')}
                style={{
                  width: normalize(200),
                  height: normalize(200),
                  marginTop: 40,
                }}
              />
            </View>
          );
        }}
        renderItem={({ item, index }) => (
          <ListStatistic
            item={item}
            index={index}
            type={2}
            openModal={openModal}
          />
        )}
      />
    </View>
  );
};

const Exit = ({ openModal, closeModal }) => {
  const { data, error, loading } = useFetch({
    method: 'GET',
    url: URL + '/home/cs?status=1',
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        contentContainerStyle={styles.flat}
        keyExtractor={({ id }) => id?.toString()}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                autoPlay
                source={require('../../images/not-found.json')}
                style={{
                  width: normalize(200),
                  height: normalize(200),
                  marginTop: 40,
                }}
              />
            </View>
          );
        }}
        renderItem={({ item, index }) => (
          <ListStatistic
            item={item}
            index={index}
            type={1}
            openModal={openModal}
          />
        )}
      />
    </View>
  );
};

const ShowDetailsModal = ({ getRef }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState(null);
  useEffect(() => {
    let ref = {
      open: (isOpen, item, typex) => {
        setShow(isOpen);
        setData(item);
        setType(typex);
      },
    };
    getRef(ref);
  }, [getRef]);

  const onDismiss = useCallback(() => {
    setShow(false);
  }, []);

  const RenderInfo = type => {
    switch (type) {
      case 3: {
        return (
          <>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('636')}</Text>
              <Text style={styles.info}>{data?.dname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('639')}</Text>
              <Text style={styles.info}>{data?.cname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('642')}</Text>
              <Text style={styles.info}>
                {sortText(data.amount)} {t('som')}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('330')}</Text>
              <Text style={styles.info}>
                {settingDate(data?.created_at)}
                {'    '}
                {data?.time?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('114')}</Text>
              <Text style={styles.info}>{data?.id}</Text>
            </View>
          </>
        );
      }

      case 2: {
        return (
          <>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('636')}</Text>
              <Text style={styles.info}>{data?.cname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('639')}</Text>
              <Text style={styles.info}>{data?.dname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('642')}</Text>
              <Text style={styles.info}>{sortText(data.amount)} UZS</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('330')}</Text>
              <Text style={styles.info}>
                {settingDate(data?.created_at)}
                {'    '}
                {data?.time?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('idNumber')}</Text>
              <Text style={styles.info}>{data?.id}</Text>
            </View>
          </>
        );
      }

      case 1: {
        return (
          <>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('648')}</Text>
              <Text style={[styles.info]}>{data?.dname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('651')}</Text>
              <Text style={[styles.info, { color: style.blue }]}>
                {data?.number}
              </Text>
            </View>

            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('654')}</Text>
              <Text style={styles.info}>{sortText(data.amount)} UZS</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('330')}</Text>
              <Text style={styles.info}>
                {settingDate(data?.created_at)}
                {'    '}
                {data?.time?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('idNumber')}</Text>
              <Text style={styles.info}>{data?.id}</Text>
            </View>
          </>
        );
      }
      case 5: {
        return (
          <>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('648')}</Text>
              <Text style={styles.info}>{data?.dname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>
                Parolni tiklash jarayonida MyID orqali identifikatsiya uchun
                to’lov{' '}
              </Text>
              <Text style={styles.info}>{sortText(data.amount)} UZS</Text>
            </View>

            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('330')}</Text>
              <Text style={styles.info}>
                {settingDate(data?.created_at)}
                {'    '}
                {data?.time?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('idNumber')}</Text>
              <Text style={styles.info}>{data?.id}</Text>
            </View>
          </>
        );
      }
      case 4: {
        return (
          <>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('648')}</Text>
              <Text style={[styles.info]}>{data?.dname}</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('642')}</Text>
              <Text style={styles.info}>{sortText(data.amount)} UZS</Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('330')}</Text>
              <Text style={styles.info}>
                {settingDate(data?.created_at)}
                {'    '}
                {data?.time?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.mainInside}>
              <Text style={styles.infoTitle}>{t('idNumber')}</Text>
              <Text style={styles.info}>{data?.id}</Text>
            </View>
          </>
        );
      }
    }
  };

  const onDownload = useCallback(async () => {
    const renderText = type => {
      switch (type) {
        case 2:
          return `O'tkazma_${String(data?.id)}`;
        case 3:
          return `O'tkazma_${String(data?.id)}`;
        case 4:
          return `Hisobni to’ldirish_${String(data?.id)}`;
        default:
          return `Komissiya_${String(data?.id)}`;
      }
    };

    try {
      let file = await RNHTMLtoPDF.convert({
        fileName: renderText(data.type),
        html: renderHTMLS(data),
        directory: 'docs',
        width: 200,
      });
      await FileViewer.open(`file://${file.filePath}`);
    } catch (error) {
      throw error;
    }
  }, [data]);

  const RenderText = type => {
    switch (type) {
      case 2:
        return t('591');
      case 3:
        return t('588');
      case 4:
        return t('592');
      case 1:
        return t('645');
      default:
        return t('645');
    }
  };

  return (
    <Modal
      dismissable={true}
      onDismiss={onDismiss}
      visible={show}
      style={styles.modal}>
      <View style={styles.modalCotainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>
            <RenderText type={type} />
          </Text>
          <TouchableOpacity onPress={onDismiss}>
            <Cancel width={normalize(20)} height={normalize(20)} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconSuccess}>
          <Success width={normalize(50)} height={normalize(50)} />
          {/* {data.type === 1 ? ( */}
          <Text style={styles.sum}>{sortText(data?.amount)} UZS</Text>
          {/* ) : null} */}
        </View>
        <View style={styles.main}>
          {/* <RenderInfo type={data.type} /> */}
          {RenderInfo(data.type)}
        </View>
        <View>
          <TouchableOpacity onPress={onDownload} style={styles.downloadButton}>
            <PdfIcon width={normalize(15)} height={normalize(15)} />
            <Text style={[styles.info, { color: '#fff', marginLeft: 4 }]}>
              {t('download')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SendMoneyHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f5',
  },

  mainInside: {
    marginTop: normalize(8),
  },
  sum: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.MoneyColor,
    marginTop: 5,
  },
  downloadButton: {
    backgroundColor: style.blue,
    width: '60%',
    paddingVertical: normalize(10),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  info: {
    marginTop: normalize(3),
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx - 1,
    color: '#000',
  },
  main: {
    marginTop: normalize(10),
  },
  infoTitle: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx - 2,
    color: '#000',
    opacity: 0.5,
  },
  title: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: '#000',
  },
  iconSuccess: {
    alignSelf: 'center',
    marginTop: normalize(15),
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    height: style.height / 3,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    height: normalize(400),
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width - normalize(40),
    alignSelf: 'center',
    marginTop: (normalize(height) - normalize(340)) / 3,
    marginLeft: (width - (width - normalize(40))) / 2,
  },
  modalCotainer: {
    width: '100%',
    // height: normalize(400),
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: normalize(15),
  },
  number2: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx - 2,
    color: '#000',
  },
  topbar: { flex: 1, marginTop: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  icon: {
    backgroundColor: style.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  uzs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  flat: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: normalize(25),
  },
  name: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx - 2,
    color: '#000',
  },
  number: type => {
    return {
      color: type === 2 ? '#47bb78' : 'red',
      fontFamily: style.fontFamilyMedium,
      fontSize: style.fontSize.xx - 2,
    };
  },
});
