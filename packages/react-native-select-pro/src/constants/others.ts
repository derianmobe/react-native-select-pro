import { Platform, StatusBar } from 'react-native';

export const APPROX_STATUSBAR_HEIGHT: number | undefined =
    Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
