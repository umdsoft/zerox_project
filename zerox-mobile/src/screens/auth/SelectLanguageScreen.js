import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Person from '../../images/boysee.svg';
import { style } from '../../theme/style';
import Uzbekistan from '../../images/uzbekistaan.svg';
import Russia from '../../images/russia.svg';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { font, fontSize } from '../../theme/font';
import RadioIcon from './../../images/auth/Radio';
import RadioFillIcon from './../../images/auth/RadioFill';

const SelectLanguageScreen = () => {
  const [lang, setLang] = useState(2);
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const onChangeLang = lang => {
    switch (lang) {
      case 'ru':
        setLang(0);
        break;
      case 'kr':
        setLang(1);
        break;
      case 'uz':
        setLang(2);
        break;
    }
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Person width="50%" height="50%" />
      </View>
      <View style={styles.languageContainer}>
        <MainText
          color={colors.black}
          ft={font.bold}
          size={fontSize[14]}
          style={styles.selectLanguageText}>
          {t('714').slice(0, -1)}
        </MainText>
        <MainText
          color={colors.black}
          ft={font.medium}
          mTop={8}
          textAlign={'center'}
          size={fontSize[11]}
          style={styles.selectLanguageText}>
          {t('717').slice(0, -1)}
        </MainText>
        <View style={styles.languageButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              onChangeLang('uz');
            }}
            activeOpacity={0.8}
            style={styles.languageButton}>
            <View style={styles.Flag}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Uzbekistan />
                <MainText size={fontSize[13]} color={colors.black} pdLeft={8}>
                  O'zbekcha
                </MainText>
              </View>
              {lang === 2 ? (
                <RadioIcon width={20} height={20} color={colors.black} />
              ) : (
                <RadioFillIcon width={20} height={20} color={colors.black} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangeLang('kr');
            }}
            activeOpacity={0.8}
            style={styles.languageButton}>
            <View style={styles.Flag}>
              <View style={{ flexDirection: 'row' }}>
                <Uzbekistan />
                <MainText pdLeft={8} size={fontSize[13]} color={colors.black}>
                  Ўзбекча
                </MainText>
              </View>
              {lang === 1 ? (
                <RadioIcon width={20} height={20} color={colors.black} />
              ) : (
                <RadioFillIcon width={20} height={20} color={colors.black} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangeLang('ru');
            }}
            activeOpacity={0.8}
            style={styles.languageButton}>
            <View style={styles.Flag}>
              <View style={{ flexDirection: 'row' }}>
                <Russia />
                <MainText pdLeft={8} size={fontSize[13]} color={colors.black}>
                  Русский
                </MainText>
              </View>
              {lang === 0 ? (
                <RadioIcon width={20} height={20} color={colors.black} />
              ) : (
                <RadioFillIcon width={20} height={20} color={colors.black} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginWithPhone');
            }}
            activeOpacity={0.8}
            style={[
              styles.languageButton,
              { marginTop: 30, backgroundColor: style.blue, padding: 20 },
            ]}>
            <View
              style={[
                styles.Flag,
                { alignItems: 'center', justifyContent: 'center' },
              ]}>
              <MainText size={fontSize[13]} color={colors.white} pdLeft={8}>
                {t('42')}
              </MainText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 12,
  },
  languageText: {
    fontSize: style.fontSize.small + 1,
    fontFamily: style.fontFamilyMedium,
    color: '#fff',
    marginLeft: 3,
  },
  Flag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  languageButtonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',

    marginHorizontal: 20,
    width: '90%',
  },
  languageButton: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  BackButton: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 15,
  },
  selectLanguageText: {
    fontSize: style.fontSize.xs,
    fontFamily: style.fontFamilyBold,
    color: style.textColor,
  },
});
