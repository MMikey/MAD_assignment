import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './../../styles/stylesheet_main'

import Logout from '../shared/logout'

class HomeScreen extends Component {
    static navigationOptions = {
      header: null
    }

    render () {
      return (
        <View styles='styles.container'>
          <Text>Home Screen</Text>

          <Button
            title='About Me'
            onPress={() => this.props.navigation.navigate('About')}
          />

          <Button
            title='Login'
            onPress={() => this.props.navigation.navigate('Login')}
          />

        </View>
      )
    }
}

export default HomeScreen
