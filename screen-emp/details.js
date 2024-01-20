import React from 'react';
import { View, Text, Button, StyleSheet,Image,TextInput,Alert,ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const Login = ({navigation}) => {
    const [data, setData] = React.useState({
      username: '',
      dataBase:'sandboxpre',
      isloading:false

    });
    
    const textInputChange = (val) => {
      if( val.trim().length >= 4 ) {
          setData({
              ...data,
              username: val,
              check_textInputChange: true,
              isValidUser: true
          });
      } else {
          setData({
              ...data,
              username: val,
              check_textInputChange: false,
              isValidUser: false
          });
      }
    }

    const dataBaseChange = (val) => {
      if( val.length >= 1 ) {
          setData({
              ...data,
              dataBase: val,
              check_textInputChange: true,
              isValidUser: true
          });
      } else {
          setData({
              ...data,
              username: val,
              check_textInputChange: false,
              isValidUser: false
          });
      }
    }
    

    const forgotPassword = () => {
          if ( data.username.length == 0  || data.dataBase.length ==0) {
              Alert.alert('Wrong Input!', 'Username  field cannot be empty.', [
                  {text: 'Okay'}
              ]);
              // this.state.spinner =true;
              return;
          }else{
  
            let input =data.username;
            let fields = input.split('/');
            let prefix = fields[0].toLocaleLowerCase();
            let name = fields[1];

          var format = /[/]/;
          var charseT = input.match(format);
          if(charseT==null){
            prefix='live';
            name=input;
          }

           if(prefix=='dns' || prefix=='live' || prefix=='sandboxpre' || prefix=='sandbox' || prefix=='dnsgroup' && name){

            setData({
              ...data,
              isloading: true,
            
          });
                let url ="http://"+prefix+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+prefix+"/ForgotPassword?LoginName="+name;  
                  fetch(url, {
                      method: 'GET',
                      //Request Type 
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    setData({
                      ...data,
                      isloading: false,
                    
                  });
                      var SampleArray =responseJson ;
                      if(SampleArray.IsSuccess==true){
                             navigation.navigate('Login');
                             Alert.alert('Successfull!!', 'Reset password link successfully sent to your mail', [
                              {text: 'Okay'}
                          ]);
                      }else{
                        setData({
                          ...data,
                          isloading: false,
                        
                      });
                          Alert.alert('Wrong Input!', SampleArray.Description, [
                              {text: 'Okay'}
                          ]);
                      }
                  })
                  //If response is not in json then in error
                  .catch((error) => {
                      Alert.alert('Wrong Input!', 'Something went wront.', [
                          {text: 'Okay'}
                      ]);
                      console.error(error);
                  });
                }else{
                  Alert.alert('Wrong Input!', 'Please enter a valid prefix and user name.', [
                    {text: 'Okay'}
                ]);
                }
          } 
         
      }
      
    
      return (
    
        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={require("../images/icon.png")} />
           <Text style={{ fontSize:16, color:"#ff00aa"}}>Payroll</Text>
           <View>
                 <ActivityIndicator animating={data.isloading} color="#ff00aa"   size="large" />
             </View>
           <View>
           {/* <DropDownPicker
              items={[  

                  {label: 'Sandbox Pre', value: 'sandboxpre', icon: () => <Icon name="briefcase" size={18} color="#fff" />},
                  {label: 'Dns', value: 'dns', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'Nomisma', value: 'live', icon: () => <Icon name="flag" size={18} color="#900" />},
              ]}
               defaultValue={data.dataBase}
              containerStyle={{height: 44,width:290,margin:5}}
                  style={{backgroundColor: '#ff00aa',}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#a1a2a2'}}

              onChangeItem={(item) =>dataBaseChange(item.value)} 
          /> */}

         </View>
         
           <TextInput
              onChangeText={(val) => textInputChange(val)}
               style={styles.input}
              placeholder="Enter Your User Name"
            />
           
       <View>
      
           </View>

           <Text
           style={styles.log_btn}
           onPress={()=> forgotPassword() }
           >Forgot Password</Text>
           
           <Text style={{marginVertical:10, color:"#828282", textDecorationLine: 'underline'}}  onPress={()=> navigation.navigate('Login')}>Back to login</Text>

           
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
      marginVertical:10,
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
      marginVertical:10,
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