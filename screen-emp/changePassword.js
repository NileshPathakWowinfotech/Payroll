import React from 'react';
import { View, Text, Button, StyleSheet,Image,TextInput,Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

  
    const [data, setData] = React.useState({
      username: '',
      dataBase:AsyncStorage.getItem('urlPrefix'),
      password:'',
      NewPassword:'',
      ConfirmPassword:''

    });
    
    const forgotPassword = () => {
       
          if (  data.password.length ==0 || data.NewPassword.length==0 || data.ConfirmPassword.length==0 ) {
            Alert.alert('Wrong Input!', 'Field cannot be empty.', [
                  {text: 'Okay'}
              ]);
              // this.state.spinner =true;
              return;
          } else if(data.NewPassword !=data.ConfirmPassword){
            Alert.alert('Wrong Input!', 'New password & Confirm password are not match.', [
              {text: 'Okay'}
          ]);
          }
          
          else{
            AsyncStorage.getItem('urlPrefix').then(ress => {
              AsyncStorage.getItem('userDetails').then(res => {
                var result = new Array();
                result =JSON.parse(res);
                let url ="http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+result.AuthToken+"/ChangePassword";  
                  fetch(url, {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        LoginName: result.LoginName,
                        Password:data.password,
                        NewPassword:data.NewPassword,
                        ConfirmPassword:data.ConfirmPassword
                      })
                  })
                  .then((response) =>  response.json())
                  .then((responseJson) => {
                      var SampleArray =responseJson ;
                      if(SampleArray.IsSuccess==true){
                             navigation.navigate('HomePage');
                             Alert.alert('Successfull!!', SampleArray.Description, [
                              {text: 'Okay'}
                          ]);
                      }else{

                        if(SampleArray.ErrorCode ==4004){
                          // navigation.navigate('Login');
                          Alert.alert('Wrong Input!!', SampleArray.Description, [
                           {text: 'Okay'}])
                        }else{
                          navigation.navigate('Login');
                          Alert.alert('Wrong Input!', SampleArray.Description, [
                              {text: 'Okay'}
                          ]);
                        }
                      }
                  })
                  //If response is not in json then in error
                  .catch((error) => {
                    console.error("Error ===== ",JSON.parse(error));
                      Alert.alert('Wrong Input!', JSON.parse(error), [
                          {text: 'Okay'}
                      ]);
                      
                  });
                });
                });
          } 
         
      }
      
    
      return (
    
        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={require("../images/icon.png")} />
           <Text style={{marginBottom:30, fontSize:16, color:"#ff00aa"}}>Payroll</Text>

           {/* <TextInput
              onChangeText={(val) => {data.username =val}}
               style={styles.input}
              placeholder="Enter Your User Name"
            /> */}

           <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry={true}
                onChangeText={e => {data.password =e}}
            />
           
           <TextInput
                     style={styles.input}
                    placeholder="New Password"
                    secureTextEntry={true}
                    onChangeText={e => {data.NewPassword=e}}
            />
            <TextInput
                     style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={e => {data.ConfirmPassword=e}}
                   
            />
       <View>
      
           </View>
           <Text
           style={styles.log_btn}
           onPress={()=> forgotPassword() }
           >Change Password</Text>
           
        </View>  
      );
    };
    
export default Login;

const styles = StyleSheet.create({
  inputext: {
    width:"80%",
    backgroundColor:'#eee',
    borderRadius:5,
    paddingLeft:10,
    marginVertical:5,
    fontSize:16,
    color:'#000',
    height:40,
    alignItems:'stretch',
  },
  input: {
    width:"80%",
    backgroundColor:'#eee',
    borderRadius:5,
    paddingLeft:10,
    marginVertical:5,
    fontSize:16,
    color:'#000',
    height:40,
    alignItems:'stretch',
  },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      width:'80%',
      backgroundColor:'rgba(255, 255, 255, 0.3)',
      marginVertical:15,
    },

    log_btn:{
      width:"80%",
      backgroundColor:"#ff00aa",
      borderRadius:5,
      paddingVertical:7,
      marginVertical:10,
      fontSize:16,
      height:40,
      margin: 5,
      textAlign:'center',
      color:'#ffffff',
     
    
    },
  });