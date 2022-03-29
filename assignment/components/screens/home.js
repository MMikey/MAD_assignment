import React, { Component } from 'react'
import { Text, View } from 'react-native'

class TitleScreen extends Component {
    static navigationOptions = {
      header: null
    }

    render () {
      return (
        <View styles='styles.container'>
          <Text>Home Screen</Text>

        </View>
      )
    }
}

export default TitleScreen
