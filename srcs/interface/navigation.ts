
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native"

export type ScreensNavig = {
    homes: undefined
    detalles: {
        id: string
    }
    nuevo: undefined
}

export type Navigts = NativeStackScreenProps<ScreensNavig>

export type RouterPropDeta = RouteProp<ScreensNavig, 'detalles'>