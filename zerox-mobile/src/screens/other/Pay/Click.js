import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { BackGroundIcon } from '../../../helper/homeIcon';
import { style } from '../../../theme/style';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import ClickIcon from '../../../images/pay/ClickIcon';
import { useSelector } from 'react-redux';
import { encode } from 'base-64';
import OtherHeader from '../../components/OtherHeader';
import { t } from 'i18next';
import { textInputPlace } from '../../../helper/index';

const sortText = text => {
  return text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
};


const Pay = () => {
  const { type, title } = useRoute().params;
  const { user } = useSelector(state => state.HomeReducer);

  const [amount, setAmount] = useState('');
  // const [warnings, setWarnings] = useState(0);

  const PayUser = () => {
    try {
      const nums = String(amount).split(" ").join("")
      if (nums.length <= 3) {
        if (nums < 1000) {
          Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: t('822') }, type: 'error2', visibilityTime: 3000, })
        }
      }
      else {
        if (type === 0) {
          Linking.openURL(
            `https://my.click.uz/services/pay?service_id=24899&merchant_id=17375&amount=${amount}&transaction_param=${user.data.uid}`,
          );
        } else {
          if (type === 1) {
            let str = `m=62fa657ea12ad7a48f4b2dd9;ac.user_id=${user.data.uid};a=${amount * 100
              }`;
            let url = encode(str);
            Linking.openURL('https://checkout.paycom.uz/' + url);
          }
        }
      }

    } catch (error) {
      console.error('Err', error);
    }
  };
  // const setPayment = (nums) => {
  //   if (nums.length <= 3) {
  //     if (nums < 1000) {
  //       Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: t('822') }, type: 'error2', visibilityTime: 3000, })
  //     }
  //   }
  // }


  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', height: style.height / 3, width: '100%' }}>
        <BackGroundIcon width="100%" height="100%" />
      </View>
      <OtherHeader title={title} />
      <View style={[styles.main]}>
        <View style={styles.aboutUsContainer}>
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
            <View>
              <View style={styles.card}>
                <View style={styles.insideMoney}>
                  {type === 0 ? (
                    <ClickIcon width={200} height={50} color={style.blue} />
                  ) : type === 1 ? (
                    <Image source={require('../../../images/payme.png')} />
                  ) : (
                    <Image source={require('../../../images/paynet.png')} />
                  )}
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={[styles.TextInputLabelContainer, { width: '100%' }]}>

                <View style={{ flex: 1 }}>
                  <TextInput
                    value={textInputPlace(amount)}
                    placeholder={t('270')}
                    placeholderTextColor={style.placeHolderColor}
                    keyboardType="numeric"
                    onChangeText={(val) => {
                      setAmount(val);
                    }}
                    style={[styles.TextInput, { paddingLeft: 15 }]}
                  />
                </View>
              </View>
              <TouchableOpacity
                // disabled={amount.length > 3 ? false : true}
                activeOpacity={0.8}
                onPress={PayUser}
                style={[
                  styles.registerButton,
                  {
                    // backgroundColor: amount.length > 3 ? style.blue : style.disabledButtonColor,
                    backgroundColor: style.blue
                  },
                ]}>
                <Text style={styles.text}>{t('42')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.backgroundColor,
    flex: 1,
  },
  text: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xs,
    color: '#fff',
  },
  TextInputLabelContainer: {
    borderColor: style.textColor,
    borderWidth: 0.5,
    borderRadius: 6,
    width: '90%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  TextInput: {
    width: '100%',
    height: style.textInputHeight,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: style.fontSize.xx,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
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
  hisob: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
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
    // height: style.buttonHeight,
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
