import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const allExp = ({route,navigation})=>{
  
    return (
        <View style={style.container}>
          <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>Fuel Expense</Text>
       </View>
       <View style={style.listamt1}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}><Icon name='clock-o'  size={20} color="#ffd40d" /></Text></View>
      </View>
     
      </View>

      <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>Air Expenses</Text>
       </View>
       <View style={style.listamt1_all}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}>  <Icon name='times-circle'  size={20} color="#EC581F" /></Text></View>
      </View>     
      </View>

      <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>Air Expenses</Text>
       </View>
       <View style={style.listamt1_all}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}>  <Icon name='check-circle'  size={20} color="#7DCA20" /></Text></View>
      </View>     
      </View>
      <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>IT & Expense Expenses</Text>
       </View>
       <View style={style.listamt1_all}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}>  <Icon name='check-circle'  size={20} color="#7DCA20" /></Text></View>
      </View>     
      </View>
      <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>IT & Expense Expenses</Text>
       </View>
       <View style={style.listamt1_all}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}>  <Icon name='check-circle'  size={20} color="#7DCA20" /></Text></View>
      </View>     
      </View>
      <View style={style.appexplist1}>
      <View style={style.appexplist}> 
      <View style={style.expdes1_all}>        
        <Text  style={style.expdes_head_all}>IT & Expense Expenses</Text>
       </View>
       <View style={style.listamt1_all}><Text  style={style.expdes_amt_all}>£1,635.00</Text></View>
       <View style={style.righticon}  ><Text style={{textAlign:'right', marginRight:5,}}>  <Icon name='check-circle'  size={20} color="#7DCA20" /></Text></View>
      </View>     
      </View>


      </View>
    );
};


export default allExp;
