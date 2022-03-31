import { StyleSheet } from 'react-native'
import {COLORS} from './common'

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex:1,
    justifyContent:'center',
    alignContent:'center'
  },

  titleContainer: {
    alignSelf: 'center',
    borderRadius:4,
    padding:15
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    textAlign:'center',
    fontFamily: 'Courier New'
  },

  buttonContainer: {
    minWidth: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    borderRadius:4,
    marginTop:8,
    padding:8,
  },

  button: {
    color: COLORS.secondaryText,
    fontSize: 20
  }
})

export { mainStyles }
