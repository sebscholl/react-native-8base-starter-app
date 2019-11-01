import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';

// Import Session for checking auth status
import Auth from '../utils/auth';
import { Session } from '../store';
import auth from '../utils/auth';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const authResult = await Auth.getAuthorizedData();
    const isAuthorized = await Session.handleAuthentication(authResult)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(isAuthorized ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
