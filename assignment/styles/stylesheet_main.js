import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    heading: {
        flex:1,
        color:'blue',
    },

});

const formStyles = StyleSheet.create({
    formItem: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    
    formLabel: {
        alignItems: 'center',
        alignContent: 'space-between'
    },

    formInput: {
        alignItems: 'center',
        alignContent: 'space-between'
    }
})
export {styles, formStyles};