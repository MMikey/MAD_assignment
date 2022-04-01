import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Logout from '../shared/logout'

import { mainStyles } from '../../styles/mainStyles'
import { formStyles } from '../../styles/formStyles'

class SettingsScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={mainStyles.container}>
        {this.displayLoginButton}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('UploadProfilePicture')}
          style={formStyles.formItem}
        >
          <Text>Upload Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Requests')}
          style={formStyles.formItem}
        >
          <Text>View Requests</Text>
        </TouchableOpacity>

        <Logout navigation={this.props.navigation} />

      </View>
    )
  }

  displayLoginButton = async () => {
    const value = await AsyncStorage.getItem('@session_token')

    if (value == null) {
      return
    }
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Login')}
        style={formStyles.formItem}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    )
  }
}

export default SettingsScreen
