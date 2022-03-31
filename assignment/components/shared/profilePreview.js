import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { mainStyles } from '../../styles/mainStyles'

class ProfilePreview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      profileData: []
    }
  }

  componentDidMount () {
    this.setState({ profileData: this.props.profileData })
  }

  render () {
    return (

      <TouchableOpacity
        style={mainStyles.profilePreview}
        onPress={() => this.props.navigation.navigate('Profile', { param_id: this.state.profileData.user_id })}
      >
        <Text
          style={mainStyles.profilePreviewText}
        >
          {this.state.profileData.user_givenname} {this.state.profileData.user_familyname}
        </Text>
      </TouchableOpacity>

    )
  }
}

export default ProfilePreview
