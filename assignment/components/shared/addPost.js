import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { mainStyles } from '../../styles/mainStyles'

class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    addPost = async () => {
        const token = await AsyncStorage.getItem('@session_token')
        const id = await AsyncStorage.getItem('@session_id')

        return window.fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(this.state)
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
            .then(async (responseText) => {
                console.log(responseText)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={mainStyles.container}>
                <TextInput
                    placeholder='enter text...'
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableOpacity style={mainStyles.buttonContainer}>
                    <Text
                        style={mainStyles.button}
                        onPress={() => this.addPost()}
                    >Upload Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddPost
