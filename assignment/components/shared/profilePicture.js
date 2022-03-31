import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { profileStyle, profileStyles } from '../../styles/profileStyles'
class ProfilePicture extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photo: null,
      isLoading: true,
      userID: 0
    }
  }

    getProfileImage = async () => {
      const value = await AsyncStorage.getItem('@session_token')

      // Check where a parameter has been passed indicated you're viewing a different profile
      const id = this.state.userID

      window.fetch('http://localhost:3333/api/1.0.0/user/' + id + '/photo', {
        method: 'GET',
        headers: {
          'X-Authorization': value
        }
      })
        .then((response) => {
          return response.blob()
        })
        .then((responseBlob) => {
          const data = URL.createObjectURL(responseBlob)
          this.setState({
            photo: data,
            isLoading: false
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    componentDidMount () {
      this.setState({ userID: this.props.userID })
      this.getProfileImage()
    }

    render () {
      if (!this.state.isLoading) {
        return (
          <View>
            <Image
              source={{
                uri: this.state.photo
              }}
              style={profileStyles.profilePicture}
            />
          </View>
        )
      } else {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        )
      }
    }
}

export default ProfilePicture
