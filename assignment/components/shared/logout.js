import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mainStyles } from '../../styles/mainStyles'

class Logout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token')
    if (value !== null) {
      this.setState({ token: value })
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  logoutUser = async () => {
    const token = await AsyncStorage.getItem('@session_token')
    await AsyncStorage.removeItem('@session_token')
    await AsyncStorage.removeItem('@session_id')
    return window.fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'post',
      headers: {
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('Login')
        } else if (response.status === 401) {
          this.props.navigation.navigate('Login')
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <TouchableOpacity
        style={mainStyles.buttonContainer}
        onPress={() => this.logoutUser()}
      >
        <Text style={mainStyles.button}>Logout</Text>
      </TouchableOpacity>
    )
  }
}

export default Logout
