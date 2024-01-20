import React,{useEffect} from 'react';
import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator,createAppContainer } from '@react-navigation/stack';
import forgotPassword from './details';
import selectCompany from './selectCompany';
import AppPage from '../App';
import HomePage from './home';
import HomePage2 from './home2';
import HomePage3 from './home3';
import payslip from './payslip';
import payslipRecent from './payslipRecent';
import payslipIndividual from './payslipIndividual';
import attendence from './attendance'; 
import CompanyList from './companyList';
import profile from './profile';
import profile2 from './profile2';
import setting from './setting';
import changePassword from './changePassword';
import employeeList from './employeeList';
import companies from './companies';
import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import approvedExp from './approvedExp';

const Stack = createStackNavigator();
const MainScreen = ({navigation}) => {

  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(res => {
        var result = new Array();
        result =JSON.parse(res);
        console.log("Check Storage ==== ",result);
        if(result){
          navigation.navigate('HomePage3');
        }else{
          console.log("You Don't have login");
        }
  })

  }, []);

  let load=true;
    const [data, setData] = React.useState({
      username: '',   
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
      dataBase:'sandboxpre',
      icon:'eye-slash',
      isloading:false
    });
    const updateSecureTextEntry = () => {
      setData({
          ...data,
          secureTextEntry: !data.secureTextEntry     
      });
  
      if(data.secureTextEntry ==true){
        data.icon ='eye'
      }else{
        data.icon ='eye-slash'
      }
  }
    

    const [loading, setLoading] = React.useState();
   
    const textInputChange = (val) => {
      if( val.trim().length >= 1 ) {
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
    
    const handlePasswordChange = (val) => {
      if( val.trim().length >= 1 ) {
          setData({
              ...data,
              password: val,
              isValidPassword: true
          });
      } else {
          setData({
              ...data,
              password: val,
              isValidPassword: false
          });
      }
    }
    
    // const updateSecureTextEntry = () => {
    //       setData({
    //           ...data,
    //           secureTextEntry: !data.secureTextEntry
              
    //       });

    //       if(data.secureTextEntry ==true){
    //         data.icon ='eye'
    //       }else{
    //         data.icon ='eye-slash'
    //       }
    // }

    const stop=()=>{
         
      setData({
        ...data,
        isloading: false,
      
    });

    }
    const loginHandle = (userName,Password) => {

        if ( data.username.length == 0 || data.password.length == 0 || data.dataBase.length ==0) {
            Alert.alert('Try Again!', 'Username or password field cannot be empty.', [
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

          // https://regression.nomismasolution.co.uk/
         if(prefix=='dns' || prefix=='live' || prefix=='sandbox4' || prefix=='regression' || prefix=='dev' || prefix=='sandbox5' || prefix=='sandbox2' || prefix=='sandboxpre' || prefix=='sandbox' || prefix=='dnsgroup'  && name){
          setData({
            ...data,
            isloading: true,
          
        });
              //  let url ="http://"+data.dataBase+".nomismasolution.co.uk/AccountREST/AccountService.svc/dns/Authorise?LoginName="+data.username+"&Password="+data.password;  
              
            //  let url ="http://"+prefix+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+prefix+"/AuthoriseApp?LoginName="+name+"&Password="+data.password; 
             
            //  http://sandbox.nomismasolution.co.uk/AccountREST/Accountservice.svc/sandbox/AuthoriseMobileApp?LoginName=sunil.sanboxpayrollEmployeeView&Password=311851

             let url ="http://"+prefix+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+prefix+"/AuthoriseMobileApp?LoginName="+name+"&Password="+data.password; 
              console.log("URL ==== ",url);
                fetch(url, {
                    method: 'GET',
                    //Request Type 
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("Login Response === ",responseJson)
                  
                  setData({
                    ...data,
                    isloading: false,
                  
                });
                    var SampleArray =responseJson ;

                    console.log("response============== ",responseJson);
                    if(SampleArray.IsSuccess==true){
                      // if(SampleArray.ResultInfo.UserType=='Employer' || SampleArray.ResultInfo.UserType=='Employee'){                     
                      if(SampleArray.ResultInfo.UserType=='Employee'){
                      }else {
                        SampleArray.ResultInfo.UserType='Employer'
                      }

                        console.log("User Details === ",SampleArray.ResultInfo)
                        // return
                        AsyncStorage.setItem('userDetails',JSON.stringify(SampleArray.ResultInfo));
                         AsyncStorage.setItem('urlPrefix',prefix);
                         navigation.navigate('companies');
                      
                    }else{
                        Alert.alert('', responseJson.Description, [
                          {text: 'Okay'}
                      ]);
                    }
                })
                //If response is not in json then in error
                .catch((error) => {

                  console.log("Error Message ==== ",error);
                  setData({
                    ...data,
                    isloading: false,
                  
                });
                    Alert.alert('Try Again!', 'Something went wrong.', [
                        {text: 'Okay'}
                    ]);
                    // console.error(error);
                });

              }else{
                Alert.alert('Try Again!', 'Please enter a valid prefix and user name.', [
                  {text: 'Okay'}
              ]);

              }

        } 
       
    }
    
      return (
        // My Code
        
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={require("../images/icon.png")} />
               <Text style={{ fontSize:16, color:"#ff00aa"}}>Payroll</Text>
      
              <View all={0}>
                 <ActivityIndicator animating={data.isloading} color="#ff00aa"   size="large" />
             </View>
      
      
        
           <TextInput
              onChangeText={(val) => textInputChange(val)}
               style={styles.input}
              placeholder="User Name"
            />
           
           <View style={styles.textBoxcontainer}>
            <TextInput
                     style={styles.input}
                    placeholder="Password"
                    secureTextEntry={data.secureTextEntry ?true : false}
                    onChangeText={(val) => handlePasswordChange(val)}
                  />

                  <TouchableOpacity  style={styles.thouchablebtn}
                    onPress={updateSecureTextEntry}
                  >
                    {data.secureTextEntry ?
              <Icon name='eye-slash' size={18} color="#a1a1a1" />
              // <FontAwesome icon={SolidIcons.smile} />
                     :
                     <Icon name='eye'  size={18} color="#a1a1a1" />
                    // <FontAwesome icon={SolidIcons.smile} />

                    }
                  </TouchableOpacity>

           </View>


                   
                  <TouchableOpacity style={styles.log_btn} onPress={() => {loginHandle(data.username, data.password )}} >
                <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
           <Text style={{marginVertical:10, color:"#ff00aa", textDecorationLine: 'underline'}}  onPress={()=> navigation.navigate('FrgotPassword')}>Forgot Password?</Text>
 
        </View>  
      );
    };
    
    const Login = () => {

      
        return(
        <NavigationContainer>
           <Stack.Navigator>
             <Stack.Screen name="Login" options={{headerShown: false}} component={MainScreen} />
             <Stack.Screen name="FrgotPassword" options={{headerShown: false,  }} component={forgotPassword} />
             <Stack.Screen name="SelectCompany"  component={selectCompany} />
             <Stack.Screen name="AppPage" component={AppPage} />
             <Stack.Screen name="HomePage" options={{headerShown: false}} component={HomePage} />
             <Stack.Screen name="HomePage2" options={{headerShown: false}} component={HomePage2} />
             <Stack.Screen name="HomePage3" options={{headerShown: false}} component={HomePage3} />
             <Stack.Screen name="CompanyList" options={{title: 'Choose Company',headerTintColor: 'white', headerLeft: null,headerStyle: {backgroundColor: '#2e2f31', color:'#ffffff',headerTitleAlign:'center' }}} component={CompanyList}/>
             <Stack.Screen name="payslip" options={{ title: 'Payslip',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={payslip} />
             <Stack.Screen name="payslipRecent" options={{ title: 'Payslip',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={payslipRecent} />
             <Stack.Screen name="payslipIndividual" options={{ title: 'Payslip',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={payslipIndividual} />
             <Stack.Screen name="attendence" options={{ title: 'Annual Leave',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={attendence}/>
             <Stack.Screen name="profile" options={{ title: 'Profile',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={profile}/>
             <Stack.Screen name="profile2" options={{ title: 'Profile',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={profile2}/>
             <Stack.Screen name="setting" options={{ title: 'Settings',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={setting}/>
             <Stack.Screen name="Change_Password" options={{ title: 'Change Password',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={changePassword}/> 
             <Stack.Screen name="employeeList" options={{ title: 'Employees',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={employeeList}/>
             <Stack.Screen name="companies" options={{title: 'Choose Company',headerTintColor: 'white', headerLeft: null,headerStyle: {backgroundColor: '#2e2f31',  }}} component={companies}/>
             <Stack.Screen name="approveExp" options={{ title: 'Annual Leave',headerTintColor: 'white', headerStyle: {backgroundColor: '#2e2f31', } }} component={approvedExp}/>

          </Stack.Navigator>  
        </NavigationContainer>
        )  
    }

export default Login;




const styles = StyleSheet.create({

  spiner: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container:{
    // backgroundColor: '#ff00aa',
    backgroundColor: '#fff',

    flex:1,
    justifyContent:'center',
    alignItems:'center',

    
  },
  welcometext:{
    color:'#fff',
    fontSize:18,
  },
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
   
    login:{
      margin: 2,
      paddingBottom:3 ,
    },   
    stop:{
      margin: 3,
      paddingBottom:2 ,
    },
    tinyLogo: {
      width: '50%',
      height: 100,
      resizeMode: 'contain',
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
      button:{
        width: 300,
        margin: 14
      },
      signup:{
        textAlign: "center"
      },
      
      log_btn:{
        width:"80%",
        backgroundColor:"#ff00aa",
        borderRadius:5,
        paddingVertical:10,
        marginVertical:10,
        fontSize:20,
        height:45,
        borderWidth:null,
        textAlign:'center',
        
      },
      
      btn_text:{
        color:'#ffffff',
        fontWeight:'300',
        textAlign:'center',
        fontSize:18,
      },
    
      textBoxcontainer:{
        width:"100%",
      position:'relative',
      alignItems:'center',
      justifyContent:'center',
      },
    
      thouchablebtn:{
       position:'absolute', 
       right:35,
       width:35,
       height:40,
       padding:2,
       paddingVertical:10,
      },
  });