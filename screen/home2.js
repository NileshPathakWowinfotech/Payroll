// import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet,Modal,Image,TextInput,Alert,ScrollView,Touchable, TouchableOpacity, SafeAreaView,
  Animated,
  Easting } from 'react-native';
  import React, { useEffect, useRef, useState } from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Container, Header,Title, Body,Button} from 'native-base';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { NavigationContainer } from '@react-navigation/native';

  
  //screen
  import RecentpayslipScreen from '../screen/payslipRecent';
  import PayslipIndividualScreen from '../screen/payslipIndividual';
  
  
  //Screen Name
  const recentPayslip = 'RecentpayslipScreen';
  const payslipIndividual = 'PayslipIndividualScreen';
  

 
  const Tab = createBottomTabNavigator();
  
  export default App = ({navigation}) => {
    const [data, setData] = useState([]);
    const[visible,setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const options = [
  
     // {data.UserType=='Employee' ?
      {
        title: 'Profile',
       // icon: 'user',
        action:()=> (navigation.navigate('profile2'),resizeBox(0))
        
      },
     // :null} ,
      {
        title: 'Change Password',
       // icon: 'pencil-square',
        action: ()=> (navigation.navigate('Change_Password'),resizeBox(0)),
      },
      {
        title: 'Logout',
        //icon: 'sign-out',
        action: ()=>logout(),
      },
    ];
    function  resizeBox(to){
      to === 1 && setVisible(true);
      Animated.timing(scale,{
        toValue: to,
        useNativeDriver: true,
        duration: 200,
      //  easting: Easting.linear,
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
  
          setData(JSON.parse(res));
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
              <Title>Welcome {data.LoginName}</Title> 
              </Body> 
              <Button onPress={()=> navigation.navigate('setting')} transparent>
              <Text onPress={()=> navigation.navigate('setting')}><Icon  onPress={()=> navigation.navigate('setting')}name="bell" size={18} color="#fff"  /></Text>
              </Button>
  
              {/* <Button onPress={()=> setVisible(true)} transparent>
              <Text onPress={()=> setVisible(true)}><Icon onPress={()=> setVisible(true)} name="bars" size={18} color="#fff" /></Text>
              </Button> */}
              <TouchableOpacity onPress={()=>resizeBox(1)}>
             <Icon onPress={()=> setVisible(true)} name="bars" size={18} color="#fff" style={{paddingRight:10, paddingLeft:15,}} />
              </TouchableOpacity>
               <Modal transparent={true} visible={visible}>
                <SafeAreaView style={{flex:1}}>
                <Animated.View style={[styles.popup]}>
                  {options.map((op,i)=>(
                    <TouchableOpacity style={[styles.option,{borderBottomWidth: i === options.length - 1 ? 0 : 1}]}
                     key={i}
                     onPress={op.action}>
                      <Text>{op.title}</Text>
                      <Icon name={op.icon} size={26} color='#212121' style={{marginLeft:10}}/>
  
  
                    </TouchableOpacity>
  
                  ))}
                   
                </Animated.View>
                </SafeAreaView>
               
               </Modal>
             
            </Header>
          
  
      <View style={styles.container}>

        
  
     
        
        
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
  
  {data.UserType=='Employee' ?  
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
  
    
     
       {data.UserType=='Employer' ? 
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
        
  
  </View>
  <View><Text>Hello</Text></View>
  
      {/* <Tab.Navigator>
      <Tab.Screen name="Home" component={myScreen} />
        <Tab.Screen name="Settings" component={my2Screen} />
    </Tab.Navigator> */}
   
      {/* <Tab.Navigator 
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
> */}
        {/* <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator> */}
    


  </Container>

  

  
  
       );
       };

      

 <Tab.Navigator
      initialRouteName="Feed"
     // lazy={false}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#ffffff',
  style: {
        //  paddingTop:5, 
      // margin:40,
      padding:10,
          backgroundColor: '#2e2f31',
          height:60
     }
              }}>
      <Tab.Screen
        // name="HomeStack"
        // component={HomeStack}
        
            options={{
              unmountOnBlur:true,

          tabBarLabel:({focused, color , size}) => ( <Text style={{paddingBottom:3, paddingTop:5 ,color:'#ffffff', fontSize:11,fontWeight:'bold'}}>HOME</Text>),
        
          tabBarIcon: ({focused, color , size}) => (
            <Icon name="home" size={30}        
            color={color} />

          ),
        }}
      />

<Tab.Screen
        // name="SaleStack"
        // component={SaleStack}
        options={{
          unmountOnBlur:true,

          tabBarLabel:({focused, color , size}) => ( <Text style={{paddingBottom:3, paddingTop:5,color:color, fontSize:11,fontWeight:'bold'}}>SALES</Text>),

          tabBarIcon: ({focused, color, size}) => (
            <Icon 
            // onPress={()=>console.log("SALES Is click") } 
            name="line-chart" size={25} color={color} />

          ),
        }}
      />

      <Tab.Screen
        // name="SettingsStack"
        // component={SettingsStack}
        options={{
          unmountOnBlur:true,

          tabBarLabel:({focused, color , size}) => ( <Text style={{paddingBottom:3, paddingTop:5,color:color, fontSize:11,fontWeight:'bold'}}>PURCHASES</Text>),
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="shopping-basket" size={25} color={color} />

          ),
        }}
      />

<Tab.Screen
        // name="ContactStack"
        // component={ContactStack}
        options={{
          unmountOnBlur:true,
          tabBarLabel:({focused, color , size}) => ( <Text style={{paddingBottom:3, paddingTop:5,color:color, fontSize:11,fontWeight:'bold'}}>CONTACTS</Text>),

          tabBarIcon: ({focused, color, size}) => (
            <Icon name="group" size={25} color={color} />

          ),
        }}
      />
    </Tab.Navigator> 
      
  
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
    paddingVertical:7,
    borderBottomColor:'#ccc',
  },
  
  
  
  });