import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,
    ActivityIndicator,Route,useWindowDimensions  } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState,Component } from 'react';
import style from '../styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
// import DatePicker from 'react-native-datepicker';

 

const expAction = ({route,navigation})=>{

  


   
    
    return (

      

<View style={style.container}>

<View style={style.expdetail1}>
    <View style={style.expdetail_pink_amt}><Text style={style.expdetail_pink_amt1}>£3490.00</Text></View>
    <View style={style.expdetail_pink_amt}><Text style={style.expdetail_pink_amt2}>Fuel Expense</Text></View>
</View>
<View style={style.expdetail2}>
    <Text>Description</Text>
    <Text style={style.expdetail2_destext}> Live each day as if your life had just begun. 
    Live each day as if your life had just begun. Live each day as if your life had just begun.</Text>
</View>



<View style={style.expdetail_Sub_date}>
<Text style={style.expdetail2_destext1}>Submission date</Text>
    <Text style={style.expdetail_pink_amt2}>19/12/2023</Text>
    </View>

    <View style={style.expdetail1}>
    <Text style={{width:"50%",}}>Date:</Text>
   
        <Text style={{width:"50%", textAlign:"right",}} >Umesh</Text>
   
    {/* <DatePicker/> */}
    
    </View>

    <View style={style.expdetail2}>
    <Text>Attachment:</Text>
    <View style={style.expdetail1}>
    <Text style={{width:"50%", color:"#676a6c",}}>Fuel_1.jpeg</Text>
    <View  style={{width:"50%", flexDirection:"row", justifyContent:"flex-end"}}>
    <Text style={{textAlign:"right", marginRight:20,}} ><Icon name='eye' size={15} color="#676a6c" /></Text>
    <Text style={{textAlign:"right",}} ><Icon name='download'   size={15} color="#676a6c" /></Text>
    </View>
    </View>
    
</View>

<View style={style.expdetail2}>
    <Text>Employer Comment:</Text>
    <TextInput
        style={{height: 100, borderColor:"#676a6c", borderWidth:0.5, 
        marginTop:5, borderRadius:5,textAlign:"auto",}}
       
       
      />

    </View>

    <View style={style.expdetail1}>
    <Text style={style.Approve_btn} ><Icon name="check-circle" size={20} color="#fff" style={style.explefticon} />  Approve</Text>
    <Text style={style.reject_btn} ><Icon name="times-circle" size={20} color="#fff" style={style.explefticon} />  Reject</Text>
  
        </View>
     
</View>
    );
};


export default expAction;
