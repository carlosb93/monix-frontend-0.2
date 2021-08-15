import React, {useState, useEffect} from 'react';
import {
	ActivityIndicator,
	View,
	StyleSheet,
	Image,
	Text
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FONTS, COLORS } from '../constants'




const SplashScreen = ({ navigation }) => {


	

	//State for ActivityIndicator animation
	const [animating, setAnimating] = useState(true);

	useEffect(() => {

		setTimeout(() => {
			setAnimating(false);
			//Check if user_id is set or not
			//If not then send for Authentication
			//else send to Home Screen
			AsyncStorage.getItem('isAuth', (err, value) => {
				if (err) {
					console.log(err)
				} else {
					JSON.parse(value) // boolean false
				}
			}).then((value) => {
				navigation.replace(
					value === null || value === 'false' ? 'Login' : 'Home'
				)
			});
		}, 1500);
	}, []);

	return (
		<View style={styles.container}>
				<Image
					source={require('../assets/icons/logosinsombra.png')}
					style={{width: '80%', resizeMode: 'contain', margin: 50}}
				/>
				<Text style={{ ...FONTS.h1 }}>Bienvenido a</Text>
                <Text style={{ ...FONTS.h1 }}>MoniX</Text>
				
				<ActivityIndicator
					animating={animating}
					color="#FFFFFF"
					size="large"
					style={styles.activityIndicator}
				/>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	activityIndicator: {
		alignItems: 'center',
		height: 80,
	},
});