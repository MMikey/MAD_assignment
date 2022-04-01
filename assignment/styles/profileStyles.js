import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from './common'

const profileStyles = StyleSheet.create({

  profileDetailsContainer: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: COLORS.containerBackground,
  },

  profileName: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontFamily: FONTS.primary
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10
  }
})

export { profileStyles }
