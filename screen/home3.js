// import React from 'react';
import { View, Text, StyleSheet,Modal,Image,TextInput,Alert,ScrollView,Touchable, TouchableOpacity, SafeAreaView,
  Animated,
  Easing } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import React, { useEffect, useRef, useState } from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Container, Header,Title, Body,Button} from 'native-base';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { NavigationContainer } from '@react-navigation/native';
  
  //screen
  import RecentpayslipScreen from '../screen/payslipRecent';
  import PayslipIndividualScreen from '../screen/payslipIndividual';
  import BottomNavigator from './BottomNavigator';
  //Screen Name
  const recentPayslip = 'RecentpayslipScreen';
  const payslipIndividual = 'PayslipIndividualScreen';

  const Tab = createBottomTabNavigator();
  
  export default App = ({navigation}) => {
    const [data, setData] = useState([]);
    const[visible,setVisible] = useState(false);
    const[MyCompanyName,setCompanyName] = useState([""]);
    const scale = useRef(new Animated.Value(0)).current;
    const options = [
      {
        title: 'Profile',
        action:()=> (navigation.navigate('profile2'),resizeBox(0))  
      },
      {
        title: 'Change Password',
        action: ()=> (navigation.navigate('Change_Password'),resizeBox(0))
      },
      {
        title: 'Logout',
        action: ()=>logout(),
      },
    ];
    function  resizeBox(to){
      to === 1 && setVisible(true);
      Animated.timing(scale,{
        toValue: to,
        useNativeDriver: true,
        duration: 200,
        easting: Easing.linear,
      }).start(()=> to === 0 && setVisible (false));
    }
  
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
    useEffect(() => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
          AsyncStorage.getItem('companyName').then(cName => {
          setData(JSON.parse(res));
          setCompanyName(cName);
          });
        });
      })
  
    }, []);
    
  
  
    const commingSoon = (val,title) => {
      Alert.alert(title, val, [
        {text: 'Okay'}
    ]);
    }
        return (   
          <Container>
            <Header style={styles.Header}>
  
             <Body  style={{alignItems:"center"}}>
              <Title style={{marginRight:150}}>{MyCompanyName}</Title> 
              </Body> 
              <Button  transparent>
              <Text><Icon name="bell" size={18} color="#fff"  /></Text>
              </Button>
             
              <TouchableOpacity onPress={()=> resizeBox(1)}>
             <Icon name="bars" size={18} color="#fff" style={{paddingRight:10, paddingLeft:15,}} />
              </TouchableOpacity>
               <Modal transparent={true} visible={visible}>
                <SafeAreaView style={{flex:1}} backgroundColor={'#000000AA'} onTouchStart={()=> resizeBox(0)}>
               
                <Animated.View style={[styles.popup]}>
                  {options.map((op,i)=>(
                    <TouchableOpacity style={[styles.option, {borderBottomWidth: i === options.length - 1 ? 0 : 1}]} key={i} onPress={op.action}>
                      <Text>{op.title}</Text>
                    </TouchableOpacity>
  
                  ))}
                   
                </Animated.View>
                </SafeAreaView>
               </Modal> 
            </Header> 
      <View >   
        
           {/* style={styles.container} */}

        
        {/* <Image style={styles.tinyLogo} source={require("../images/icon.png")} /> */}
        {/* <Text style={{marginBottom:30,}}>Welcome {data.LoginName}</Text> */}
  
  {/*      
          <Text
            style={styles.log_btn}
            onPress={()=> navigation.navigate('setting')}
          ><Icon name="cogs" size={18} color="#fff" />  Settings</Text> */}
     
  
  {/* Manage Role */}
  
        {/* {data.UserType=='Employee' ?  
        <Text
        style={styles.log_btn}
        onPress={()=> navigation.navigate('payslip')}
        ><Icon name="money" size={18} color="#fff" />  View Payslip</Text>
        :null} */}
  
  {/* {data.UserType=='Employee' ?  
        <Text
        style={styles.log_btn}
        onPress={()=> navigation.navigate('payslipRecent')}
        ><Icon name="money" size={18} color="#fff" />  View Home</Text>
        :null}
  
  {data.UserType=='Employee' ?  
        <Text
        style={styles.log_btn}
        onPress={()=> navigation.navigate('payslipIndividual')}
        ><Icon name="money" size={18} color="#fff" />  View Payslip</Text>
        :null}
   */}
  
  
  
  {/* {data.UserType=='Employee' ? 
     <Text
     style={styles.log_btn}
       onPress={()=> navigation.navigate('attendence')}
     ><Icon name="calendar" size={18} color="#fff" />  Annual Leave</Text>
        :null} */}
    
     {/* {data.UserType=='Employee' ? 
  
     <Text
      style={styles.log_btn}
       onPress={()=> navigation.navigate('profile2')}
     > <Icon name="user" size={18} color="#fff" />  Profile</Text>
      :null} */}
  
     
  
     {/* {data.UserType=='Employee' ? 
  
       <Text
       style={styles.disable_btn} 
        ><Icon name="briefcase" size={18} color="#fff" />  Expense Management</Text>
       :null} */}
  
    
     
       {/* {data.UserType=='Employer' ? 
       <Text
       style={styles.log_btn}
          onPress={()=> navigation.navigate('employeeList')}
        ><Icon name="user" size={18} color="#fff" style={styles.lefticon} />  Employees </Text>
       :null}
        
       
       {data.UserType=='Employer' ? 
       <Text
       style={styles.disable_btn}
        ><Icon name="calendar" size={18} color="#fff" style={styles.lefticon} />  Annual Leave Management</Text>
        :null}
  
       {data.UserType=='Employer' ? 
       
       <Text
       style={styles.disable_btn}
        ><Icon name="gbp" size={18} color="#fff" style={styles.lefticon} />  Expense Management</Text>
        :null }
         */}
  
  </View>
 
  <View style={{flex:1}}>
      <BottomNavigator/>
      
      </View>
    
      
  
  </Container>
  
       );
       };

  //      <NavigationContainer>
  //      <Tab.Navigator
  //             initialRouteName={recentPayslip}
  //             screenOptions={({ route }) => ({
  //               tabBarIcon: ({ focused, color, size }) => {
  //                 let iconName;
  //                 let rn = route.name;

  //                 if (rn === recentPayslip) {
  //                   iconName = focused ? 'home' : 'home-outline';
  //                 } else if (rn === payslipIndividual) {
  //                   iconName = focused ? 'list' : 'list-outline';
  //                 }
                 

  //                 return <Ionicons name={iconName} size={size} color={color} />;
  //               },
  //             })}> 

  //             <Tab.Screen name={recentPayslip} component={RecentpayslipScreen} /> 
  //             <Tab.Screen name={payslipIndividual} component={PayslipIndividualScreen} />
             
             
  
  //             </Tab.Navigator>
  //    </NavigationContainer>

       
          
      
  
  const styles = StyleSheet.create({
  
    Header:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#2e2f31',
      color:'#ffffff'
  
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
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
    button:{
        width: "80%",
        height:50,
        margin: 5,
        borderRadius:5,
        marginVertical:5,
        paddingVertical:5,
       
      
      },
   disable_btn:{
    width:"80%",
    backgroundColor:"#a1a2a2",
    borderRadius:5,
    paddingVertical:7,
    marginVertical:5,
    fontSize:16,
    height:40,
    margin: 5,
    textAlign:'center',
    color:'#ffffff',
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
  
  lefticon:{
  
  paddingLeft:30,
  alignContent:"space-between"
  
  },
  popup:{
    borderRadius:8,
    borderColor:'#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex:-1000,
    top:45,
    right:10,
  
  },
  option:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:12,
    borderBottomColor:'#ccc',
  },
  
  
  
  });