import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {style} from '../../theme/style';
import {mylog} from '../../log';
const NewsNotificationCard = ({data}) => {
  mylog(data);
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 15, marginHorizontal: 15}}>
        <View style={{}}>
          <Text style={styles.notificationTitle}>Yangiliklar</Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={[styles.notification, {fontSize: style.fontSize.small}]}>
            Endilikda mobil ilovamiz yanada qulay va keng imkoniyatli
          </Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.notification}>
            Debitor va Kreditor qarzdorliklarni vaqtida to’lab boring va
            statusingizni tiklang Debitor va Kreditor qarzdorliklarni vaqtida
            to’lab boring va statusingizni tiklang
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(NewsNotificationCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 10,
    elevation: 7,
  },
  button: {
    backgroundColor: style.blue,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: style.width / 4,
  },
  notification: {
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
    lineHeight: 25,
  },
  notificationTitle: {
    fontSize: style.fontSize.x,
    fontFamily: style.fontFamilyBold,
    color: style.textColor,
  },
});
