import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddPost from '../shared/addPost'

import { mainStyles } from '../../styles/mainStyles'
import { formStyles } from '../../styles/formStyles'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            userID: null,
            posts: [],
        }
    }


    // called immediately after page is loaded.
    componentDidMount() {
        // when page comes into focus, check user is still logged in
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn()
        })

        this.setState({ userID: this.props.userID })
        this.getPosts()

    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    likePost = async (post_id) => {
        const value = await AsyncStorage.getItem('@session_token')

        return window.fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userID + '/post/' + post_id + '/like', {
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
                console.log(responseJson)

            })
            .catch((error) => {
                console.log(error)
            })
        }
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
            <ScrollView style={mainStyles.subContainer}>
                <AddPost navigation={this.props.navigation} />
                <Text style={mainStyles.subText}>Posts</Text>

                <FlatList
                    ListEmptyComponent={<Text>EMPTY!</Text>}
                    data={this.state.posts}
                    renderItem={({ item }) => (
                        <View style={mainStyles.listItem}>
                            <Text style={mainStyles.subText}>{item.text}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.post_id.toString()}
                />
                <View style={mainStyles.postMenuContainer}>
                    <TouchableOpacity style={mainStyles.postMenuItems}>
                        <Text style={mainStyles.subText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={mainStyles.postMenuItems}>

                    </TouchableOpacity>
                    <TouchableOpacity style={mainStyles.postMenuItems}>

                    </TouchableOpacity>
                    <TouchableOpacity style={mainStyles.postMenuItems}>

                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}
}

export default Posts
