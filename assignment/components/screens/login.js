import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, formStyles } from './../../styles/stylesheet_main';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    login = async () => {
        
        //ADD VALIDATION

        return fetch('http://localhost:3333/api/1.0.0/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }else if(response.status === 400){
                throw 'Invalid email or password..';
            }else{
                throw 'Oops! Something went wrong...';
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token)
            this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <View style ={styles.container}>
                <Text style={styles.heading}> Login </Text>

                <View style={formStyles.formItem}>
                    <Text style={formStyles.formLabel}>Email:</Text>
                    <TextInput
                    placeholder="enter email..."
                        style={formStyles.formInput}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                </View>

                <View style={formStyles.formItem}>
                    <Text styles={formStyles.formLabel}>Password:</Text>
                    <TextInput
                        placeholder="enter password..."
                        style={formStyles.formInput}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry/>
                </View>

                <Button
                    title="Login"
                    onPress={() => this.login()}
                />

            </View>
        )
    }
}

export default LoginScreen;
