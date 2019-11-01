import { AsyncStorage } from 'react-native';

/* Required env variable */
import { RN_APP_AUTH_PROFILE_ID as authProfileId } from 'react-native-dotenv';

/* Required utils */
import graphqlClient from '../utils/api';
import * as gql from '../utils/auth';
import auth from '../utils/auth';


const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('Error getting key from AsyncStorage...', error);
    }
}

export default {
    /* Check if user is authenticated using stored idToken */
    isAuthorized: async () => await getItem('idToken') != undefined,
    /* Return the idToken from AsyncStorage */
    idToken: async () => await getItem('idToken'),
    /* Start the auth flow */
    authorize: async () => await auth.authorize(), 
    /* Handle the authentication */
    handleAuthentication: async (authResult) => {
        /**
         * Check if AuthResult contains idToken, else return false.
         */
        if (authResult.idToken === undefined) return false;
        /**
         * Auth headers for communicating with the 8base API.
         */
        const context = {
          headers: { 
            authorization: `Bearer ${authResult.idToken}` 
          }
        };
        /**
         * Check if user exists in 8base.
         */
        try {
          await graphqlClient.query({
            query: gql.CURRENT_USER_QUERY,
            context
          });
        }
        /**
         * If user doesn't exist, an error will be
         * thrown, which then the new user can be
         * created using the authResult values.
         */
        catch {
          await graphqlClient.mutate({
            mutation: gql.USER_SIGN_UP_MUTATION,
            variables: {
              user: { email: authResult.email },
              authProfileId
            },
            context
          });
        }
        return true;
    }

}