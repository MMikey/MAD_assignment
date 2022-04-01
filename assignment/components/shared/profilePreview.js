import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { mainStyles } from '../../styles/mainStyles'
import ProfilePicture from './profilePicture'

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
        <ProfilePicture userID={this.props.profileData.user_id} navigation={this.props.navigation.navigate} />
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
