import { useState, useRef, useEffect, forwardRef } from "react";
import { Modal, View, TextInput, Text, StyleSheet } from "react-native";

import { Buttons } from "../components/Buttons";
import { interfaceBooks } from "../interface/interface";

type Props = {
    viseble: boolean
    setVisible: () => void
    books: interfaceBooks,
    onUpdate: (e: interfaceBooks) => void
    title:string
}

type PropsComp = {
    label: string,
    value: string,
    etiq: string
    onChangeText: (target: string, value: string) => void
}

export default function Container({ viseble, setVisible, books, onUpdate,title }: Props) {

    const [state, setState] = useState<interfaceBooks>(books)


    const onChangeText = (target: string, value: string) => {
        setState((e) => {
            return {
                ...e, [target]: value
            }
        })
    }


    return (
        <Modal
            visible={viseble}
            onRequestClose={setVisible}
            animationType="slide"
            transparent={true}

        >
            <View style={stykes.container}>
                <Text style={stykes.h1}>{title}</Text>
                <View style={{
                    gap: 10
                }}>
                    <Component label="titulo" value={state.libro} etiq="libro" onChangeText={onChangeText} />
                    <Component label="descripcion" value={state.descripcion} etiq="descripcion" onChangeText={onChangeText} />
                    <Component label="autor" value={state.autor} etiq="autor" onChangeText={onChangeText} />
                    <Component label="genero" value={state.genero} etiq="genero" onChangeText={onChangeText} />
                    <Component label="año" value={state.año.toString()} etiq="año" onChangeText={onChangeText}  />
                </View>
                <Buttons onPress={() => onUpdate(state)}>
                    Modificar
                </Buttons>
            </View>
        </Modal>
    )
}


const Component = forwardRef<TextInput, PropsComp>((props, ref) => {

    let { label, value, onChangeText, etiq } = props

    return (
        <View style={{ gap: 3 }}>
            <Text style={stykes.label}>{label}</Text>
            <TextInput
                style={stykes.textinput}
                ref={ref}
                onChangeText={(e) => onChangeText(etiq, e)}
                multiline={true}
                value={value}
            />

        </View >
    )
})

import { colorText, familyFont } from "../styles/styles";

const stykes = StyleSheet.create({
    container: {
        top: "30%",
        backgroundColor: "white",
        height: "80%",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingHorizontal: "3%",
        paddingTop: 30,
        elevation: 20,
    },
    h1: {
        fontFamily: familyFont,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    label: {
        fontFamily: familyFont,
        fontSize: 12,
        color: colorText,
        fontWeight: "200",
        textTransform: "capitalize"
    },
    textinput: {
        fontFamily: familyFont,
        fontSize: 14,
        color: colorText,
        fontWeight: "600",
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingHorizontal: 12,
        borderColor: "rgba(0,0,0,.15)"
    }
})