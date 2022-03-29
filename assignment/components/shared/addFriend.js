import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AddFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      responseMessage: ''
    }
  }

    addUser = async () => {
      const token = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.props.userID + '/friends', {
        method: 'post',
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 403) {
            throw new Error('User is already added as a friend!')
          } else {
            throw new Error('Oops! Something went wrong.. ')
          }
        })
        .then(async (responseText) => {
          this.state.responseMessage = responseText
          console.log(responseText)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    render () {
      return (
        <View>
          <Button
            title='Add as Friend!'
            onPress={() => this.addUser()}
          />
          <Text>{this.state.responseMessage}</Text>
        </View>
      )
    }
}

export default AddFriend
