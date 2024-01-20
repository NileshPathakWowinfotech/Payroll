import {View,Text,Image} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Screen1 = ()=>{
    return (
      <View style={{flex:1,flexDirection:'column-reverse'}}>
       <TouchableOpacity style={{alignSelf:'flex-end',position:'relative',bottom:15,right:15}}>
      
        <Image  style={{width:60,height:60}} source={require("../images/plusicon.png")} />
      </TouchableOpacity>
      </View>
      
    );
};


export default Screen1;