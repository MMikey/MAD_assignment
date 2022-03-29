import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStackScreen from './navigation/HomeStackScreen'
import SettingsStackScreen from './navigation/SettingsStackScreen'
import ExploreStackScreen from './navigation/ExploreStackScreen.js'

const Tab = createBottomTabNavigator()

class App extends Component {
  render() {
    return (
      // Tab Navigator points to stack navigator in navigation folder
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen name='Explore' component={ExploreStackScreen} />
          <Tab.Screen name='Settings' component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
