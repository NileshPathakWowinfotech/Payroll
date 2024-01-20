import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const draftExp = ({route,navigation})=>{

  useEffect(() => {
    console.log("data=====" + JSON.stringify(data));
    AsyncStorage.getItem('userDetails').then(res => {
      AsyncStorage.getItem('companyCode').then(compCod => {
        AsyncStorage.getItem('urlPrefix').then(prefix => {
          result = JSON.parse(res);
          console.log("Result =========== ", res);
          let json = JSON.stringify(data);
          console.log(json);

        });
      });
    })

  }, []);

  const data = route.params;
  let allData = JSON.stringify(data);
  console.log("allData==" + allData);
  var status = JSON.parse(allData);
  let parseData = status.data.ApprovedExpenseDetailsArr;
  console.log("parseData===" + JSON.stringify(parseData));


  
    return (
        <View style={style.container}>
          <TouchableOpacity onPress={() => navigation.navigate('approveExpDetails', { data })}>
          <FlatList
          style={{ borderRadius: 5, marginTop: 0, marginLeft: 15, marginRight: 15, marginVertical: 20 }}
          data={parseData}
          renderItem={({ item }) => (

          <View style={style.appexplist1}>
      <View style={style.appexplist}>
       <View style={{width:80, height:120, backgroundColor:"grey",}}><Text></Text></View>
       <View style={style.expdes}>
        <Text  style={style.expdes_head}>{item.AccountName}</Text>
        <Text  style={style.expdes_des}>Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</Text>
       </View>
       <View style={style.righticon} ><Text style={{textAlign:'right'}}><Icon name='trash-o'  size={20} color="grey" /></Text></View>
      </View>
      <View style={style.listamt}>
      <Text  style={style.expdes_date}>{item.CreatedOn}</Text>
        <Text  style={style.expdes_amt1}>£{item.Amount}</Text>
      </View>
      </View>
      )}
      />
      </TouchableOpacity>
      </View>
    );
};


export default draftExp;
