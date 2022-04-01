import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddPost from '../shared/addPost'

import { mainStyles } from '../../styles/mainStyles'
import { formStyles } from '../../styles/formStyles'

class Posts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userID: null,
      posts: [],
      error: false,
      errorMsg: ''
    }
  }

  // called immediately after page is loaded.
  componentDidMount () {
    this.setState({ userID: this.props.userID })
    this.getPosts()
  }

    likePost = async (post_id) => {
      const value = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userID + '/post/' + post_id + '/like', {
        method: 'post',
        header: {
          'X-Authorization': value
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 403) {
            throw new Error('Add as friend to view posts!')
          } else {
            throw new Error('Oops! Something went wrong!')
          }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            posts: responseJson
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getPosts = async () => {
      const value = await AsyncStorage.getItem('@session_token')

      return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userID + '/post', {
        headers: {
          'X-Authorization': value
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 403) {
            throw new Error('Add as friend to view posts!')
          } else {
            throw new Error('Oops! Something went wrong!')
          }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            posts: responseJson
          })
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.toString(),
            error: true,
            isLoading: false
          })
        })
    }

    render () {
      if (this.state.isLoading) {
        return (
          <View>
            <Text>Loading..</Text>
          </View>
        )
      } else if (this.state.error) {
        return (
          <View style={mainStyles.subContainer}>
            <Text>{this.state.errorMsg}</Text>
          </View>
        )
      } else {
        return (
          <ScrollView style={mainStyles.subContainer}>
            <AddPost navigation={this.props.navigation} />
            <Text style={mainStyles.subheading}>Posts</Text>

            <FlatList
              ListEmptyComponent={<Text>EMPTY!</Text>}
              data={this.state.posts}
              renderItem={({ item }) => (
                <View style={mainStyles.listItem}>
                  <Text style={mainStyles.subText}>Author: {item.author.first_name} {item.author.last_name} </Text>
                  <Text style={mainStyles.subText}>Post: {item.text}</Text>
                  <Text style={mainStyles.subText}>Likes: {item.numLikes}</Text>
                  <View style={mainStyles.postMenuContainer}>
                    <TouchableOpacity
                      style={mainStyles.postMenuItems}
                      onPress={() => this.likePost(item.post_id)}
                    >
                      <Text style={mainStyles.subText}>Like</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => item.post_id.toString()}
            />

          </ScrollView>
        )
      }
    }
}

export default Posts
