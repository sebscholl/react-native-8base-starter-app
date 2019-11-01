import { createBrowserApp } from '@react-navigation/web';

// Create navigator stacks
import { appSwitchNavigator } from './NavigatorBase';

appSwitchNavigator.path = '';

// Export the browser app
export default createBrowserApp(appSwitchNavigator, { history: 'hash' });
