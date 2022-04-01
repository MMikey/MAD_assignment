import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from './common'

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignContent: 'center'
  },

  subContainer: {
    textAlign: 'center',
    margin: 5,
    padding: 5,
    width: '60%',
    backgroundColor: COLORS.containerBackground,
    alignSelf:'center',
    borderRadius: 4
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

  subText: {
    color:COLORS.primary,
    fontSize:15
  },

  buttonContainer: {
    minWidth: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    borderRadius: 4,
    margin:5,
    padding: 8
  },

  profilePreview: {
    backgroundColor: COLORS.containerBackground,
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 5,
    borderRadius: 4,
    padding: 8
  },

  profilePreviewText: {
    fontFamily: FONTS.primary
  },

  button: {
    color: COLORS.secondaryText,
    fontSize: 15
  },

  listItem: {
    backgroundColor: COLORS.listItem,
    padding: 5,
    margin: 5,
    minWidth: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 2,
  },
  
  postMenuContainer: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:COLORS.button,
    color:COLORS.secondaryText
  },

  postMenuItems: {
    flex:1,
    padding: 2,
    margin:1,
  }
})

export { mainStyles }
