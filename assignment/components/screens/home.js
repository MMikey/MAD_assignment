import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from './../../styles/stylesheet_main';

class HomeScreen extends Component {
    render() {
        return(
            <View styles='stylesheet_main.container'>
                <Text>Home Screen</Text>
                <Button
                    title="About Me"
                    onPress={() => this.props.navigation.navigate('About')}
                />
            </View>
        );
    }
}

export default HomeScreen;