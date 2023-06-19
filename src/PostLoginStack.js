// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import AllRequests from './AllRequests';
import AddRequest from './AddRequest';
import AdminAcceptRequest from './AdminAcceptRequest';


const Stack = createNativeStackNavigator();

function PostLoginStack(props) {
  return (
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="seerequests" component={AllRequests} />
            <Stack.Screen name="addrequests" component={AddRequest} />
            <Stack.Screen name="adminacceptrequest" component={AdminAcceptRequest} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default PostLoginStack;