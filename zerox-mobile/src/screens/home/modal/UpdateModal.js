import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Modal} from 'react-native-paper';
import {normalize, style} from '../../../theme/style';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {checkUpdate} from '../../../store/reducers/HomeReducer';

const UpdateModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {update} = useSelector(state => state.HomeReducer);
  const onClose = useCallback(async () => {
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/uz/app/flighty-live-flight-tracker/id1358823008'
        : 'https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_US&gl=US',
    );
    // dispatch(checkUpdate({update: false}));
  }, []);

  return (
    <Modal
      visible={update}
      onDismiss={() => {
        dispatch(checkUpdate({update: false}));
      }}
      dismissable={true}>
      <View style={styles.main}>
        <View style={styles.view}>
          <Text style={styles.teext}>
            Ilovaning yangi versiyasi mavjud.{'\n'}Iltimos, ilovani yangilang.
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={[styles.teext, {color: '#fff'}]}>
              Ilovani yangilash
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    width: '90%',
    height: normalize(100),
    alignSelf: 'center',
    padding: 10,
    borderRadius: 12,
  },
  btn: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: style.blue,
    borderRadius: 12,
    width: '100%',
  },
  view: {flex: 1, justifyContent: 'space-between'},
  teext: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.xx,
    color: style.textColor,
    marginLeft: 10,
    maxWidth: '90%',
  },
});
