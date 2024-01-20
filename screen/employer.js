// import React from 'react';
import { View, Text, StyleSheet,Modal,Image,TextInput,Alert,ScrollView,Touchable, TouchableOpacity, SafeAreaView,
    Animated,
    Easting } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import React, { useEffect, useRef, useState } from 'react';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import { Container, Header,Title, Body,Button} from 'native-base';
   
   
   
    
    export default App = ({navigation}) => {
      const [data, setData] = useState([]);
      const[visible,setVisible] = useState(false);
      const[MyCompanyName,setCompanyName] = useState([]);
      const scale = useRef(new Animated.Value(0)).current;
     
    
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
           console.log("hahahha======="+MyCompanyName);
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
                <Title style={{marginRight:160}}>{MyCompanyName}</Title> 
                </Body> 
                <Button onPress={()=> navigation.navigate('setting')} transparent>
                <Text onPress={()=> navigation.navigate('setting')}><Icon  onPress={()=> navigation.navigate('setting')}name="cogs" size={18} color="#fff"  /></Text>
                </Button>
              </Header>
            
    
        <View  style={styles.container} >   
            
          <Image style={styles.tinyLogo} source={require("../images/icon.png")} />
          {/* <Text style={{marginBottom:30,}}>Welcome {data.LoginName}</Text> */}

       
         {data.UserType=='Employer' ? 
         <Text
         style={styles.log_btn}
            onPress={()=> navigation.navigate('employeeList2')}
          ><Icon name="user" size={18} color="#fff" style={styles.lefticon} />Employees</Text>
         :null}
          
          {data.UserType=='Employer' ?   
         <Text
         style={styles.log_btn}
         onPress={()=>navigation.navigate('expsManagement')}
          ><Icon name="gbp" size={18} color="#fff" style={styles.lefticon} />Expense Management</Text>
          :null }
         
         {data.UserType=='Employer' ? 
         <Text
         style={styles.disable_btn}
          ><Icon name="calendar" size={18} color="#fff" style={styles.lefticon} />Annual Leave Management</Text>
          :null}
    
         
          
    
    </View>
   
    </Container>
    
         );
         };

  
    
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