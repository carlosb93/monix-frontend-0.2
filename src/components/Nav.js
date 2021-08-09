import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'

import { icons,COLORS, SIZES, FONTS } from '../constants'

const styles = StyleSheet.create({
  centerRow: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 25,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: 55,
      },
      android: {
        height: 80,
      },
    }),
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    justifyContent: 'flex-start',
    marginTop: 2.8,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  leftRow: {
    backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logoutText: {
    color: COLORS.transparent,
    fontSize: 18,
    fontWeight: '400',
    
  },
  rightRow: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    ...FONTS.h2
  },
})

const Search = ({ title, navigation, leftIcon }) => (
  <View style={{ backgroundColor: COLORS.primary }}>
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <Icon
          size={34}
          type="ionicon"
          name="ios-arrow-back"
          underlayColor="transparent"
          underlineColorAndroid="transparent"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          color={COLORS.white}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
          onPress={() => navigation.navigate('Home')}
          {...leftIcon}
        />
      </View>
      <View style={styles.centerRow}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.rightRow}>
        <Text style={ styles.logoutText}>Log out</Text>
      </View>
    </View>
  </View>
)

Search.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  leftIcon: PropTypes.object,
}

Search.defaultProps = {
  leftIcon: {},
}

export default Search
