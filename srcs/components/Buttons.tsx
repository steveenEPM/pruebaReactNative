import { FC, ReactNode } from "react"
import { TouchableOpacity, Text } from "react-native"

export const Buttons: FC<{ onPress: () => void, children: ReactNode, styleComp?: any, styleText?: any }> = ({ onPress, children, styleComp, styleText }) => (
    <TouchableOpacity onPress={onPress}
        style={[{
            paddingHorizontal: 30, paddingVertical: 15, alignItems: "center",
            borderRadius: 30, alignSelf: "center", backgroundColor: "#FF8893",
            marginTop: 12
        }, styleComp]}>
        <Text style={[{ fontFamily: familyFont, fontWeight: "bold", color: "white" }, styleText]}>
            {children}
        </Text>
    </TouchableOpacity>
)


import { familyFont, colorText } from "../styles/styles"