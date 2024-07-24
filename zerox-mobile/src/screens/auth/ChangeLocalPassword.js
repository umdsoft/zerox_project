import { Platform, Pressable, StyleSheet, Text, View, Alert, NativeModules } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { normalize, style } from '../../theme/style';
import SetCode from '../../images/ChangeLocalPassword';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import ArrowLeft from '../../images/ArrowLeft';
import Hand from '../../images/Hand';
import { storage } from '../../store/api/token/getToken';
import OtherHeader from '../components/OtherHeader';
import { t } from 'i18next';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import BiometricModule from '../../../BiometricModule';

const ChangeLocalPassword = () => {
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const navigation = useNavigation();

    const onFingerScan = async () => {
        try {
            const result = await BiometricModule.authenticate()
            Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Muvaffaqiyatli', desc: "Shaxsingiz tasdiqlandi" }, type: 'omad', visibilityTime: 3000, });
            console.log('Success', result);
        } catch (error) {
            console.log('Error', error.message);
            Toast.show({ autoHide: true, position: 'bottom', props: { title: 'Xatolik', desc: 'Shaxsingiz tasdiqlanmadi' }, type: 'error2', visibilityTime: 3000, });
        }
    };
    const onSetCode = (val) => {
        if (password.length <= 3) {
            storage.set('key2', password + val);
            setPassword(password + val);
            const local_password = storage.getString('localpassword');
            if ((password + val).length === 4) {
                if (step === 1) {
                    if (local_password !== password + val) {
                        setPassword('');
                        Toast.show({ type: 'error2', position: 'top', props: { title: 'Xatolik!', desc: "PIN-kod noto’g‘ri kiritilgan" }, visibilityTime: 3000, autoHide: true, topOffset: Platform.OS === 'android' ? 5 : normalize(50), });
                    }
                }
                if (local_password === password + val && step === 1) {
                    setPassword('');
                    setStep(2);
                }

                if (step === 2) {
                    setStep(3);
                    setPassword('');
                    storage.set('key1', password + val);
                }
                if (step === 3) {
                    let a = storage.getString('key1');
                    let b = storage.getString('key2');

                    if (Number(a) === Number(b)) {
                        storage.set('localpassword', password + val);
                        Toast.show({ type: 'omad', position: 'top', props: { title: 'Muvaffaqiyatli', desc: "PIN-kod o‘zgartirildi.", }, visibilityTime: 3000, autoHide: true, topOffset: Platform.OS === 'android' ? 5 : normalize(50), });
                        setTimeout(() => {
                            navigation.navigate("Security")
                        }, 1500)
                    } else {
                        setPassword('');
                        Toast.show({ type: 'error2', position: 'top', props: { title: 'Xatolik!', desc: "Oldingi parolni noto'g'ri kiritdingiz.", }, visibilityTime: 3000, autoHide: true, topOffset: Platform.OS === 'android' ? 5 : normalize(50), });
                    }
                }
            }
        }
    };
    const onBackSpace = () => {
        setPassword(password.slice(0, -1));
    };
    useEffect(() => {
        const local_password = storage.getString('localpassword');
        if (local_password == undefined) setStep(2)
        else setStep(1)
    }, [])

    return (
        <View style={styles.container}>
            <OtherHeader title={t('768')} />
            <View style={{ alignItems: 'center', }}>
                <SetCode width={normalize(160)} height={normalize(160)} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={[styles.setCodeTextContainer, { alignItems: 'center' }]}>
                    {renderText(step)}
                </View>
                <View style={styles.codeContainer}>
                    <View style={styles.fourItem}>
                        {Array.from({ length: 4 }, (_v, i) => { return (<View key={i} style={[styles.codeItem, { backgroundColor: i < password.length ? style.blue : '#EEEEEE', },]} />) })}
                    </View>
                    <View style={{ flex: 1, alignSelf: 'center', }}>
                        <View style={styles.codeNumberContainer}>
                            {
                                Array.from({ length: 12 }, (_v, i) => {
                                    if (i === 10) {
                                        return (
                                            <View key={i} style={styles.codeNumberContainer}>
                                                <Pressable onPress={() => { onSetCode(0); }} android_ripple={{ color: style.blue, radius: 50, borderless: true, }} style={styles.codeButton}>
                                                    <Text style={styles.textCode}>0</Text>
                                                </Pressable>
                                            </View>
                                        );
                                    }
                                    if (i === 11) {
                                        return (
                                            <View key={i} style={styles.codeNumberContainer}>
                                                <Pressable onPress={() => { onBackSpace(); }} android_ripple={{ color: style.blue, radius: 50, borderless: true, }} style={styles.codeButton}>
                                                    <ArrowLeft width={12} height={12} color={style.blue} />
                                                </Pressable>
                                            </View>
                                        );
                                    }
                                    if (i === 9) {
                                        return (
                                            <View key={i} style={styles.codeNumberContainer}>
                                                <Pressable onPress={() => { onFingerScan(); }} android_ripple={{ color: style.blue, radius: 50, borderless: true, }} style={styles.codeButton}>
                                                    <Hand width={30} height={30} color={style.blue} />
                                                </Pressable>
                                            </View>
                                        );
                                    }

                                    return (
                                        <View key={i} style={styles.codeNumberContainer}>
                                            <Pressable onPress={() => { onSetCode(i + 1); }} android_ripple={{ color: style.blue, radius: 50, borderless: true, }} style={styles.codeButton}>
                                                <Text style={styles.textCode}>{i + 1}</Text>
                                            </Pressable>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};

const renderText = step => {
    switch (step) {
        case 1:
            return <Text style={styles.text}>{t('849')}</Text>;
        case 2:
            return <Text style={styles.text}>{t('850')}</Text>;
        case 3:
            return <Text style={styles.text}>{t('851')}</Text>;
    }
};

export default ChangeLocalPassword;

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
        width: style.codeButtonSize + 4,
        height: style.codeButtonSize + 4,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        marginBottom: 20,
        marginRight: 20,
        marginTop: 20,
        marginLeft: 20,
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
