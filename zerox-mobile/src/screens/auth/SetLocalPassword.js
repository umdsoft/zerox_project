import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { normalize, style } from '../../theme/style';

import SetCode from '../../images/setCode.svg';
import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import ArrowRight from '../../images/ChevronRight';
import ArrowLeft from '../../images/ArrowLeft';
import { storage } from '../../store/api/token/getToken';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import MainText from '../components/MainText';
import { colors } from '../../theme/colors';
import { font, fontSize } from '../../theme/font';
import { t } from 'i18next';
import BiometricModule from '../../../BiometricModule';



const SetLocalPassword = () => {
    const [supportScan, setSupportScan] = useState(false);
    const [password, setPassword] = useState('');
    const touch = storage.getBoolean('touch')
    const [isLocal] = useState(() => {
        const pass = storage.getString('localpassword');
        if (pass === undefined) {
            return true;
        } else {
            return false;
        }
    });
    const navigation = useNavigation();

    const onFingerScan = async () => {
        try {
            const result = await BiometricModule.authenticate()
            console.log('Success', result);
            setTimeout(() => {
                navigation.reset({
                    routes: [{ name: 'BottomTabNavigator' }],
                    index: 0,
                });
            }, 1200)
        } catch (error) {
            console.log('Error', error.message);
        }

    };


    const onSetCode = val => {
        if (password.length <= 3) {
            setPassword(password + val);
            const local_password = storage.getString('localpassword');
            if (local_password === undefined) {
                if ((password + val).length === 4) {
                    storage.set('localpassword', password + val);
                    const token = storage.getString('token');
                    navigation.reset({
                        routes: [{ name: 'BottomTabNavigator', params: { token: token } }],
                        index: 0,
                    });
                }
            } else {
                if ((password + val).length === 4) {
                    if (local_password === password + val) {
                        const token = storage.getString('token');
                        navigation.reset({
                            routes: [{ name: 'BottomTabNavigator', params: { token: token } }],
                            index: 0,
                        });
                    } else {
                        setPassword('');
                        Toast.show({
                            type: 'error2',
                            position: 'top',
                            props: { title: 'Xatolik!', desc: "Parol noto'g'ri" },
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: Platform.OS === 'android' ? 5 : normalize(50),
                        });
                    }
                }
            }
        }
    };
    const onBackSpace = () => {
        setPassword(password.slice(0, -1));
    };
    const onSupportScan = async () => {
        const local_password = storage.getString('localpassword');
        const { available } = await rnBiometrics.isSensorAvailable();
        if (available && local_password !== undefined && touch == true) {
            setSupportScan(true);
        } else {
            setSupportScan(false);
        }
    };
    useEffect(() => {
        // onSupportScan();
        onFingerScan()
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={style.blue} />
            {isLocal && (
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // 0 bulsa parol garakmidi dagani
                            storage.set('isMust', '0');
                            navigation.reset({
                                routes: [{ name: 'BottomTabNavigator' }],
                                index: 0,
                            });
                        }}
                        activeOpacity={0.8}
                        style={styles.notSetPasswordButton}>
                        <MainText color={colors.white} size={fontSize[12]}>
                            {t('762')}
                        </MainText>
                        <ArrowRight width={12} height={12} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <SetCode width={normalize(200)} height={normalize(200)} />
            </View>
            <View style={{ flex: 1 }}>
                {isLocal ? (
                    <View style={styles.setCodeTextContainer}>
                        <MainText color={colors.white} size={fontSize[14]} ft={font.bold}>
                            {t('765')}
                        </MainText>
                    </View>
                ) : (
                    <View style={styles.setCodeTextContainer}>
                        <MainText color={colors.white} size={fontSize[14]} ft={font.bold}>
                            PIN-kodni kiriting
                        </MainText>
                    </View>
                )}
                <View style={styles.codeContainer}>
                    <View style={styles.fourItem}>
                        {Array.from({ length: 4 }, (_v, i) => {
                            return (
                                <View
                                    key={i}
                                    style={[
                                        styles.codeItem,
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        {
                                            backgroundColor:
                                                i < password.length ? style.blue : '#EEEEEE',
                                        },
                                    ]}
                                />
                            );
                        })}
                    </View>
                    <View style={{ flex: 1, width: 300, alignSelf: 'center', }}>
                        <View style={styles.codeNumberContainer}>
                            {
                                Array.from({ length: 12 }, (_v, i) => {
                                    if (i === 9) {
                                        return (
                                            <View key={i} style={[styles.codeNumberContainer]}>
                                                {supportScan ? (
                                                    <Pressable
                                                        android_ripple={{
                                                            color: style.blue,
                                                            radius: 50,
                                                            borderless: true,
                                                        }}
                                                        onPress={() => {
                                                            onFingerScan();
                                                        }}
                                                        style={styles.codeButton}>
                                                        <Image
                                                            source={require('../../images/auth/fingerprint.png')}
                                                            style={{ width: 30, height: 30 }}
                                                            resizeMode="cover"
                                                        />
                                                    </Pressable>
                                                ) : (
                                                    <View
                                                        style={[styles.codeButton, { backgroundColor: '#fff' }]}
                                                    />
                                                )}
                                            </View>
                                        );
                                    }
                                    else {
                                        if (i === 10) {
                                            return (
                                                <View key={i} style={styles.codeNumberContainer}>
                                                    <Pressable
                                                        onPress={() => {
                                                            onSetCode(0);
                                                        }}
                                                        android_ripple={{
                                                            color: style.blue,
                                                            radius: 50,
                                                            borderless: true,
                                                        }}
                                                        style={styles.codeButton}>
                                                        <MainText
                                                            // ft={font.bold}
                                                            color={colors.black}
                                                            size={fontSize[21]}>
                                                            0
                                                        </MainText>
                                                    </Pressable>
                                                </View>
                                            );
                                        }
                                        if (i === 11) {
                                            return (
                                                <View key={i} style={styles.codeNumberContainer}>
                                                    <Pressable
                                                        onPress={() => {
                                                            onBackSpace();
                                                        }}
                                                        android_ripple={{
                                                            color: style.blue,
                                                            radius: 50,
                                                            borderless: true,
                                                        }}
                                                        style={styles.codeButton}>
                                                        <ArrowLeft
                                                            width={12}
                                                            height={12}
                                                            color={style.blue}
                                                        />
                                                    </Pressable>
                                                </View>
                                            );
                                        }
                                        return (
                                            <View key={i} style={styles.codeNumberContainer}>
                                                <Pressable
                                                    onPress={() => {
                                                        onSetCode(i + 1);
                                                    }}
                                                    android_ripple={{
                                                        color: style.blue,
                                                        radius: 50,
                                                        borderless: true,
                                                    }}
                                                    style={styles.codeButton}>
                                                    <MainText
                                                        // ft={font.bold}
                                                        color={colors.black}
                                                        size={fontSize[21]}>
                                                        {i + 1}
                                                    </MainText>
                                                </Pressable>
                                            </View>
                                        );
                                    }
                                })}
                        </View>
                    </View>
                </View>
            </View>
            <Toast config={toastConfig} />
        </SafeAreaView>
    );
};

export default SetLocalPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: style.blue,
    },
    codeNumberContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeButton: {
        width: style.codeButtonSize,
        height: style.codeButtonSize,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        margin: 15,
    },
    fourItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },
    codeItem: {
        width: 15,
        height: 15,
        backgroundColor: style.blue,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    codeContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    setCodeTextContainer: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    textCode: {
        fontSize: style.fontSize.m,
        fontFamily: style.fontFamilyMedium,
        color: style.textColor,
    },
    notSetPasswordButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
    },
    text: {
        fontSize: style.fontSize.xx,
        color: '#fff',
        fontFamily: style.fontFamilyBold,
    },
    notSetText: {
        color: '#fff',
        fontSize: style.fontSize.small,
        fontFamily: style.fontFamilyMedium,
    },
});
