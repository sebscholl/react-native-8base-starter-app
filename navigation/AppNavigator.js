import { createAppContainer} from 'react-navigation';

// Create navigator stacks
import { appSwitchNavigator } from './NavigatorBase';

// Export the app container
export default createAppContainer(appSwitchNavigator);
