import React from 'react'
import { SafeAreaView, View } from 'react-native'

import { Nav } from '../../components'

const Options = (props) => {
  props.navigation.setOptions({
    header: ({navigation}) => (
      <SafeAreaView>
        <Nav title="Settings" navigation={navigation} leftIcon={'money'} />
      </SafeAreaView>
    ),
  })

  return <View {...props} />
}

export default Options
