import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    width: 20,
  },
})

const BaseIcon = ({ containerStyle, icon }) => (
  <View style={[styles.container, containerStyle]}>
    <Icon
      size={20}
      color="white"
      type="material"
      name="notifications"
      {...icon}
    />
  </View>
)

BaseIcon.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  icon: PropTypes.object,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

BaseIcon.defaultProps = {
  containerStyle: {},
  icon: {},
  iconStyle: {},
}

export default BaseIcon
