import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const approvedExp = ({route,navigation})=>{
  
    return (
        <View style={style.container}>
          <View style={style.appexplist1}>
      <View style={style.appexplist}>
       <View style={{width:80, height:120, backgroundColor:"grey",}}><Text></Text></View>
       <View style={style.expdes}>
        <Text  style={style.expdes_head}>Fuel Expense</Text>
        <Text  style={style.expdes_des}>Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</Text>
       </View>
       <View style={style.righticon} ><Text style={{textAlign:'right'}}> <Icon name='check-circle'  size={20} color="#7DCA20" /></Text></View>
      </View>
      <View style={style.listamt}>
      <Text  style={style.expdes_date}>15/12/2023</Text>
        <Text  style={style.expdes_amt1}>£1,635</Text>
      </View></View>
      </View>
    );
};


export default approvedExp;
