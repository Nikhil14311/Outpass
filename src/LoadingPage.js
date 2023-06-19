import { View, Text, Modal, StatusBar, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';

const LoadingPage = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            statusBarTranslucent={false}
        >
            <StatusBar backgroundColor={"black"} />
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
                <LottieView  
                    source={require('../assets/spinner.json')}
                    autoPlay
                    loop
                    style={{width:200,height:200}} 
                />
            </View>
        </Modal>
    )
}

export default LoadingPage