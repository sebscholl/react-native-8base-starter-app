import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import screens
import {
  HomeScreen,
  SignInScreen,
  ProfileScreen,
  AuthLoadingScreen
} from '../screens';

// Create navigator stacks
const AppStack = createStackNavigator({ Home: HomeScreen, Profile: ProfileScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// Export the app navigator
export const appSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
