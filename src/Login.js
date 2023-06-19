import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import LoadingPage from './LoadingPage';

const Login = (props) => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[visible, setVisible] = useState(false)
  const goToDashboardPage = () => {
    setVisible(true)
    auth()
    .signInWithEmailAndPassword(email, password)
      .then(() => {
        setVisible(false)
        console.log('User account created & Logged in Successfully');
      })
      .catch(error => {
        setVisible(false)
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
      <LoadingPage visible={visible} />
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
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5,backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} onPress={()=>props.navigation.navigate('signup')}>
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login