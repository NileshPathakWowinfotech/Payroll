import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Touchable,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Route,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createStackNavigator,
  createAppContainer,
} from '@react-navigation/stack';
import forgotPassword from './details';
import selectCompany from './selectCompany';
import AppPage from '../App';
import HomePage from './home';
import HomePage2 from './home2';
import EmployerLogin from './employer';
import payslip from './payslip';
import payslipRecent from './payslipRecent';
import payslipViewRecent from './payslipViewRecent';
import payslipIndividual from './payslipIndividual';
import payslipView from './payslipView';
import attendence from './attendance';
import CompanyList from './companyList';
import profile from './profile';
import profile2 from './profile2';
import setting from './setting';
import changePassword from './changePassword';
import employeeList from './employeeList';
import employeeList2 from './employeeList2';
import companies from './companies';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
// import Spinner from 'react-native-loading-spinner-overlay';
// import FontAwesome, {
//   SolidIcons,
//   RegularIcons,
//   BrandIcons,
// } from 'react-native-fontawesome';
 //import Icon from 'react-native-vector-icons/FontAwesome';

import pendingExp from './pendingExp';
import approvedExp from './approvedExp';
import rejectedExp from './rejectedExp';
import draftExp from './draftExp';
import allExp from './allExp';
import expDetails from './expDetails';
import addExpense from './addExp';
import editExpense from './editExp';
import approveExpDetails from './approveExpDetails';
import BottomTabs from './BottomNavigator';
import expsManagement from './Employer/exoenseManagement'
import addExpByEmployes from './Employer/expAddedByEmpl'
import singleEmpSummary from './Employer/signgleEmpSummary';
import pendingExpense from './Employer/pendingExpense';
import employerFooter from './Employer/employerFooter';
import expAction  from './Employer/expAction';
const Stack = createStackNavigator();
const MainScreen = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('userDetails').then((res) => {
      var result = new Array();
      result = JSON.parse(res);
      console.log('Check Storage ==== ', result);
      if (result) {
        if (result.UserType === 'Employee') {
          navigation.navigate('HomeOne');
        } else if (result.UserType === 'Employer') {
          navigation.navigate('EmployerLogin');
        }
      } else {
        console.log("You Don't have login");
      }
    });
  }, []);

  let load = true;
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    dataBase: 'sandboxpre',
    icon: 'eye-slash',
    isloading: false,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });

    if (data.secureTextEntry == true) {
      data.icon = 'eye';
    } else {
      data.icon = 'eye-slash';
    }
  };

  const [loading, setLoading] = React.useState();

  const textInputChange = (val) => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const dataBaseChange = (val) => {
    if (val.length >= 1) {
      setData({
        ...data,
        dataBase: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

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

  const stop = () => {
    setData({
      ...data,
      isloading: false,
    });
  };
  const loginHandle = (userName, Password) => {
    if (
      data.username.length == 0 ||
      data.password.length == 0 ||
      data.dataBase.length == 0
    ) {
      Alert.alert('Try Again!', 'Username or password field cannot be empty.', [
        {text: 'Okay'},
      ]);
      // this.state.spinner =true;
      return;
    } else {
      let input = data.username;
      let fields = input.split('/');
      let prefix = fields[0].toLocaleLowerCase();
      let name = fields[1];
      var format = /[/]/;
      var charseT = input.match(format);
      if (charseT == null) {
        prefix = 'live';
        name = input;
      }
      if (
        prefix == 'dns' ||
        prefix == 'dev' ||
        prefix == 'live' ||
        prefix == 'sandbox4' ||
        prefix == 'sandbox5' ||
        prefix == 'sandbox2' ||
        prefix == 'sandboxpre' ||
        prefix == 'sandbox' ||
        prefix == 'dnsgroup' ||
        prefix == 'regression' ||
        (prefix == 'premaster' && name)
      ) {
        setData({
          ...data,
          isloading: true,
        });
        //  let url ="http://"+data.dataBase+".nomismasolution.co.uk/AccountREST/AccountService.svc/dns/Authorise?LoginName="+data.username+"&Password="+data.password;
        let url =
          'http://' +
          prefix +
          '.nomismasolution.co.uk/AccountREST/Accountservice.svc/' +
          prefix +
          '/AuthoriseMobileApp?LoginName=' +
          name +
          '&Password=' +
          data.password; //new API for EmployeeCode
        //let url ="http://"+prefix+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+prefix+"/AuthoriseApp?LoginName="+name+"&Password="+data.password;

        console.log('URL ==== ', url);
        fetch(url, {
          method: 'GET',
          //Request Type
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('Login Response === ', responseJson);
            setData({
              ...data,
              isloading: false,
            });
            var SampleArray = responseJson;

            console.log('response============== ', responseJson);
            if (SampleArray.IsSuccess == true) {
              // if(SampleArray.ResultInfo.UserType=='Employer' || SampleArray.ResultInfo.UserType=='Employee'){

              if (SampleArray.ResultInfo.UserType == 'Employee') {
              } else {
                SampleArray.ResultInfo.UserType = 'Employer';
              }

              console.log('User Details === ', SampleArray.ResultInfo);
              // return
              AsyncStorage.setItem(
                'userDetails',
                JSON.stringify(SampleArray.ResultInfo),
              );
              AsyncStorage.setItem('urlPrefix', prefix);
              navigation.navigate('companies');

              //   }else{

              //   //   Alert.alert('Try Again!', 'Please enable payroll employer.', [
              //   //     {text: 'Okay'}
              //   // ]);

              //   Alert.alert('', responseJson.Description, [
              //     {text: 'Okay'}
              // ]);

              //   }
            } else {
              // Alert.alert('Try Again!', 'Please enter the correct user name and password.', [
              //     {text: 'Okay'}
              // ]);

              Alert.alert('', responseJson.Description, [{text: 'Okay'}]);
            }
          })
          //If response is not in json then in error
          .catch((error) => {
            console.log('Error Message ==== ', error);
            setData({
              ...data,
              isloading: false,
            });
            Alert.alert('Try Again!', 'Something went wrong.', [
              {text: 'Okay'},
            ]);
            // console.error(error);
          });
      } else {
        Alert.alert(
          'Try Again!',
          'Please enter a valid prefix and user name.',
          [{text: 'Okay'}],
        );
      }
    }
  };

  return (
    // My Code

    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require('../images/icon.png')} />
      <Text style={{fontSize: 16, color: '#ff00aa'}}>Payroll</Text>

      <View all={0}>
        <ActivityIndicator
          animating={data.isloading}
          color="#ff00aa"
          size="large"
        />
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
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(val) => handlePasswordChange(val)}
        />

        <TouchableOpacity
          style={styles.thouchablebtn}
          onPress={updateSecureTextEntry}>
          {
            data.secureTextEntry ? (
              <Icon name="eye-slash" size={18} color="#a1a1a1" />
            ) : (
              // <FontAwesome icon={SolidIcons.smile} />
              <Icon name="eye" size={18} color="#a1a1a1" />
            )
            // <FontAwesome icon={SolidIcons.smile} />
          }
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.log_btn}
        onPress={() => {
          loginHandle(data.username, data.password);
        }}>
        <Text style={styles.btn_text}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginVertical: 10,
          color: '#ff00aa',
          textDecorationLine: 'underline',
        }}
        onPress={() => navigation.navigate('FrgotPassword')}>
        Forgot Password?
      </Text>
    </View>
  );
};

const Login = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={MainScreen}
        />
        <Stack.Screen
          name="FrgotPassword"
          options={{headerShown: false}}
          component={forgotPassword}
        />
        <Stack.Screen name="SelectCompany" component={selectCompany} />
        <Stack.Screen name="AppPage" component={AppPage} />
        <Stack.Screen
          name="HomePage"
          options={{headerShown: false}}
          component={HomePage}
        />
        <Stack.Screen
          name="HomePage2"
          options={{headerShown: false}}
          component={HomePage2}
        />
        <Stack.Screen
          name="HomeOne"
          options={{headerShown: false}}
          component={BottomTabs}
        />
        
        <Stack.Screen
          name="employerFooter"
          options={{headerShown: false}}
          component={employerFooter}
        />
        <Stack.Screen
          name="EmployerLogin"
          options={{headerShown: false}}
          component={EmployerLogin}
        />
        <Stack.Screen
          name="CompanyList"
          options={{
            title: 'Choose Company',
            headerTintColor: 'white',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#2e2f31',
              color: '#ffffff',
              headerTitleAlign: 'center',
            },
          }}
          component={CompanyList}
        />
        <Stack.Screen
          name="payslip"
          options={{
            title: 'Payslip',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={payslip}
        />
        <Stack.Screen
          name="payslipRecent"
          options={{
            title: 'Payslip',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={payslipRecent}
        />
        <Stack.Screen
          name="payslipViewRecent"
          options={{
            title: 'PayslipView',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={payslipViewRecent}
        />
        <Stack.Screen
          name="payslipIndividual"
          options={{
            title: 'Payslip',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={payslipIndividual}
        />
        <Stack.Screen
          name="payslipView"
          options={{
            title: 'PayslipView',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={payslipView}
        />
        <Stack.Screen
          name="attendence"
          options={{
            title: 'Annual Leave',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={attendence}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={profile}
        />
        <Stack.Screen
          name="profile2"
          options={{
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={profile2}
        />
        <Stack.Screen
          name="setting"
          options={{
            title: 'Settings',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={setting}
        />
        <Stack.Screen
          name="Change_Password"
          options={{
            title: 'Change Password',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={changePassword}
        />
        <Stack.Screen
          name="employeeList"
          options={{
            title: 'Employees',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={employeeList}
        />
        <Stack.Screen
          name="employeeList2"
          options={{
            title: 'Employees',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={employeeList2}
        />
        <Stack.Screen
          name="companies"
          options={{
            title: 'Choose Company',
            headerTintColor: 'white',
            headerLeft: null,
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={companies}
        />
        <Stack.Screen
          name="pendingExp"
          options={{
            title: 'Pending Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={pendingExp}
        />
        <Stack.Screen
          name="approvedExp"
          options={{
            title: 'Approved Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={approvedExp}
        />
        <Stack.Screen
          name="rejectedExp"
          options={{
            title: 'Rejected Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={rejectedExp}
        />
        <Stack.Screen
          name="draftExp"
          options={{
            title: 'Draft',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={draftExp}
        />
        <Stack.Screen
          name="allExp"
          options={{
            title: 'Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={allExp}
        />
        <Stack.Screen
          name="expDetails"
          options={{
            title: 'Rejected Expense Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={expDetails}
        />

        
<Stack.Screen
          name="addExpense"
          options={{
            title: 'Add Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={addExpense}
        />
        
        <Stack.Screen
          name="editExpense"
          options={{
            title: 'Edit Expense',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={editExpense}
        />
        <Stack.Screen
          name="approveExpDetails"
          options={{
            title: 'Expense Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={approveExpDetails}
        />

      <Stack.Screen
          name="expsManagement"
          options={{
            title: 'Expense Management',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={expsManagement}
        />

    <Stack.Screen
          name="addExpByEmployes"
          options={{
            title: 'Expense Management',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={addExpByEmployes}
        />

      <Stack.Screen
          name="singleEmpSummary"
          options={{
            title: 'Expense Management',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#2e2f31'},
          }}
          component={singleEmpSummary}
        />

      <Stack.Screen
                name="pendingExpense"
                options={{
                  title: 'Pending Expense',
                  headerTintColor: 'white',
                  headerStyle: {backgroundColor: '#2e2f31'},
                }}
                component={pendingExpense}
      />

      <Stack.Screen
                name="expAction"
                options={{
                  title: 'Expense Details',
                  headerTintColor: 'white',
                  headerStyle: {backgroundColor: '#2e2f31'},
                }}
                component={expAction}
      />
      </Stack.Navigator>

      
    </NavigationContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    // backgroundColor: '#ff00aa',
    backgroundColor: '#fff',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometext: {
    color: '#fff',
    fontSize: 18,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#000',
    height: 40,
    alignItems: 'stretch',
  },

  login: {
    margin: 2,
    paddingBottom: 3,
  },
  stop: {
    margin: 3,
    paddingBottom: 2,
  },
  tinyLogo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  button: {
    width: 300,
    margin: 14,
  },
  signup: {
    textAlign: 'center',
  },

  log_btn: {
    width: '80%',
    backgroundColor: '#ff00aa',
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 20,
    height: 45,
    borderWidth: null,
    textAlign: 'center',
  },

  btn_text: {
    color: '#ffffff',
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 18,
  },

  textBoxcontainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  thouchablebtn: {
    position: 'absolute',
    right: 35,
    width: 35,
    height: 40,
    padding: 2,
    paddingVertical: 10,
  },
});
