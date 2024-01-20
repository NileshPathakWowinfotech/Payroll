import React, { useEffect, useState,state,Component } from 'react';

import { ActivityIndicator, FlatList, Text, View, StyleSheet,TextInput } from 'react-native';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './home';
import { NavigationContainer,NavigationInjectedProps, withNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';


export default App = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tempData, settempData] = useState([]);

  const [temp, setTemp] = React.useState({
    allData: [],  
    refreshing:false 
   
  });

  
  const [selectedId, setSelectedId] = useState(null);


  const Stack = createStackNavigator();

  useEffect(() => {
    var result = new Array(); 
    AsyncStorage.getItem('urlPrefix').then(ress => {

    AsyncStorage.getItem('userDetails').then(res => {
        var result = new Array();
        result =JSON.parse(res);

    fetch("http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken + '/GetCompanyInfoList')
      .then((response) => response.json())
      .then((json) =>{
             setData(json.ResultInfo);
             settempData(json.ResultInfo);
            // this.state.companyList =json.ResultInfo;

       })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    })
  })

  }, []);

  const setCompanyCode = (val) => {
    AsyncStorage.setItem("companyCode",val.CompanyCode);
    if (result.UserType==='Employee') {
      navigation.navigate('HomeOne');
      }
    else if (result.UserType==='Employer') {
      navigation.navigate('EmployerLogin');
    }
  
  }

const empty =() =>{
  let t ={
    AuthToken: '',
      CompanyCode: '',
      CompanyName: "'",
      ExpiryDateTime: "/Date(-62135596800000+0000)/"
  }
  settempData(t);
}

const onChangeText =(val) =>{
    if(val){
     
      settempData([]);
    for(let i=0; i < data.length; i++){
        let m = data[i].CompanyName.indexOf(val);
        if(m >-1){
          
             settempData(tempData.concat(data[i]));
            
          }else{
          // settempData('');
        }
      }
      }else{
        settempData(data);
      }
}
  return (
    <View style={styles.container}>
      <View style={styles.textBoxcontainer}>
      <Icon name='search'   style={styles.thouchablebtn}   size={18} color="#a1a1a1" />
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      placeholder='Search Company'
    />
    </View>
    
    <View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          data={tempData}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.companyliststyle}  onPress={() =>setCompanyCode(item)}>{item.CompanyName}</Text>
          )}
        />
      )}
      </View>
    </View>


  );
};
const styles = StyleSheet.create({

  container:{
    backgroundColor: '#ffffff',
    flex: 1,
 
  },
  
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    paddingLeft: 20,
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#ff00aa',
    paddingVertical:20, 
    color:'#ffffff',
    fontSize:18,
    padding:15,
  },
  textBoxcontainer:{
  width:"90%",
  position:'relative',
  borderWidth:1,
  borderRadius:7,
  marginTop:20,
  marginLeft:10,
  },

  thouchablebtn:{
   position:'absolute', 
   right:25,
   width:25,
   height:40,
   padding:2,
   paddingVertical:10,
  },

  companyliststyle:{
 
    margin:5,
    fontSize:16,
    alignContent:"flex-start",
    marginLeft:10,

  }

});