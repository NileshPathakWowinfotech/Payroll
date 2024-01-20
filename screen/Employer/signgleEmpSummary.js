import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,
    ActivityIndicator,Route,useWindowDimensions  } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState,Component } from 'react';
import style from '../styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
// import Pie from 'react-native-pie';

const approved = () => (
    <View style={{ flex: 1,  }}>

      
        <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Approved</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='check-circle' style={style.tabrate_icon}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Approved</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='check-circle' style={style.tabrate_icon}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Approved</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='check-circle' style={style.tabrate_icon}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Approved</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='check-circle' style={style.tabrate_icon}  size={25}  /></Text></View>
            </View>
    </View>
  );
  
  const pending = () => (
    <View style={{ flex: 1,}} >
        <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Pending</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='clock-o' style={style.tabrate_icon_pending}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Pending</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='clock-o' style={style.tabrate_icon_pending}  size={25}  /></Text></View>
            </View>   
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Pending</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='clock-o' style={style.tabrate_icon_pending}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Pending</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='clock-o' style={style.tabrate_icon_pending}  size={25}  /></Text></View>
            </View>
      </View>
  );

  const rejected = () => (
    <View style={style.tabviewcontainer} >
       <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
            <View style={style.tablist}>
            <View style={style.tabtext1}><Text style={style.tabtext2}>Rejected</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate2}>£2,346.00</Text></View>
            <View style={style.tabrate1}><Text style={style.tabrate_icon1}> <Icon name='times-circle' style={style.tabrate_icon_reject}  size={25}  /></Text></View>
            </View>
      </View>
  );
  
  const renderScene = SceneMap({
    first: approved,
    second: pending,
    third:rejected
    
  });

const singleEmpSummary = ({route,navigation})=>{

  const { pageStatus } = route.params;
  const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(4);
    const [routes] = React.useState([
      { key: 'first', title: 'Approved',  },
      { key: 'second', title: 'Pending', },
      { key: 'third', title: 'Rejected' },
    ]);


    useEffect(() => {
      setIndex(pageStatus)
      console.log("USEEFFECT================================",index);
      return
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {    //This id PayrollCompanyCode
          AsyncStorage.getItem('companycodee').then(comnyCod => { //This is CompanyCode
            AsyncStorage.getItem('urlPrefix').then(prefix => {
              result = JSON.parse(res);
              data.token = result.AuthToken;
              data.compnyCode = compCod;
              data.compnyCodee = comnyCod;
              data.prefix = prefix;
              data.url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/" + data.compnyCodee + "/";
              data.url2 = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token+ "/";
  
              console.log("User Details !!=== ", result);
              console.log("URL-GetExpenseHeadInfoList====" + JSON.stringify(data));
              // getExpenseType();
              getTaxyerPeriodEnd();
            });
          });
        });
      })
  
    }, []);

    
    return (

      

<View style={style.container}>

      <View
          style={{
           
             justifyContent: "center",
            alignItems:"center",
            width:"100%",
            marginVertical:50,
            
          }}
        >
        
          <Pie
         
            radius={80}
            innerRadius={50}
            sections={[             
            
              {
                percentage: 35,
                color: '#F5C330',
              },
              {
                percentage: 15,
                color: '#F55C30',
              },
              {
                percentage: 50,
                color: '#5EBE41',
              },
            ]}
            strokeCap={'butt'}
          />



        </View>
      <View style={style.empgraph}>
     
      </View>
  <TabView
  
   indicatorStyle={{ color:  "red",  }}
   
   contentContainerStyle={{color: "red"}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      
   initialLayout={{ width: layout.width }}
   renderTabBar={props => <TabBar {...props} style={{  backgroundColor:'green',
   borderTopWidth:1,
   borderTopColor:'#D3D3D3' }}
   
   
   />}  
   
   
  // renderLabel={({ route, focused, color }) => (
  //   <Text style={{ color:'#ecedd', margin: 80 }}>
  //     {route.title}
  //   </Text>
  // )}

    />
      </View>
    );
};


export default singleEmpSummary;
