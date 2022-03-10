import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, formStyles } from './../../styles/stylesheet_main';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        }
    }

    signUp = async () => {
        
        //Validation here..
    }

    render() {
        return(
            <View style ={styles.container}>
                <Text style={styles.heading}> Login </Text>

                <View style={formStyles.formItem}>
                    <Text style={formStyles.formLabel}>First Name</Text>
                    <TextInput
                        placeholder="enter first name.."
                        style={formStyles.formInput}
                        onChangeText={(email) => this.setState({first_name})}
                        value={this.state.first_name}
                    />
                </View>

                <View style={formStyles.formItem}>
                    <Text style={formStyles.formLabel}>Last Name</Text>    
                    <TextInput
                        placeholder="enter first name.."
                        style={formStyles.formInput}
                        onChangeText={(email) => this.setState({first_name})}
                        value={this.state.first_name}
                    />
                </View>
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
                    title="Sign-Up!"
                    onPress={() => this.signUp()}
                />

            </View>
        )
    }
}

export default LoginScreen;
