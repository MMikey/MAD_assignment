import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddFriend from '../shared/addFriend'
import ProfilePicture from '../shared/profilePicture'
import AddPost from '../shared/addPost'
import Posts from '../shared/posts'

import { mainStyles } from '../../styles/mainStyles'
import { profileStyles } from '../../styles/profileStyles'
import { formStyles } from '../../styles/formStyles'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      userID: 0,
      profileListData: [],
      posts: [],
      friendsData: []
    }
  }

  // called immediately after page is loaded.
  componentDidMount() {
    // when page comes into focus, check user is still logged in
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })

    this.getUserID()
    this.getProfileData()
    this.getFriends()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  getUserID = async () => {
    // Check where a parameter has been passed indicated you're viewing a different profile
    let tempID = await AsyncStorage.getItem('@session_id')
    if (this.props.route.params) {
      tempID = this.props.route.params.param_id
    }

    const id = tempID
    this.setState({ userID: id })
  }



  getProfileData = async () => {
    // Get session token from< asyncstorage - similar how you get session values in php
    const value = await AsyncStorage.getItem('@session_token')

    return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userID, {
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
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      )
    } else {
      return (
        <ScrollView style={mainStyles.container}>
          <View style={profileStyles.profileDetailsContainer}>
            <ProfilePicture userID={this.state.userID} />
            <Text style={profileStyles.profileName}>{this.state.profileListData.first_name} {this.state.profileListData.last_name}</Text>
            <AddFriend userID={this.state.userID} navigation={this.props.navigation} />
          </View>

          <Posts userID={this.state.userID} navigation={this.props.navigation}></Posts>

          <View style={mainStyles.subContainer}>
            <Text>Friends</Text>
            <FlatList
              ListEmptyComponent={<Text>EMPTY!</Text>}
              data={this.state.results}
              renderItem={({ item }) => (
                <View style={formStyles.formItem}>
                  <Text>{item.first_name} {item.second_name}</Text>
                </View>
              )}
              keyExtractor={(item, index) => item.user_id.toString()}
            />
          </View>
        </ScrollView>
      )
    }
  }
}

export default ProfileScreen
