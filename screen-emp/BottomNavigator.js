import {View,Text,Image} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import FlatListDemo from './payslipRecent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlusScreen from './PlusScreen';
import approvedExp from './approvedExp';
import rejectedExp from './rejectedExp';
import pendingExp from './pendingExp';
import draftExp from './draftExp';
import allExp from './allExp';
import expDetails from './expDetails'
import addExp from './addExp'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => {
    <TouchableOpacity  
    style={{
        top:-30,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.shadow
    }}
    onPress={onPress}
    >
        <View><Text>Hello</Text></View>
       <View style={{
        width:70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45'
       }}> 
          {children}

       </View>

    </TouchableOpacity>
}

function Expense() {
    return (

    <Stack.Navigator
    
      initialRouteName="Screen3"
      screenOptions={{
        headerStyle: {backgroundColor: '#44a2a2'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'normal'},
      }}
      >

    <Stack.Screen
        name="Screen3"
        component={Screen3}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="approvedExp"
        component={approvedExp}
        initialParams={{
            data:23,
             condition:false,
             number:1
          }}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="rejectedExp"
        component={rejectedExp}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="pendingExp"
        component={pendingExp}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="draftExp"
        component={draftExp}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="allExp"
        component={allExp}
        options={{headerShown: false}}    
    />

    <Stack.Screen
        name="expDetails"
        component={expDetails}
        options={{headerShown: false}}    
    />

        <Stack.Screen
        name="addExp"
        component={addExp}
        options={{headerShown: false}}    
    />

      </Stack.Navigator>
    
    );
  }
function MyTabs() {
    return (
        <>
      
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#ffffff',
                style: {
                    //  paddingTop:5, 
                    // margin:40,
                    padding: 10,
                    backgroundColor: '#363739',
                    height: 60
                }
            }}>


            <Tab.Screen
                name="FlatListDemo" component={FlatListDemo} options={{
                    tabBarLabel: ({ focused, color, size }) => (<Text style={{ paddingBottom: 3, paddingTop: 5, color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>Home</Text>),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            // onPress={()=>console.log("SALES Is click") } 
                            name="home" size={25} color='#ffffff' />

                    ),
                }} />
            <Tab.Screen
                name="Screen2" component={Screen2} options={{
                    tabBarLabel: ({ focused, color, size }) => (<Text style={{ paddingBottom: 3, paddingTop: 5, color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>Payslip</Text>),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="newspaper-o" size={25} color='#ffffff' />

                    ),
                }} />
            <Tab.Screen
                name="Expense" component={Expense} options={{
                    tabBarLabel: ({ focused, color, size }) => (<Text style={{ paddingBottom: 3, paddingTop: 5, color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>Expense</Text>),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            // onPress={()=>console.log("SALES Is click") } 
                            name="credit-card" size={25} color='#ffffff' />

                    ),
                }} />
            <Tab.Screen
                name="Screen4" component={Screen4} options={{
                    tabBarLabel: ({ focused, color, size }) => (<Text style={{ paddingBottom: 3, paddingTop: 5, color: '#ffffff', fontSize: 11, fontWeight: 'bold' }}>Leaves</Text>),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            // onPress={()=>console.log("SALES Is click") } 
                            name="plane" size={25} color='#ffffff' />

                    ),
                }} />

           
     
        </Tab.Navigator></>

      
    );
  }


export default MyTabs;