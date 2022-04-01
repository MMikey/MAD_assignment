import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from './common'

const formStyles = StyleSheet.create({
  formItem: {
    backgroundColor: COLORS.containerBackground,
    padding: 5,
    margin: 5,
    textAlign: 'center',
    maxWidth: '50%',
    alignSelf: 'center',
    borderRadius: 4,
  },

  formLabel: {
  },

  formInput: {
    backgroundColor: COLORS.secondaryContainerBackground,
  }
})

export { formStyles }
