import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Dashboard = (props) => {

    const[user,setUser] = useState()
    const[requests, setRequests] = useState([])
    const[AllRequests,setAllRequests] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('UID',(error,value)=>{
            console.log("value for dashboard",value)
            setUser(value)
        });

        const list = []
        firestore()
        .collection('addrequests')
        .get()
        .then((QuerySnapshot)=>{
          console.log('Total Posts : ',QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {userid,exitDateFromCollege,name,rollNo,status,statusCode} = doc.data();
            list.push({
              id:doc.id,
              userid,
              exitDateFromCollege:exitDateFromCollege,
              name:name,
              rollNo:rollNo,
              status:status,
              statusCode:statusCode,
            })
          })
        })
        console.log('list for add request>>>>',list)
        setRequests(list);


        const request = []
        firestore()
        .collection('allrequests')
        .get()
        .then((QuerySnapshot)=>{
          console.log('Total Posts : ',QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {userid,exitDateFromCollege,name,rollNo,status,statusCode} = doc.data();
            request.push({
              id:doc.id,
              userid,
              exitDateFromCollege:exitDateFromCollege,
              name:name,
              rollNo:rollNo,
              status:status,
              statusCode:statusCode,
            })
          })
        })
        console.log('list for all requests>>>>',request)
        setAllRequests(request)
        
    },[])

    console.log("user uuid for dashboard>>>>>",requests)
  return (
    <View style={{flex:1}}>
      {/* <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Welcome {user.email}</Text> */}
      <>{user === 'qynfHx9tlgMBeNhzNpk0xW2NrQ82' ? 

        
        <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:50,marginHorizontal:20,alignItems:'center',justifyContent:'center',height:50,borderRadius:5}}
        onPress={() => 
          props.navigation.navigate('adminacceptrequest')
        }>
        <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>Requests</Text>
      </TouchableOpacity>
        : <>
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:50,marginHorizontal:20,alignItems:'center',justifyContent:'center',height:50,borderRadius:5}}
        onPress={() => props.navigation.navigate('addrequests')}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>Add a Request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:50,marginHorizontal:20,alignItems:'center',justifyContent:'center',height:50,borderRadius:5}}
      onPress={() => {
          props.navigation.navigate('seerequests',requests)
      }}>
      <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>Your Requests</Text>
    </TouchableOpacity>
    </>
      }</>



      <TouchableOpacity style={{borderColor:'black',borderWidth:1,marginTop:50,marginHorizontal:20,alignItems:'center',justifyContent:'center',height:50,borderRadius:5}}
        onPress={() => {
            auth().signOut().then(() => console.log('User signed out successfully'));
        }}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard