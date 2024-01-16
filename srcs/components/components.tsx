import { View, Text, TouchableOpacity } from "react-native";
import { interfaceAllBooks } from "../interface/interface";
import { FC } from "react";


export const Items: FC<{ element: interfaceAllBooks }> = ({ element }) => {

    let { libro, descripcion, autor } = element.data

    return (
        <View style={{
            paddingTop: "5%",
            paddingBottom: "3%",
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,.4)"
        }}>
            <Text style={{ color: colorText, fontFamily: familyFont, fontWeight: "300", fontSize: 10 }}>
                De: {autor}
            </Text>
            <Text style={{ fontFamily: familyFont, color: colorText, fontSize: 16, fontWeight: "800" }}>
                {libro}
            </Text>
            <Text style={{ fontFamily: familyFont, color: colorText, fontSize: 14, fontWeight: "500" }}>
                {descripcion}
            </Text>
        </View>

    )
}


export const Etiqueta: FC<{ title: string, content: string }> = ({ title, content }) => ( 
    <View style={{ gap: 3,alignItems:"center",justifyContent:"center" }}>
        <Text style={{
            fontSize: 12, fontWeight: "300", color: colorText, fontFamily: familyFont,textTransform:"capitalize"
        }}>
            {title}
        </Text>
        <Text style={{
            fontFamily:familyFont,color:colorText,fontWeight:"bold",fontSize:14
        }}>
            {content}
        </Text>
    </View>
)

import { colorText, familyFont } from "../styles/styles";
