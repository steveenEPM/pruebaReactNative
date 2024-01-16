import { StatusBar, SafeAreaView, Image, StyleSheet } from "react-native";
import { FC, ReactNode } from "react";


type Props = {
    children: ReactNode
    loading: boolean
    style?: any
}

export default function ScreenView({ children, loading, style }: Props) {

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
                <Image source={require('../../assets/animation.gif')} style={{
                    width:90,height:90
                }}/>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={[styles.container,style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "3%",
        paddingVertical: "4%",
        backgroundColor: "white"
    }
})

