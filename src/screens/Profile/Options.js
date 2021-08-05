import React from 'react'
import { SafeAreaView, View,TouchableOpacity } from 'react-native'

import { Nav } from '../../components'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COLORS,
  SIZES,
  FONTS,
  iconData
} from '../../constants'




const currencies = ["CUP", "USD", "EUR"]

const Options = (props) => {
  
  // this.props.route.params.itemId,
  props.navigation.setOptions({
    header: ({navigation}) => (

      <SafeAreaView>
        <Nav title="Settings" navigation={navigation} leftIcon={'money'} />
      </SafeAreaView>
    ),
  })

  return (  
    
    
    <View
    style={{
      flex:1,
      flexDirection: 'row',
      margin:10
    }}
>
  
<TouchableOpacity style={{elevation:8,
  backgroundColor:COLORS.primary,
  width:40,
  height:40,
  margin:SIZES.padding,
  borderRadius:10,
  justifyContent:'center',
  alignItems: 'center'}}>

         <Icon size={30} name='usd'
                                  style={{
                                    margin:8,
                                    color: COLORS.white,
                                  }}/></TouchableOpacity>

    <SelectDropdown
    defaultButtonText='Seleccione una Moneda'
    buttonTextStyle={{...FONTS.body4, color:COLORS.darkgray, }}
    buttonStyle={{ 
      width: SIZES.width * 0.75,
      height: SIZES.width * 0.1,
      borderColor: COLORS.transparent,
      borderWidth: SIZES.input,
      elevation: 5,
      margin: SIZES.padding,
      backgroundColor: COLORS.white}}
    
data={currencies}
onSelect={async (selectedItem, index) =>  {

await AsyncStorage.setItem('currency', selectedItem);
}}
buttonTextAfterSelection={(selectedItem, index) => {
// text represented after item is selected
// if data array is an array of objects then return selectedItem.property to render after item is selected
return selectedItem
}}
rowTextForSelection={(item, index) => {
// text represented for each item in dropdown
// if data array is an array of objects then return item.property to represent item in dropdown
return item
}}
/>
    </View>)
}

export default Options
