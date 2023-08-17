import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY } from '@env'
import carImg from './assets/images/car.png'  




export default function App() {
	const [origin, setOrigin] = useState({
		latitude: 18.736275,
		longitude: -99.261927,
	})
	const [destination, setDestination] = useState({ // alpuyeca - 736275 261927 ºº 758294   361481
		latitude: 18.774521,
		longitude: -99.318820,
	})


	useEffect(() => {
		getLocationPErmission()
	}, [])

	async function getLocationPErmission() {
		let { status } = await Location.requestForegroundPermissionsAsync();

		if(status !== 'granted') {
			alert('Permission denied')
			return
		}

		let location = await Location.getCurrentPositionAsync({})
		const current = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		}
		
		setOrigin(current)
	}


	return (
		<View style={styles.container}>
			<MapView 
				style={styles.map} 
				initialRegion={{
					latitude: origin.latitude,
					longitude: origin.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.04
				}}
			>

				<Marker 
					coordinate={origin}
					draggable={true}
					image={carImg}
					onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate) }
				/>

				<Marker 
					coordinate={destination}
					draggable={true}
					onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate) }
				/>

				<MapViewDirections 
					origin={origin}
					destination={destination}
					apikey={API_KEY}
					strokeColor="cyan"
					strokeWidth={6}
				/>


				<Polyline 
					coordinates={[ origin, destination ]}
					strokeColor="gray"
					strokeWidth={6}
				/>

				
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	}
});
