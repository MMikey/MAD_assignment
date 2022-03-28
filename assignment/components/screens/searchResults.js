import React, { Component } from 'react'
import { FlatList, View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

class SearchResults extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      searchQuery: '',
      results: []
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
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
          results: responseJson
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

        <FlatList
          data={this.state.results}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}
              >
                <Text>{item.user_givenname} {item.user_familyname}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </View>
    )
  }
}

export default SearchResults
