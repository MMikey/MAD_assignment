import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

import { mainStyles } from '../../styles/mainStyles'

class TitleScreen extends Component {
    static navigationOptions = {
      header: null
    }

    render () {
      return (
        <View style={mainStyles.container}>
          <Text style={mainStyles.titleText}> Welcome to SpaceBook</Text>
          <Button style={mainStyles.buttonLink} title='My Profile' onPress={() => this.props.navigation.navigate('Profile')} />
        </View>
      )
    }
}

export default TitleScreen
