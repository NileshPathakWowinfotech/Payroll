import { View, Text, Button, StyleSheet,Image,TextInput,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



export default App = ({navigation}) => {
  const [data, setData] = useState([]);

// onBackPress = () => {
//     this.props.navigation.goBack();
//     return true;
// }; 
  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(res => {
        setData(JSON.parse(res));
    })

  }, []);


  const logout = () => {
    Alert.alert('Logout!', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'Logout',
      onPress: () => {
        AsyncStorage.clear();
        navigation.navigate('Login');
      },
    
    },
  ]);


  }
      return (

        <View style={styles.container}>    
        <Image style={styles.tinyLogo} source={require("../images/icon.png")} />
      <Text style={{marginBottom:30, fontSize:16, color:"#ff00aa"}}>{data.LoginName}</Text>

       
      {data.UserType=='Employer' ? 
        <Text
          style={styles.log_btn}
            onPress={()=> navigation.navigate('companies')}
          > <Icon name="toggle-on" size={18} color="#fff" style={styles.lefticon} />  Switch Company</Text>
          :null}

<Text
   style={styles.log_btn}
     onPress={()=> navigation.navigate('Change_Password')}
   > <Icon name="pencil-square" size={18} color="#fff" style={styles.lefticon} />  Change Password</Text>


        <Text
           style={styles.log_btn}
          onPress={()=>logout()}
        > <Icon name="sign-out" size={18} color="#fff" style={styles.lefticon} />  Logout</Text>

</View>
     
      );
    };
    

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
      justifyContent:'center',  
      backgroundColor: '#fff',
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
    button: {
        width: 300,
        margin: 5
      },
      lefticon: {

        paddingLeft: 30,
        alignContent: "space-between"

      },
      log_btn:{
        width:"80%",
        backgroundColor:"#ff00aa",
        borderRadius:5,
        paddingVertical:7,
        marginVertical:5,
        fontSize:16,
        height:40,
        margin: 5,
        textAlign:'center',
        color:'#ffffff',
       
      
      },
    });