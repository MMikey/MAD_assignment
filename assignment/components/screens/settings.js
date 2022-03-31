import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { mainStyles } from '../../styles/mainStyles'

class SettingsScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={mainStyles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('UploadProfilePicture')}
        >
          <Text>Upload Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Requests')}
        >
          <Text>View Requests</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SettingsScreen
