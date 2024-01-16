import { useState, useMemo, useCallback } from "react";
import { Text, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

import Container from "../container/container";
import ScreenView from "../components/safeView";
import { Items } from "../components/components";
import { Buttons } from "../components/Buttons";
import { ApiBook } from "../api/server";
import { interfaceAllBooks, interfaceBooks } from "../interface/interface";
import { Navigts } from "../interface/navigation";




export default function Homes({ navigation }: Navigts) {

	const [books, setBooks] = useState<interfaceAllBooks[]>([])
	const [load, setLoad] = useState<boolean>(true)
	const [hiden, setHiden] = useState<boolean>(false)
	const [state, setState] = useState<interfaceBooks>({
		libro: "", descripcion: "", año: "", autor: "", genero: ""
	})

	useMemo(async () => {
		navigation.addListener('focus', async () => onElement().finally(() => {
			setLoad(false)
		}))
	}, [])


	const onElement = useCallback(async () => {
		try {

			let process = await ApiBook.allLibros()

			if (typeof process === "object") {
				let { resLibro } = process
				setBooks(resLibro)
			}

		} catch (error) {
			console.log(error);

		}
	}, [])

	const onGo = (id: string) => navigation.navigate('detalles', { id })

	const onSave = async (e: interfaceBooks) => {
		setLoad(true)
		setHiden(false)

		try {
			let process = await ApiBook.nuevoLibro(e)

			onElement().finally(() => {
				setLoad(false)
				setState({
					libro: "", descripcion: "", año: "", autor: "", genero: ""

				})
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ScreenView loading={load} style={styles.container}>
			<View style={{ flex: 1, gap: 12 }}>
				<Text style={styles.h1}>Diseña tu Rincón de Lectura Electrónica</Text>

				<FlatList
					data={books}
					renderItem={({ item, index }) => (
						<TouchableOpacity key={index} onPress={() => onGo(item.id)}>
							<Items element={item} />
						</TouchableOpacity>
					)}
				/>
			</View>
			<Buttons onPress={() => setHiden(true)}>
				Nuevo Libro
			</Buttons>
			<Container viseble={hiden} setVisible={() => setHiden(false)} books={state} onUpdate={onSave} title="Agregar Libro" />

		</ScreenView>
	);
}

import { colorText, familyFont, background } from "../styles/styles";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: "3%",
		paddingTop: "15%",
		paddingBottom: "8%",
		backgroundColor: background
	},
	h1: {
		color: colorText,
		fontSize: 25,
		width: "90%",
		fontWeight: "bold",
		fontFamily: familyFont,
		marginBottom: 12
	}
});
