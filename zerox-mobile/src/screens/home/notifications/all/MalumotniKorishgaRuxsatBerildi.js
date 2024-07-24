import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';

import { style } from '../../../../theme/style';
import { settingDate } from '../../../../helper';

import TextBold from '../../../components/TextBold';
import axios from 'axios';
import { URL } from '../../../constants';
import { storage } from '../../../../store/api/token/getToken';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../../../components/ToastConfig';
import { useDispatch, useSelector } from 'react-redux';
import { filter_notification, setNotification } from '../../../../store/reducers/HomeReducer';
import socketService from '../../../../helper/socketService';
import { t } from 'i18next';



const MalumotniKorishgaRuxsatBerildi = ({ item, navigation, okay }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.HomeReducer);

    const SeeNotification = async () => {
        const data = await axios.get(URL + `/user/candidate/${item.duid}`, {
            headers: { Authorization: `Bearer ${storage.getString('token')}` },
        });
        const datas = data.data.data;
        navigation.navigate('UserInformationOfDebt', { user: datas, type: user.data.type });
        RemoveNotification()
    };

    const RemoveNotification = async () => { okay(item.id) }


    console.log("MalumotniKorishgaRuxsatBerildi", { item, navigation, okay })

    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
                <View>
                    <TextBold>
                        Ma’lumotlarni ko‘rishga ruxsat berilganligi to‘g‘risida
                    </TextBold>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.notification}>
                        <TextBold>{item.dtypes === 2 ? item.debitor_name : null}{item.dtypes === 1 ? item.dcompany : null}</TextBold> qarz ma’lumotlarini ko‘rishga ruxsat berdi.
                    </Text>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.notificationTitle}>
                            <Text>{settingDate(item?.created)} </Text>
                        </Text>
                        <Text style={styles.notificationTitle}>
                            {' '}
                            {item.time?.slice(0, 5)}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <TouchableOpacity onPress={SeeNotification} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#4e91d2', marginRight: 10, }]}>
                            <Text style={[styles.notification, { color: '#fff', fontSize: style.fontSize.xx - 2 },]}>{t('828')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={RemoveNotification} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#4e91d2' }]}>
                            <Text style={[styles.notification, { color: '#fff', fontSize: style.fontSize.xx - 2 },]}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};

export default memo(MalumotniKorishgaRuxsatBerildi);

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
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notification: {
        fontSize: style.fontSize.xx - 2,
        fontFamily: style.fontFamilyMedium,
        color: style.textColor,
    },
    notificationTitle: {
        fontSize: style.fontSize.xx - 2,
        fontFamily: style.fontFamilyMedium,
        color: style.textColor,
    },
});
