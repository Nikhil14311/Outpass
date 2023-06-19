import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import LoginRoute from './src/LoginRoute';
import firestore from '@react-native-firebase/firestore';
import PostLoginStack from './src/PostLoginStack';
import AddRequest from './src/AddRequest';
import AllRequests from './src/AllRequests';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    try {
      AsyncStorage.setItem('UID',user.uid);
      console.log("useruid in app>>>>>>>>",user.uid)
    } catch (error) {
      // Error saving data
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log("subscriber",subscriber )
    // const usersCollection = firestore().collection('Users').doc();
    // console.log("usercollections",usersCollection)
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <LoginRoute />
    );
  }

  return (
    <View style={{flex:1}}>
      <PostLoginStack />
      {/* <AllRequests /> */}
    </View>
  );
}