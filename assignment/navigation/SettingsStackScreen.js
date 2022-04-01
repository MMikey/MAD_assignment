import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SettingsScreen from '../components/screens/settings'
import LoginScreen from '../components/screens/login'
import SignupScreen from '../components/screens/signup'
import UploadProfilePicture from '../components/shared/uploadProfilePicture'
import RequestsScreen from '../components/screens/requests'

const SettingsStack = createNativeStackNavigator()

class SettingsStackScreen extends Component {
  render () {
    return (
      <SettingsStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <SettingsStack.Screen name='SettingsMenu' component={SettingsScreen} />
        <SettingsStack.Screen name='Login' component={LoginScreen} />
        <SettingsStack.Screen name='Signup' component={SignupScreen} />
        <SettingsStack.Screen name='UploadProfilePicture' component={UploadProfilePicture} />
        <SettingsStack.Screen name='Requests' component={RequestsScreen} />
      </SettingsStack.Navigator>
    )
  }
}

export default SettingsStackScreen
