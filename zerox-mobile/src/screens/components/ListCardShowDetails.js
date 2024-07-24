import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { style } from '../../theme/style';
import { useNavigation } from '@react-navigation/native';

const ListCardShowDetails = ({ title, width, disabled, data = [] }) => {
  const navigation = useNavigation();
  const [uz] = useState(() => {
    let a = [];
    data.map(item => {
      if (item.currency === 'UZS') {
        a.push(item);
      }
    });
    return a;
  });
  const [usd] = useState(() => {
    let b = [];
    data.map(item => {
      if (item.currency === 'USD') {
        b.push(item);
      }
    });
    return b;
  });
  const [blue, setBlue] = useState(true);
  const onChangeColor = useCallback(bool => {
    setBlue(bool);
  }, []);
  const OnPress = () => {
    navigation.navigate('SearchDebitor', {
      urls: 'contract/near?type=debitor&page=1&limit=500',
    });
  };

  return (
    <View style={[styles.containerrr, { width: width }]}>
      <View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          <Text style={[styles.title, { color: style.blue }]}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onChangeColor(true);
            }}
            style={[
              styles.valyut,
              { backgroundColor: blue ? style.blue : '#fff' },
            ]}
          >
            <Text
              style={[
                styles.valyutText,
                { color: blue ? '#fff' : style.textColor },
              ]}
            >
              UZS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangeColor(false);
            }}
            style={[
              styles.valyut,
              { backgroundColor: blue ? '#fff' : style.blue },
            ]}
          >
            <Text
              style={[
                styles.valyutText,
                { color: blue ? style.textColor : '#fff' },
              ]}
            >
              USD
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: style.backgroundColor,
            justifyContent: 'center',
            height: 40,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}
          >
            <Text style={styles.text}>QOLGAN VAQT</Text>
            <Text style={styles.text}>SUMMA</Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            {blue ? (
              data?.length === 0 ? (
                <Text
                  style={[
                    styles.text,
                    { fontSize: style.fontSize.small - 2, alignSelf: 'center' },
                  ]}
                >
                  Mavjud emas
                </Text>
              ) : uz.length === 0 ? (
                <Text
                  style={[
                    styles.text,
                    { fontSize: style.fontSize.small - 2, alignSelf: 'center' },
                  ]}
                >
                  Mavjud emas
                </Text>
              ) : (
                uz?.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        disabled={disabled}
                        onPress={OnPress}
                        key={index}
                        style={styles.listContainer}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            {
                              color: returnColor(CheckDate(item?.end_date)),
                            },
                          ]}
                        >
                          {CheckDate(item?.end_date)}
                        </Text>
                        <Text style={[styles.money, { color: '#000' }]}>
                          {item?.residual_amount?.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ' ',
                          )}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.line} />
                    </>
                  );
                })
              )
            ) : data?.length === 0 ? (
              <Text
                style={[
                  styles.text,
                  { fontSize: style.fontSize.small - 2, alignSelf: 'center' },
                ]}
              >
                Mavjud emas
              </Text>
            ) : usd.length === 0 ? (
              <Text
                style={[
                  styles.text,
                  { fontSize: style.fontSize.small - 2, alignSelf: 'center' },
                ]}
              >
                Mavjud emas
              </Text>
            ) : (
              usd?.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={OnPress}
                      key={index}
                      disabled={disabled}
                      style={styles.listContainer}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          {
                            color: returnColor(CheckDate(item?.end_date)),
                          },
                        ]}
                      >
                        {CheckDate(item?.end_date)}
                      </Text>
                      <Text
                        style={[
                          styles.money,
                          {
                            color: '#000',
                          },
                        ]}
                      >
                        {item?.residual_amount?.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ' ',
                        )}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const CheckDate = date => {
  const restTimeMillisec = new Date(date) - Date.now();

  if (restTimeMillisec < 0) {
    return 'Bugun';
  }
  const fixedNumber = restTimeMillisec / (24 * 60 * 60 * 1000).toFixed(2);

  if (Math.ceil(fixedNumber) > 1 && Math.ceil(fixedNumber) < 4) {
    return `${Math.ceil(fixedNumber).toFixed(0)} kun`;
  }
  if (Math.ceil(fixedNumber) > 3) {
    return `${Math.ceil(fixedNumber).toFixed(0)} kun`;
  }
  if (fixedNumber < 1 && fixedNumber > 0) {
    return '1 kun';
  }
};
const returnColor = type => {
  switch (type) {
    case 'Bugun':
      return 'red';
    case '1 kun':
      return 'red';
    case '2 kun':
      return 'red';
    default:
      return '#000';
  }
};

export default memo(ListCardShowDetails);

const styles = StyleSheet.create({
  containerrr: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: style.blue,
    opacity: 0.2,
  },
  valyutText: {
    fontFamily: style.fontFamilyMedium,
    fontSize: style.fontSize.small - 2,
    color: '#fff',
  },
  valyut: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 12,
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 6,
  },
  text: {
    fontSize: style.fontSize.small - 3,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  title: {
    fontSize: style.fontSize.small,
    fontFamily: style.fontFamilyMedium,
    color: style.textColor,
  },
  dayText: {
    color: '#718096',
    fontSize: style.fontSize.xa,
    fontFamily: style.fontFamilyMedium,
  },
  money: {
    fontSize: style.fontSize.xa,
    fontFamily: style.fontFamilyMedium,
    color: 'red',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
