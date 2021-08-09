import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {material} from 'react-native-typography';
import { icons,COLORS, SIZES, FONTS } from '../../../../constants';

export const Details = ({suma, ingreso, gasto}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Text style={suma > 0 ? Styles.paragraph2 : Styles.paragraph1}>
          {'$ '+
           suma+' CUP'
          }
        </Text>
        

      </View>
      <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center',justifyContent: 'space-between' }}>
      <TouchableOpacity style={Styles.itemContainer}
  >
     <Text style={Styles.paragraph3}>{'$ '+ingreso}</Text>
                </TouchableOpacity>

      <TouchableOpacity style={Styles.itemContainer}
  >
     <Text style={Styles.paragraph4}>{'$ '+gasto}</Text>
                </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  itemContainer: {
    width: 150,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding,
    marginLeft:  SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    elevation: 0
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'gray',
  },
  paragraph: {...material.display1, color: 'gray'},
  paragraph1: {...material.display1, color: 'red'},
  paragraph2: {...material.display1, color: 'green'},
  paragraph3: {...material.headline, color: 'green'},
  paragraph4: {...material.headline, color: 'red'},
});
