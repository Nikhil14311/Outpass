// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';


const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown:false
        }}
    >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default StackNavigator;