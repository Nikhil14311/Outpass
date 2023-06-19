import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';

const Signup = (props) => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const goToDashboardPage = () => {
    auth()
    .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged in successfully');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
    });
  }
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <TextInput 
        value={email}
        onChangeText={(val)=>setEmail(val)}
        style={{borderColor:'black',borderWidth:1,marginHorizontal:20,borderRadius:5}}
        placeholder='Email'
        placeholderTextColor={'grey'}
      />
      <TextInput 
        value={password}
        onChangeText={(val)=>setPassword(val)}
        style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5}}
        placeholder='Password'
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5,backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} onPress={goToDashboardPage}>
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5,backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} onPress={()=>props.navigation.navigate('login')}>
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signup