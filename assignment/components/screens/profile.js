import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logout from '../shared/logout'

class ProfileScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      profileListData: []
    }
  }

  // called immediately after page is loaded.
  componentDidMount () {
    // when page comes into focus, check user is still logged in
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })

    this.getProfileData()
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  getProfileData = async () => {
    // Get session token from asyncstorage - similar how you get session values in php
    const value = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@session_id')
    return window.fetch('http://localhost:3333/api/1.0.0/user/' + id, {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          // this is used to navigate back to login
          this.props.navigation.navigate('Login')
        } else {
          throw new Error('Oops! Something went wrong')
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          profileListData: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token')
    if (value == null) {
      this.props.navigation.navigate('Login')
    }
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Loading..</Text>
        </View>
      )
    } else {
      return (
        <View>
          <FlatList
            data={this.state.profileListData}
            renderItem={({ item }) => (
              <View>
                <Text>{item.first_name} {item.last_name}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
          <Logout navigation={this.props.navigation} />
        </View>
      )
    }
  }
}

export default ProfileScreen
