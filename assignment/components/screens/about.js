import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './../../styles/stylesheet_main'

class AboutScreen extends Component {
    static navigationOptions = {
      header: null
    }

    render () {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>About Screen</Text>

          <Button
            title='Home'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      )
    }
}

export default AboutScreen
