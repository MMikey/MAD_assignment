import { StyleSheet } from 'react-native'
import { COLORS } from './common'

const profileStyles = StyleSheet.create({

  profileDetailsContainer: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: COLORS.containerBackground
  },

  profileName: {
    color: COLORS.primaryText,
    fontSize: 20
  }
})

export { profileStyles }
