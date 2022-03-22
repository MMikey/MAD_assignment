import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/screens/home';
import AboutScreen from './components/screens/about';
import LoginScreen from './components/screens/login';
import ProfileScreen from './components/screens/profile';
import SignupScreen from './components/screens/signup';

const Drawer = createDrawerNavigator();

class App extends Component {
  render(){
    return (
      // create navigator for the app
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Signup" component={SignupScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;