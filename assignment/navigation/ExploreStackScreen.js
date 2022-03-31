import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SearchScreen from '../components/screens/search'
import ProfileScreen from '../components/screens/profile'

const ExploreStack = createNativeStackNavigator()

class ExploreStackScreen extends Component {
  render () {
    return (
      <ExploreStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <ExploreStack.Screen name='Search' component={SearchScreen} />
        <ExploreStack.Screen name='Profile' component={ProfileScreen} />
      </ExploreStack.Navigator>
    )
  }
}

export default ExploreStackScreen
