import { View, Text, TouchableOpacity, Alert, AsyncStorage, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import LoadingPage from './LoadingPage';

const AdminAcceptRequest = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState()
  const[requests, setRequests] = useState()
  const[loading, setLodaing] = useState(true)
  const [visible,setVisible] = useState(false)

  
  useEffect(()=>{
    gettingUserRequests();
    setVisible(true)
  },[gettingUserRequests])


  const gettingUserRequests = useCallback(async() => {
    let list = []
    await firestore()
    .collection('addrequests')
    .get()
    .then((QuerySnapshot)=>{
      setVisible(false)
      setLodaing(false)
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
  })


  
  console.log("requests>>>>>>>>",requests)
  let pending = 0;
  requests && requests.map((item)=>{
    if(item.statusCode === 'P') pending++;
  })

  return (
    <>
    {loading ? 
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <LoadingPage visible={visible} />
      </View>
    :
    <View style={{flex:1}}>
      {pending == 0 ? 
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'red',fontSize:16,fontWeight:'bold'}}>No Requests Found</Text>
        </View>
      :
        <FlatList 
        data={requests}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 100,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item})=>{
          console.log("items in flatlist",item)
          if(item.statusCode === "P"){
            return(
              <UserRequests 
                name = {item.name}
                rollNo = {item.rollNo}
                id = {item.id}
                status = {item.status}
                statusCode = {item.statusCode}
                userid = {item.userid}
                exitDateFromCollege = {item.exitDateFromCollege}
              />
            )
          }
        }}
      />
      }
    </View> }
    </> 
  )
}

export default AdminAcceptRequest


export const UserRequests = (props) => {
  console.log("props from flatlist",props)
  const navigation = useNavigation()
  const Approve = (detail) => {
    console.log("item>>>>>>>",detail)
    let item = detail.props
    firestore()
    .collection('addrequests')
    .doc(item.id)    
    .update({
        userid : item.id,
        name : item.name,
        rollNo : item.rollNo,
        exitDateFromCollege : item.exitDateFromCollege,
        status : "Approved",
        statusCode : 'A'
    })
    .then(() => {
        console.log('Requsted updated!');
        Alert.alert("You successfully Accepted the request")
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'adminacceptrequest' }]
          })
        )
    });
  }

  const Reject = (detail) => {
    console.log("item>>>>>>>",detail)
    let item = detail.props
    firestore()
    .collection('addrequests')
    .doc(item.id)   
    .update({
        userid : item.id,
        name : item.name,
        rollNo : item.rollNo,
        exitDateFromCollege : item.exitDateFromCollege,
        status : "Reject",
        statusCode : 'R'
    })
    .then(() => {
        console.log('Requsted updated!');
        Alert.alert("You successfully Accepted the request")
    });
  }
  let detail = {props}
  return (
    <View style={{flex:1}}>
      <View style={{marginHorizontal:20,height:120,borderColor:'grey',borderWidth:1,marginVertical:10}}>
        <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>{props.name}</Text>
        <TouchableOpacity onPress={() => Approve(detail)} style={{marginHorizontal:20,height:40,borderColor:'green',borderRadius:5,alignItems:'center',justifyContent:'center',borderWidth:1}}>
          <Text style={{color:'green',fontSize:16,fontWeight:'bold'}}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Reject({props})} style={{marginHorizontal:20,height:40,borderColor:'red',borderRadius:5,alignItems:'center',justifyContent:'center',borderWidth:1,marginTop:10}}>
          <Text style={{color:'red',fontSize:16,fontWeight:'bold'}}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}