import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { mainStyles } from '../../styles/mainStyles'
import { uploadStyles } from '../../styles/uploadStyles'

class UploadProfilePicture extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back
    }
  }

  async componentDidMount () {
    const { status } = await Camera.requestCameraPermissionsAsync()
    this.setState({ hasPermission: status === 'granted' })
  }

  sendToServer = async (data) => {
    const value = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@session_id')

    const res = await window.fetch(data.base64)
    const blob = await res.blob()

    return window.fetch('http://localhost:3333/api/1.0.0/user/' + id + '/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': value
      },
      body: blob
    })
      .then((response) => {
        console.log('Picture added', response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

    takePicture = async () => {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          onPictureSaved: (data) => this.sendToServer(data)
        }
        await this.camera.takePictureAsync(options)
      }
    }

    render () {
      if (this.state.hasPermission) {
        return (
          <View style={mainStyles.container}>
            <Camera
              style={uploadStyles.camera}
              type={this.state.type}
              ref={ref => this.camera = ref}
            >
              <TouchableOpacity
                style={uploadStyles.buttonContainer}
                onPress={() => {
                  this.takePicture()
                }}
              >
                <Text> Take Photo </Text>
              </TouchableOpacity>
            </Camera>
          </View>
        )
      } else {
        return (
          <Text>No access to camera</Text>
        )
      }
    }
}
export default UploadProfilePicture
