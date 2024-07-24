import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Modal} from 'react-native-paper';
import {style} from '../../../theme/style';
import {useDispatch, useSelector} from 'react-redux';
import {contractModalShow} from '../../../store/reducers/HomeReducer';

import Pdf from 'react-native-pdf';
import axios from 'axios';
import {URL} from '../../constants';
import {storage} from '../../../store/api/token/getToken';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Loading from '../../components/Loading';
import CheckBox from '@react-native-community/checkbox';
import {fontSize} from '../../../theme/font';
const {width, height} = Dimensions.get('screen');

const ContractModal = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [page, setPage] = useState(1);
  const {contract} = useSelector(state => state.HomeReducer);
  const onClose = useCallback(async () => {
    if (page === 15) {
      const token = storage.getString('token');
      try {
        setLoading(true);
        const {data} = await axios.put(
          URL + '/user/edit_contract',
          {},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        setLoading(false);
        if (data.success) {
          dispatch(contractModalShow({show: false}));
        }
      } catch (error) {
        setLoading(false);
        Toast.show({
          autoHide: true,
          visibilityTime: 3000,
          position: 'bottom',
          type: 'error2',
          props: {desc: "Amalga oxshirib bo'lmadi "},
        });
      }
    } else {
      console.log('red');
    }
  }, [dispatch, page]);

  return (
    <Modal visible={contract} dismissable={false}>
      <View style={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Pdf
              trustAllCerts={false}
              enablePaging={true}
              activityIndicator={() => (
                <ActivityIndicator size={'large'} color={style.blue} />
              )}
              source={{
                uri: `https://pdf.zerox.uz/oferta.pdf`,
                method: 'GET',
              }}
              onLoadComplete={() => {
                setLoading(false);
              }}
              onPageChanged={(page, allpage) => {
                setPage(page);
                setCheck(false);
                console.log(page);
              }}
              style={styles.pdf}
            />
            <View style={{backgroundColor: '#fff'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (page !== 15) {
                    Toast.show({
                      autoHide: true,
                      position: 'bottom',
                      props: {
                        desc: "Ommaviy ofertani oxirigacha o'qib chiqing va tasdiqlang.",
                      },
                      type: 'error2',
                      visibilityTime: 3000,
                    });
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <CheckBox
                    value={check}
                    tintColor={'#DBDBDB'}
                    onTintColor={style.blue}
                    tintColors={{
                      true: style.blue,
                      false: style.disabledButtonColor,
                    }}
                    disabled={page !== 15 ? true : false}
                    onValueChange={() => {
                      if (page === 15) {
                        setCheck(!check);
                      }
                    }}
                  />
                  <Text style={styles.teext}>
                    Ommaviy oferta bilan tanishib chiqdim.{'\n'}Oferta
                    shartlarini qabul qilaman.
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                disabled={check ? false : true}
                onPress={onClose}
                style={[
                  styles.btn,
                  {
                    backgroundColor: check
                      ? style.blue
                      : style.disabledButtonColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.teext,
                    {color: 'white', paddingHorizontal: 10, marginLeft: 0},
                  ]}>
                  Tasdiqlash
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ContractModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    width: width,
    height: height,
    alignSelf: 'center',
    padding: 10,
  },
  btn: {
    // position: 'absolute',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: style.blue,
    borderRadius: 12,
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 50,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  teext: {
    fontFamily: style.fontFamilyMedium,
    fontSize: fontSize[13],
    color: style.blue,
    marginLeft: 10,
    maxWidth: '90%',
  },
});
