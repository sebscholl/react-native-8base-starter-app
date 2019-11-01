import React from 'react';
import { 
    View,
    Button 
} from 'react-native';

/**
 * Import Session to access authorize method.
 */
import { Session } from '../store';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    Session.authorize()
      .then(credentials => {
        debugger
      })
      .catch(console.error)
  }
  // this.props.navigation.navigate('App');
}
