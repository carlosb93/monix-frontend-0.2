import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'

import contactData from './contact.json'

import Profile from './Profile'
import {
  COLORS,
  SIZES,
  FONTS,
  iconData,
  icons
} from '../../constants'

import { Nav } from '../../components'

const ProfileScreen = (props) => {
  props.navigation.setOptions({
    header: ({navigation}) => (
      <SafeAreaView>
       <Nav
          title="Profile"
          navigation={navigation}
          
        />
      </SafeAreaView>
    ),
  })

  return <Profile {...contactData} {...props} />
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
