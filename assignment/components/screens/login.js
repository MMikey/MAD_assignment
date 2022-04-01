import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { mainStyles } from '../../styles/mainStyles'
import { formStyles } from '../../styles/formStyles'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token')
    if (value != null) {Signup
      this.props.navigation.navigate('SettingsMenu')
    }
  }

  login = async () => {
    // ADD VALIDATION

    return window.fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw new Error('Invalid email or password..')
        } else {
          throw new Error('Oops! Something went wrong...')
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson)
        await AsyncStorage.setItem('@session_token', responseJson.token)
        await AsyncStorage.setItem('@session_id', responseJson.id)
        this.props.navigation.navigate('Profile')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={mainStyles.container}>

        <View style={formStyles.formItem}>
          <Text style={formStyles.formLabel}>Email:</Text>
          <TextInput
            placeholder='enter email...'
            style={formStyles.formInput}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>

        <View style={formStyles.formItem}>
          <Text styles={formStyles.formLabel}>Password:</Text>
          <TextInput
            placeholder='enter password...'
            style={formStyles.formInput}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
        style={mainStyles.buttonContainer}
          onPress={() => this.login()}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={mainStyles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Signup')}
        ><Text>Signup</Text></TouchableOpacity>
      </View>
      
    )
  }
}

export default LoginScreen
