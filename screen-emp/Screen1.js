import {View,Text,Image} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Screen1 = ()=>{
    return (
      <View style={{ position:'relative',bottom:-470, marginLeft:350}}>
       <TouchableOpacity>
        <View  >
         
        </View>
        <Image  style={{width:60,height:60}} source={require("../images/plusicon.png")} />
      </TouchableOpacity>
      </View>
      
    );
};


export default Screen1;