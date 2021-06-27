import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity} from 'react-native'

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { COLORS, SIZES, FONTS } from '../constants'

export default class Home extends React.Component { 

  constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation,
			userEmail: null
		}
  }
  
  componentDidMount() {
		this._focusListener = this.props.navigation.addListener('focus', () => {
			this.getData();
		});
  }

  componentWillUnmount() {
		this._focusListener();
  }
  
  async getData () {
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ userEmail: value }));

  }
  
  render() {

  const { navigation } = this.state;

  return (
    <View
    style={{
        padding: SIZES.padding * 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    }}
>
      <Text>Home</Text>
      <Text>{this.state.userEmail}</Text>
    
   
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.8,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => {
          
                  AsyncStorage.setItem('isAuth', 'false')
                  navigation.replace('Login')
            
        }
        }
    >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Salir</Text>
    </TouchableOpacity>
</View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
