import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../components/screens/login'
import SignupScreen from '../components/screens/signup'

const SettingsStack = createNativeStackNavigator()

class SettingsStackScreen extends Component {
  render () {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name='Login' component={LoginScreen} />
        <SettingsStack.Screen name='Signup' component={SignupScreen} />
      </SettingsStack.Navigator>
    )
  }
}

export default SettingsStackScreen
