import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { mainStyles } from '../../styles/mainStyles'

class RequestsScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      friendRequestData: []
    }
  }

  componentDidMount () {
    this.getRequests()
  }

    getRequests = async () => {
      const token = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/friendrequests', {
        method: 'get',
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 401) {
            this.props.navigation.navigate('Settings', { screen: 'Login' })
          } else {
            throw new Error('Oops! Something went wrong.. ')
          }
        })
        .then(async (responseJson) => {
          console.log(responseJson)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    acceptRequest = async (user_id) => {
      const token = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/friendrequests/' + user_id, {
        method: 'post',
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 401) {
            this.props.navigation.navigate('Settings', { screen: 'Login' })
          } else {
            throw new Error('Oops! Something went wrong.. ')
          }
        })
        .then(async (responseJson) => {
          console.log(responseJson)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    rejectRequest = async (user_id) => {
      const token = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/friendrequests/' + user_id, {
        method: 'delete',
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 401) {
            this.props.navigation.navigate('Settings', { screen: 'Login' })
          } else {
            throw new Error('Oops! Something went wrong.. ')
          }
        })
        .then(async (responseJson) => {
          console.log(responseJson)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    render () {
      return (
        <View style={mainStyles.container}>
          <FlatList
            ListEmptyComponent={<Text>EMPTY!</Text>}
            data={this.state.friendRequestData}
            renderItem={({ item }) => (
              <View>
                <Text>{item.first_name} {item.second_name}</Text>
                <TouchableOpacity
                  onPress={(item) => this.acceptRequest(item.user_id)}
                >
                  <Text>accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={(item) => this.rejectRequest(item.user_id)}
                >
                  <Text>reject</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.user_id.toString()}
          />
        </View>
      )
    }
}

export default RequestsScreen
