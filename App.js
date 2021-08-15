import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

const { PEXELS_API_KEY } = process.env

export default function App() {

   const [data, setData] = useState(null)

   let openShareDialog = async () => {
      if(!(await Sharing.isAvailableAsync())) {
         alert('¡La funcionalidad de compartir no está disponible en tu equipo!')
         return
      }
      await Sharing.shareAsync(data)
   }

   let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if(permissionResult === false) {
         alert('Permission to access camera is required')
         return
      }
      const pickerResult = await ImagePicker.launchImageLibraryAsync()
      setData(pickerResult.uri)
   }

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Presione para elegir</Text>
			<StatusBar style="auto" />
         <TouchableOpacity
            onPress={() => openImagePickerAsync()}
         >
            <Image style={styles.image} source={{ uri: data }}/>
         </TouchableOpacity>
         <TouchableOpacity 
            style={styles.button}
            onPress={() => openShareDialog()}
         >
            <Text style={styles.buttonText}>Compartir</Text>
         </TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 30,
	},
   image: {
      width: 220, height: 220, borderRadius: 10
   },
   button: {
      backgroundColor: 'darkred',
      padding: 10,
      marginTop: 5,
   },
   buttonText: {
      color: '#fff',
      fontSize: 18,
   }
})
