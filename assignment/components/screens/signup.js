import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles, formStyles } from './../../styles/stylesheet_main'

class SignupScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

    signUp = async () => {
      // ADD VALIDATION

      return window.fetch('http://localhost:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 400) {
            throw new Error('User Already Exists...')
          } else {
            throw new Error('Oops! Something went wrong..')
          }
        })
        .then(async (responseJson) => {
          console.log(responseJson)
          await AsyncStorage.setItem('@session_token', responseJson.token)
          this.props.navigation.navigate('Home')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    render () {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}> Login </Text>

          <View style={formStyles.formItem}>
            <Text style={formStyles.formLabel}>First Name</Text>
            <TextInput
              placeholder='enter first name..'
              style={formStyles.formInput}
              onChangeText={(first_name) => this.setState({ first_name })}
              value={this.state.first_name}
            />
          </View>

          <View style={formStyles.formItem}>
            <Text style={formStyles.formLabel}>Last Name</Text>
            <TextInput
              placeholder='enter last name..'
              style={formStyles.formInput}
              onChangeText={(last_name) => this.setState({ last_name })}
              value={this.state.last_name}
            />
          </View>
          <View style={formStyles.formItem}>
            <Text style={formStyles.formLabel}>Email:</Text>
            <TextInput
              placeholder='enter email...'
              style={formStyles.formInput}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={formStyles.formItem}>
            <Text styles={formStyles.formLabel}>Password:</Text>
            <TextInput
              placeholder='enter password...'
              style={formStyles.formInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />
          </View>

          <View style={formStyles.formItem}>
            <Text styles={formStyles.formLabel}>Confirm Password:</Text>
            <TextInput
              placeholder='enter password again...'
              style={formStyles.formInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />
          </View>

          <Button
            title='Sign-Up!'
            onPress={() => this.signUp()}
          />

        </View>
      )
    }
}

export default SignupScreen
