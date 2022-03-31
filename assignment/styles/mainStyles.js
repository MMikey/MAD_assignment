import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from './common'

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },

  titleContainer: {
    alignSelf: 'center',
    borderRadius: 4,
    padding: 15
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: FONTS.primary
  },

  buttonContainer: {
    minWidth: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    borderRadius: 4,
    marginTop: 8,
    padding: 8
  },

  profilePreview: {
    backgroundColor: COLORS.containerBackground,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 4,
    padding: 8
  },

  profilePreviewText: {
    fontFamily: FONTS.primary
  },

  button: {
    color: COLORS.secondaryText,
    fontSize: 20
  }
})

export { mainStyles }
