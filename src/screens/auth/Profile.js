import React from 'react'
import { StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image} from 'react-native'

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { icons,COLORS, SIZES, FONTS } from '../../constants'

export default class Profile extends React.Component { 

  constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation,
			userEmail: 'playerlfa22@gmail.com',
			userName: 'Carlos'
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
      <Text style={{ ...FONTS.h3 }}>Perfil</Text>

      <View
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 55,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.black
                        }}
                    >
                        <Image
                            source={icons.user}
                            style={{
                                width: 100,
                                height: 100,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    
          </View>
          
   
          <Text style={{ ...FONTS.h4 }}>  {this.state.userEmail}</Text>
          <Text style={{ ...FONTS.h4 }}>  {this.state.userName}</Text>
          
          
<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
<View style={{flex: 1}}>
<View style={{ alignItems: 'center' }}>
  <TouchableOpacity
        style={{
            width: SIZES.width * 0.45,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => {navigation.replace('EditProfile')}}
    >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Editar</Text>
    </TouchableOpacity>
</View>
<View style={{ padding: 20}}>
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => {navigation.replace('EditProfile')}}
    ><Text style={{ color: COLORS.white, ...FONTS.h2 }}>Negocio</Text>
    </TouchableOpacity>
</View>
<View style={{ padding: 20}}>
    <TouchableOpacity
        style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => { navigation.replace('EditProfile') }} 
        ><Text style={{ color: COLORS.white, ...FONTS.h2 }}>Ramas</Text>
    </TouchableOpacity>
</View>
  
</View>
  
  <View style={{flex: 1, height: 20, alignItems: 'center'}}>
  <TouchableOpacity
        style={{
            width: SIZES.width * 0.45,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            elevation: 5,
        }}
        onPress={() => { AsyncStorage.setItem('isAuth', JSON.stringify(false))
         AsyncStorage.setItem('token', '')
        AsyncStorage.setItem('id', JSON.stringify(0))
        navigation.replace('Login')}}>
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Salir</Text>
    </TouchableOpacity>
    </View>
    
    

 



   
    
  
</View>



</View>
  )
}
}


