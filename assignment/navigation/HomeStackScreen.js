import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TitleScreen from '../components/screens/title'
import ProfileScreen from '../components/screens/profile'

const HomeStack = createNativeStackNavigator()

class HomeStackScreen extends Component {
  render () {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <HomeStack.Screen name='Title' component={TitleScreen} />
        <HomeStack.Screen name='Profile' component={ProfileScreen} />
      </HomeStack.Navigator>
    )
  }
}

export default HomeStackScreen
