import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      searchQuery: ''
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })
  }

    checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('@session_token')

      if (value == null) {
        this.props.navigation.navigate('Login')
      }
    }

    search = async () => {
      const token = await AsyncStorage.getItem('@session_token')

      return fetch('http://localhost:3333/api/1.0.0/search?search_in=all&q=' + this.state.searchQuery, {
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 401) {
            this.props.navigation.navigate('Login')
          } else {
            throw 'Oops! Something went wrong'
          }
        })
        .then((responseJson) => {
          this.setState({
            a
          })
        })
    }

    render () {
      return (
        <View>
          <TextInput
            placeholder='SearchBar'
            onChangeText={(searchQuery) => this.setState({ searchQuery })}
            on
            value={this.state.searchQuery}
          />
          <Button
            title='Search'
            onPress={() => this.search()}
          />
        </View>
      )
    }
}

export default SearchBar
