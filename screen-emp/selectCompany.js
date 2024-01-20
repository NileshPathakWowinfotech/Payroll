import React from 'react';
import { View, Text, Button, StyleSheet,Image,TextInput ,FlatList,SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [companyDetails, setData] = React.useState({
    company: '',   
  });

    const loginHandle = () => {
        AsyncStorage.getItem('userDetails').then(res => {
          var result = new Array();
          result =JSON.parse(res);
          // '/' + result.AuthToken + '/GetCompanyInfoList'
          fetch("http://dns.nomismasolution.co.uk/AccountREST/AccountService.svc/dns/"+ result.AuthToken + '/GetCompanyInfoList', {
            method: 'GET',
            //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          companyDetails.company = responseJson.ResultInfo
                
        })
        })   
        
    }

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    }
      return (
 
    
        <View style={styles.container}>
           <SafeAreaView style={styles.container}>
       <FlatList
        data={companyDetails.company}

        renderItem={({item})=><Text>{item.CompanyName}</Text>}
       
        keyExtractor={(item, index) => index.toString()}

      /> 
    </SafeAreaView>
    
           <Button
           title="get Storage"
           onPress={() => {loginHandle()}}  

           />         
           <Button
           title="Home Page"
           onPress={() =>navigation.navigate('HomePage')}

           />
        </View>  
      );
    };
    
export default Login;

const styles = StyleSheet.create({
    inputext: {
      width: 200,
      height: 44,
      padding: 10,
      textAlign:'center',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    container: {
      flex: 1,
       alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: '#C3EBEB',
    },
    login:{
      margin: 2,
      paddingBottom:3 ,
    },
    tinyLogo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    },
  });