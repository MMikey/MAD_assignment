import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { mainStyles } from '../../styles/mainStyles'

class TitleScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <View style={mainStyles.container}>
        <View style={mainStyles.titleContainer}>
          <Text style={mainStyles.titleText}>Welcome to SpaceBook</Text>
        </View>
        <TouchableOpacity style={mainStyles.buttonContainer}>
          <Text
            style={mainStyles.button}
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            My Profile
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default TitleScreen
