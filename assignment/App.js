import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './components/screens/home'
import AboutScreen from './components/screens/about'
import LoginScreen from './components/screens/login'
import ProfileScreen from './components/screens/profile'
import SignupScreen from './components/screens/signup'
import SearchResults from './components/screens/searchResults'

const Tab = createBottomTabNavigator()

class App extends Component {
  render () {
    return (
      // create navigator for the app
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='About' component={AboutScreen} />
          <Tab.Screen name='Login' component={LoginScreen} />
          <Tab.Screen name='Signup' component={SignupScreen} />
          <Tab.Screen name='Profile' component={ProfileScreen} />
          <Tab.Screen name='Search' component={SearchResults} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
