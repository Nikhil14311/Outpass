import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
const AllRequests = (props) => {
    // console.log("all requests",props.route.params)
    // let requestdata = props.route.params
    const[uid,setUid] = useState()
    const[requestdata,setRequestData] = useState()
    useEffect(()=>{
      AsyncStorage.getItem('UID',(err,result)=>{
        setUid(result)
      })
      getAllRequests();
    },[])

    const getAllRequests = async() => {
      const list = []
      await firestore()
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
      setRequestData(list);
    }
    console.log('list for add request>>>>',requestdata)
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        {requestdata && requestdata.map((data,index) => {
          return(
            <View key={index}>
            {data.id === uid ?
            <View style={styles.boxContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>{data.name}</Text>
                <View style={{backgroundColor:'white',width:100,padding:5,alignItems:'center',justifyContent:'center',borderColor:'green',borderWidth:1,borderRadius:5}}>
                  <Text style={{color : 'green'}}>{data.status}</Text>
                </View>
              </View>
              <Text style={{color:'grey',fontWeight:'bold',fontSize:12}}>{data.rollNo}</Text>
              <View>
                <Text style={{fontSize:12,color:'grey',marginTop:10}}>Exit Date : {data.exitDateFromCollege} </Text>
              </View>
          </View> : 
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'red',fontSize:16}}>No data found</Text>
            </View>
          }
          </View>
          )
        })
        }
      </View>
    )
}

export default AllRequests

const styles = StyleSheet.create({
  boxContainer:{
    marginHorizontal:20,
    height:100,
    borderRadius : 5,
    backgroundColor:'white',
    elevation:20,
    shadowColor: '#52006A',
    //shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical:20,
    padding:10
  }
})