import { View, Text, TextInput, Touchable, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const AddRequest = (props) => {
  const navigation = useNavigation();
  const[uid,setUid] = useState()
  const[username, setUsername] = useState('')
  const[rollnumber, setRollNumber] = useState('')
  const[exitDateFromCollege, setExitDateFromCollege] = useState('')
  AsyncStorage.getItem('UID',(err,result)=>{
    setUid(result)
  })
  const addRequest = () => {
    firestore()
    .collection('addrequests')
    .doc(uid)
    .set({
        userid : uid,
        name : username,
        rollNo : rollnumber,
        exitDateFromCollege : exitDateFromCollege,
        status : "Pending",
        statusCode : 'P'
    })
    .then(() => {
        console.log('Requsted updated!');
        Alert.alert('Your Request added successfully')
        //navigation.navigate('Dashboard')
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }]
          }))
    });
  }
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <TextInput 
        value={username}
        onChangeText={(val)=>setUsername(val)}
        style={{borderColor:'black',borderWidth:1,marginHorizontal:20,borderRadius:5}}
        placeholder='User name'
        placeholderTextColor={'grey'}
      />
      <TextInput 
        value={rollnumber}
        onChangeText={(val)=>setRollNumber(val)}
        style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5}}
        placeholder='Roll Number'
        placeholderTextColor={'grey'}
      />
      <TextInput 
        value={exitDateFromCollege}
        onChangeText={(val)=>setExitDateFromCollege(val)}
        style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5}}
        placeholder='Enter exit date'
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginHorizontal:20,marginTop:10,borderRadius:5,backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} onPress={addRequest}>
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Add a request</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddRequest