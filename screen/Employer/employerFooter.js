import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screen3 from '../Screen3';
import Screen4 from '../Screen4';
import {TouchableOpacity} from 'react-native-gesture-handler';
import payslipRecent, {PaySlipRecentStack} from '../payslipRecent';
import payslipIndividual, {PaySlipStack} from '../payslipIndividual';
import payslipView from '../payslipView';
// import payslipRecent from './payslipRecent';

const Tab = createBottomTabNavigator();
// var homeIcon = require('././images/bottomicon/app_icns_Home.png');

var homeIcon = require('../../images/bottomicon/app_icns_Home.png');

var payslipIcon = require('../../images/bottomicon/app_icns_payslip.png');
var expenseIcon = require('../../images/bottomicon/app_icns_expense.png');
var leaveIcon = require('../../images/bottomicon/app_icns_Leave.png');
var homeIcon_inactive = require('../../images/bottomicon/app_icns_HomeWhite.png');
var payslipIcon_inactive = require('../../images/bottomicon/app_icns_payslipwhite.png');
var expenseIcon_inactive = require('../../images/bottomicon/app_icns_Expenswhite.png');
var leaveIcon_inactive = require('../../images/bottomicon/app_icns_leavewhite.png');
var homeFontColor = '#ff00aa';
var payslipFontColor = '#ffffff';
var expenseFontColor = '#ffffff';
var leaveFontColor = '#ffffff';

function employerFooter() {
  // abcimg = "../images/bottomicon/app_icns_HomeWhite.png";
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#ffffff',
        style: {
          padding: 10,
          backgroundColor: '#363739',
          height: 60,
        },
      }}
      initialRouteName={payslipRecent}>
      <Tab.Screen
        name="payslipRecent"
        component={PaySlipRecentStack}
        options={{
          //component Name comes from payslipRecent for BottomBar
          tabBarLabel: ({focused}) => (
            <Text style={[{color: focused ? homeFontColor : leaveFontColor}]}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Image style={{width: 32, height: 32}} source={homeIcon} />
              ) : (
                <Image
                  style={{width: 32, height: 32}}
                  source={homeIcon_inactive}
                />
              )}
            </>
          ),
        }}
      />

      <Tab.Screen
        name="payslipIndividual"
        //component Name comes from payslipIndividual for BottomBar
        component={PaySlipStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[{color: focused ? homeFontColor : leaveFontColor}]}>
              Payslip
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Image style={{width: 32, height: 32}} source={payslipIcon} />
              ) : (
                <Image
                  style={{width: 32, height: 32}}
                  source={payslipIcon_inactive}
                />
              )}
            </>
          ),
        }}
      />
      
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[{color: focused ? homeFontColor : leaveFontColor}]}>
              Expense
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Image style={{width: 32, height: 32}} source={expenseIcon} />
              ) : (
                <Image
                  style={{width: 32, height: 32}}
                  source={expenseIcon_inactive}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen 
        name="Screen4"
        component={Screen4}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[{color: focused ? homeFontColor : leaveFontColor}]}>
              Leaves
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Image style={{width: 32, height: 32}} source={leaveIcon} />
              ) : (
                <Image
                  style={{width: 32, height: 32}}
                  source={leaveIcon_inactive}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default employerFooter;
