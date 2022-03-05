import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SayHello extends Component {
  render(){
    return (
      <View>
        <Text>Hello {this.props.name} </Text>
      </View>
    )
  };
}

class HelloWorldApp extends Component {
  render(){ 
    let name = 'Mikey'

    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <SayHello name="Mike"/>
        </View>
      )
    };
}


export default HelloWorldApp;