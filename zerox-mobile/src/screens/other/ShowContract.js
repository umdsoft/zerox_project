import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { BackGroundIcon } from '../../helper/homeIcon';
import { style } from '../../theme/style';

import { useNavigation, useRoute } from '@react-navigation/native';
import ShareIcon from '../../images/home/share.svg';
import DownloadIcon from '../../images/home/download.svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ToastConfig';
import Pdf from 'react-native-pdf';
import DownloadModal from '../home/modal/DownloadModal';
import Share from 'react-native-share';
import OtherHeader from '../components/OtherHeader';
import RNFS from 'react-native-fs';
import MainText from '../components/MainText';
import { fontSize } from '../../theme/font';
import { colors } from '../../theme/colors';
import { t } from 'i18next';
import { storage } from '../../store/api/token/getToken';

export default function ShowContract() {
    return (
        <View>
            <Text>ShowContract</Text>
        </View>
    )
}