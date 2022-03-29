import React, { Component } from 'react'
import { View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      <View>
        <Button
          title='Logout'
          onPress={() => this.logoutUser()}
        />
      </View>
    )
  }
}

export default Logout
