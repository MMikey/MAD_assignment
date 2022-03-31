import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddFriend from '../shared/addFriend'

import { mainStyles } from '../../styles/mainStyles'
import { profileStyles } from '../../styles/profileStyles'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      userID: 0,
      profileListData: [],
      friendsData: []
    }
  }

  // called immediately after page is loaded.
  componentDidMount() {
    // when page comes into focus, check user is still logged in
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })

    this.getProfileData()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  getProfileData = async () => {
    // Get session token from< asyncstorage - similar how you get session values in php
    const value = await AsyncStorage.getItem('@session_token')

    // Check where a parameter has been passed indicated you're viewing a different profile
    let tempID = await AsyncStorage.getItem('@session_id')
    if (this.props.route.params) {
      tempID = this.props.route.params.param_id
    }

    const id = tempID
    this.setState({ userID: id })

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
          this.props.navigation.navigate('Settings', { screen: 'Login' })
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

  getFriends = async () => {
    const value = await AsyncStorage.getItem('@session_token')

    return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userID + '/friends', {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 403) {
          throw new Error('Add as friend to view mutuals!')
        } else {
          throw new Error('Oops! Something went wrong')
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          friendsData: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token')
    if (value == null) {
      this.props.navigation.navigate('Settings', { screen: 'Login' })
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      )
    } else {
      return (
        <View style={mainStyles.container}>
          <View style={profileStyles.profileDetailsContainer}>
            <Text style={profileStyles.profileName}>{this.state.profileListData.first_name} {this.state.profileListData.last_name}</Text>
          </View>
          <AddFriend userID={this.state.userID} navigation={this.props.navigation} />

          <FlatList
            ListEmptyComponent={<Text>EMPTY!</Text>}
            data={this.state.results}
            renderItem={({ item }) => (
              <View>
                <Text>{item.first_name} {item.second_name}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
        </View>
      )
    }
  }
}

export default ProfileScreen
