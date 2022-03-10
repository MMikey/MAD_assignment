import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from './../../styles/stylesheet_main';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }
    
    render() {
        return(
            <View styles='styles.container'>
                <Text>Home Screen</Text>

                
            </View>
        );
    }
}

export default ProfileScreen;