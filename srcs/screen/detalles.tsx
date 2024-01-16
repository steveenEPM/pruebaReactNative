import { useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import Container from "../container/container";
import ScreenView from "../components/safeView";
import { Etiqueta } from "../components/components";
import { interfaceAllBooks, interfaceBooks } from "../interface/interface";
import { ApiBook } from "../api/server";
import { RouterPropDeta } from "../interface/navigation";
import { Navigts } from "../interface/navigation";


export default function Detalle({ navigation }: Navigts) {

	const [book, setBook] = useState<interfaceAllBooks>()
	const { id } = useRoute<RouterPropDeta>().params
	const [load, setLoad] = useState<boolean>(true)
	const [hiden, setHiden] = useState<boolean>(false)

	useMemo(async () => {
		try {

			const process = await ApiBook.detalleLibro(id)
			if (typeof process === "object") {
				let { resBook } = process
				setBook(resBook)
			}

		} catch (error) {
			console.log(error);
		}
		setLoad(false)
	}, [])

	const onUpdate = async (e: interfaceBooks) => {
		try {
			setLoad(true)
			setHiden(false)
			let process = await ApiBook.modificarLibro(id, e)

			let json: interfaceAllBooks = {
				id,
				data: e
			}

			setBook(json)

		} catch (error) {
			console.log(error)
		}

		setLoad(false)
	}

	const onDelete = async () => {
		try {
			const process = await ApiBook.eliminarLibro(id)
			navigation.goBack()
		} catch (error) {

		}
	}

	return (
		<ScreenView loading={load}>
			{
				book &&
				<>
					<View style={{ flex: 1, gap: 18 }}>
						<View style={{ gap: 3 }}>
							<Text style={styles.libro}>{book.data.libro}</Text>
							<Text style={styles.autor}>{book.data.autor}</Text>
						</View>

						<View style={{ gap: 3 }}>
							<Text style={styles.h2}>Descripción</Text>
							<Text style={styles.descripcion}>{book.data.descripcion}</Text>
						</View>

						<View style={{ flexDirection: "row", justifyContent: "center", gap: 50 }}>
							<Etiqueta title="genero" content={book.data.genero} />
							<Etiqueta title="año" content={book.data.año} />
						</View>
					</View>

					<View style={{ flexDirection: "row-reverse", gap: 12, justifyContent: "center", alignItems: "center" }}>
						<TouchableOpacity style={styles.delete} onPress={onDelete}>
							<Image source={require('../../assets/basura.png')} style={{
								width: 30, height: 30
							}} />
						</TouchableOpacity>
						<Buttons onPress={() => setHiden(true)} styleComp={styles.buttons}>
							Modificar libro
						</Buttons>
					</View>

					<Container viseble={hiden} setVisible={() => setHiden(false)} books={book.data} onUpdate={onUpdate} title="Modificar Libro"/>
				</>
			}
		</ScreenView>
	)
}




import { background, colorText, familyFont } from "../styles/styles";
import { Buttons } from "../components/Buttons";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: "3%",
		paddingTop: "20%",
		paddingBottom: "8%",
		backgroundColor: background
	},
	libro: {
		fontFamily: familyFont,
		fontStyle: "italic",
		fontWeight: "bold",
		fontSize: 25,
		width: "70%"
	},
	autor: {
		fontFamily: familyFont,
		fontSize: 12,
		color: colorText,
		fontWeight: "300",
		fontStyle: "italic"
	},
	h2: {
		fontFamily: familyFont,
		color: colorText,
		fontWeight: "300",
		fontSize: 12
	},
	descripcion: {
		fontFamily: familyFont,
		fontSize: 16,
		fontWeight: "600"
	},
	buttons: {
		marginTop: 0,
		width: "80%"
	},
	delete: {
		borderWidth: 2.7,
		backgroundColor: "white",
		elevation: 3,
		borderColor: "#FF8893",
		borderRadius: 120,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		width: 50
	}
});
