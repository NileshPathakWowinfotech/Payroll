import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const expDetails = ({route,navigation})=>{
  
    return (
        <View style={style.container}>
          <TouchableOpacity>
          <View style={style.appexplist1}>
            
      <View style={style.appexplist}>
      <View style={style.listamt1}><Text  style={style.expdes_amt1}>£1,635</Text></View>
        <View style={style.expdes1}>
        
        <Text  style={style.expdes_head1}>Fuel Expense</Text>
       </View>
       <View style={{flex:1,}} ><Text style={{textAlign:'right'}}>   <Icon name='times-circle'  size={20} color="#EC581F" /></Text></View>
      </View>
      
    
       
      </View>
      </TouchableOpacity>
      <View>
     <Text  style={style.expdes_head2}> Description </Text>

      <Text  style={style.expdes_des1}>Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</Text>

      </View>

      <View style={style.subdates}>
        <View style={{width:'50%', alignSelf:'center',}}>
          <Text style={style.datestyle}>Submission Date</Text>
          <Text style={style.datestyle1}>22/04/2023</Text>
        </View>
        <View style={{width:'50%',}}>
          <Text style={style.datestyleR}>Rejected Date</Text>
          <Text style={style.datestyle1}>22/04/2023</Text>
        </View>

      </View>

      <View>
     <Text  style={style.expdes_head2}> Employee Comment </Text>

      <Text  style={style.expdes_des1}>Please correct the amount</Text>

      </View>
      <View>
     <Text  style={style.expdes_head2}> Receipt </Text>

     <View style={{width:80, height:100, backgroundColor:"grey", marginTop:10, margin:3,}}><Text></Text></View>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate('editExpense')}>
        <View style={style.btn_pink}><Text style={style.btn_label}>Edit & Resend</Text></View>
        </TouchableOpacity>



      </View>
    );
};


export default expDetails;
