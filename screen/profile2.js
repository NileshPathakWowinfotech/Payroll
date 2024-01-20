import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ToastAndroid } from 'react-native';
import Home from './home';
import { NavigationContainer, NavigationInjectedProps, withNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Searchbar,
  TouchableOpacity,
  h1,
  TextInput, Button, Alert, ActivityIndicator
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';
// import Toast from 'react-native-simple-toast';



export default App = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('');
  const [title, setTitle] = useState('');

  const [dropDownEnable, setDropDownEnable] = useState(true);

  const [userDetails, setuserDetail] = React.useState({});
  const [shouldShow, setShouldShow] = useState(false);
  const [IsW1M1, setIsW1M1] = React.useState(false);

  const [data, setData] = React.useState({
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    address2: '',
    address3: '',
    address4: '',
    country: '',
    foreignCountry: '',
    postalCode: '',
    phone: '',
    email: '',
    niNumber: '',
    department: '',
    bankname: '',
    accountnumber: '',
    sortcode: '',
    taxcode: '',
    payslippwd: '',
    IsABritish: -1,
    niStatus: false,
    maxDate: new Date(),
    isloading: false,

  });

  const Stack = createStackNavigator();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    let d = moment(selectedDate).format("DD/MM/YYYY");
    data.dob = d;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };




  const isValidPostcode = (p) => {
    var postcodeRegEx = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/
    return postcodeRegEx.test(p.trim());
  }


  const isValidTaxCode = (TaxCodeVal) => {

    var Stringstatus = null;
    var str = TaxCodeVal;
    if (str.length == 0) {
      ToastAndroid.show('Error! Please enter valid tax code.', ToastAndroid.SHORT);
      return false;
    }

    //var matchedPosition = Taxcodeid.search(/[a-z]/i);

    var charfirst = str.charAt(0); //First Letter of the string
    var charLast = str.charAt(str.length - 1);//Last Letter of the string
    var strmid = str.slice(1, str.length - 1); // Middle of the string
    var strmidwhens = str.slice(2, str.length - 1); // Middle of the string In Case of S



    var arr = ['0T', 'BR', 'D0', 'D1', 'NT', 'S0T', 'SBR', 'SD0', 'SD1', 'SD2', 'CBR', 'CD0', 'CD1', 'C0T', '0Y'];

    for (var i = 0; i < arr.length; i++) {
      var name = arr[i];
      if (name == str.toLowerCase() || name == str.toUpperCase()) {
        Stringstatus = 'Exist';
        break;
      }
      else {
        Stringstatus = 'NotExist';
      }
    }



    if (Stringstatus == "NotExist") {

      if (str.match(/[KkLlMmNnTtSsCcYy]/i)) {

        if (charfirst.match(/[Ss]/i)) {

          if ((charLast.match(/[LlMmNnTtYy]/i))) {
            if (str.charAt(1).match(/[Kk]/i)) {
              ToastAndroid.show("Last Character Should be L when M Or 2nd Character Should be K", ToastAndroid.SHORT);
              //('[id*=myspantxt]').css("display", "inline-block");  
              // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
              return false;
            }
          }
          else if (!(str.charAt(1).match(/[Kk]/i))) {
            ToastAndroid.show("Last Character Should be L when M Or 2nd Character Should be K", ToastAndroid.SHORT);
            //$('[id*=myspantxt]').css("display", "inline-block");
            // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
            return false;
          }
          else if (str.charAt(1).match(/[Kk]/i)) {
            if (charLast.match(/[A-Z]/i)) {
              ToastAndroid.show("Condition is not matched", ToastAndroid.SHORT);

              //$('[id*=myspantxt]').css("display", "inline-block");
              // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
              return false;
            }
          }

          return true;
        }
        //Allow Welsh tax codes E.g: C1250L,C45L,C145L,CBR,NT,CD0 & CD1 etc.
        else if (charfirst.match(/[Cc]/i)) {

          if (!charLast.match(/[LlMmNnTt]/i) && !str.charAt(1).match(/[Kk]/i)) {
            ToastAndroid.show("Last Character Should be L when C will the Prefix", ToastAndroid.SHORT);
            //$('[id*=myspantxt]').css("display", "inline-block");
            //document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
            return true;
          }
        }
        else if (charfirst.match(/[Kk]/i)) {
          if (charLast.match(/[KkLlMmNnTtSsCcYy]/i)) {
            ToastAndroid.show("Both Prefix and Suffix can't be Alphabet", ToastAndroid.SHORT);
            //$('[id*=myspantxt]').css("display", "inline-block");
            // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
            return true;
          }
        }
        else if (charfirst.match(/[LlMmNnTt]/i)) {
          ToastAndroid.show("Prefix can be Letter K only", ToastAndroid.SHORT);
          // $('[id*=myspantxt]').css("display", "inline-block");
          // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
          return true;
        }
        else if (charLast.match(/[KkLlMmNnTtSsCcYy]/i)) {
          if (!charLast.match(/[LlMmNnTtYy]/i)) {
            //if (charfirst.match(/[a-z]/i)) {
            ToastAndroid.show("Both Prefix and Suffix can't be Alphabet except S, C K", ToastAndroid.SHORT);
            return true;
          }
          else
            if (charLast.match(/[Kk]/i)) {
              ToastAndroid.show("Suffix can't be Letter K", ToastAndroid.SHORT);
              // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
              return true;
            }
          // if (!isValidTaxCode(data.taxcode)) {
          //   Alert.alert('Tax Code Example!', '1257L', [
          //     { text: 'Okay' }
          //   ]);

          // }

        }

        return true;
      }

      else {
        ToastAndroid.show("Add atleast one alphabet as Prefix or Suffix.Example! '1257L'", ToastAndroid.SHORT);
        // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
        return false;
      }
      if ((strmid.match(/[A-Z]/i)) && (!charfirst.match(/[Ss]/i)) && !str.charAt(1).match(/[Kk]/i)) {
        ToastAndroid.show("Don't add letter in the middle", ToastAndroid.SHORT);
        // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
        return false;
      }
      else if (charfirst.match(/[Ss]/i) && strmidwhens.match(/[A-Z]/i)) {
        ToastAndroid.show("Don't add lette``r in the middle", ToastAndroid.SHORT);
        // document.getElementById('ctl00_ctl00_ParentContent_cPH_tbContainer_tpPayrollEmployee_HiddenTaxCodeCheck').value = "1";
        return false;
      }
    }
    else {
      return true;
    }
  }


  const niNumberValid = (ninum) => {
    if (data.niNumber.length < 9) {
      ToastAndroid.show('Wrong Input! Please enter correct NI Number.', ToastAndroid.SHORT);

    }
    else if (ninum.length == 9) {
      var prefix = ninum.substring(0, 2);
      var sufix = ninum.substring(2, 8);
      var prefix1 = ninum.substring(0, 1);
      var prefix2 = ninum.substring(1, 2);
      var character = ninum.charAt(8)
      var letters = /^[A-Za-z]+$/;
      var check = prefix.match(letters);
      var char = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      var lastNum = ninum.substring(2);

      var rniNum = ninum.split(" ").join("");


      if (isNaN(sufix) || char.test(rniNum) || check == null || prefix2 == 'O' || prefix2 == 'o' || prefix2 == 'D' || prefix2 == 'd' || prefix2 == 'F' || prefix2 == 'f' || prefix2 == 'I' || prefix2 == 'i' || prefix2 == 'Q' || prefix2 == 'q' || prefix2 == 'U' || prefix2 == 'u' || prefix2 == 'V' || prefix2 == 'v' || prefix1 == 'D' || prefix1 == 'd' || prefix1 == 'F' || prefix1 == 'f' || prefix1 == 'I' || prefix1 == 'i' || prefix1 == 'Q' || prefix1 == 'q' || prefix1 == 'U' || prefix1 == 'u' || prefix1 == 'V' || prefix1 == 'v' || prefix == 'ZZ' || prefix == 'zz' || prefix == 'Zz' || prefix == 'zZ' || prefix == 'TN' || prefix == 'tn' || prefix == 'Tn' || prefix == 'tN' || prefix == 'NT' || prefix == 'nt' || prefix == 'Nt' || prefix == 'nT' || prefix == 'NK' || prefix == 'nk' || prefix == 'Nk' || prefix == 'nK' || prefix == 'KN' || prefix == 'kn' || prefix == 'Kn' || prefix == 'kN' || prefix == 'bg' || prefix == 'BG' || prefix == 'bG' || prefix == 'Bg' || prefix == 'gb' || prefix == 'GB' || prefix == 'Gb' || prefix == 'gB') {
        data.niStatus = false;
        // Alert.alert('NI Number', 'Not Valid.', [
        //   {text: 'Okay'}
        // ]);


      }
      else {

        if (character == 'A' || character == 'B' || character == 'C' || character == 'D') {
          data.niStatus = true;
        } else {
          data.niStatus = false;
        }

      }

      if (data.niNumber.length < 9 || data.niStatus == false) {
        ToastAndroid.show('Wrong Input! Please enter Valid NI Number .', ToastAndroid.SHORT);
      }
    }

  };

  //@ManoharSahu
  //validation for BankName ,accountNo and sort code
  const handleBankName = (banknameval, sortcodeval, accountnumberval) => {

    if (accountnumberval != "" && accountnumberval.length != 8) {
      ToastAndroid.show('Please enter 8 digits Account Number.', ToastAndroid.SHORT);
      return false;
    }
    if (sortcodeval != "" && sortcodeval.length != 6) {
      ToastAndroid.show('Please enter 6 digits Sort Code.', ToastAndroid.SHORT);
      return false;
    }
    var FieldName = "";
    if ((banknameval != "" || sortcodeval != "" || accountnumberval != "")) {

      if (banknameval == "" || sortcodeval == "" || accountnumberval == "") {

        if (banknameval == "") {
          FieldName = ",Bank Name";
        }
        if (accountnumberval == "") {
          FieldName = FieldName + "," + "Account Number";
        }
        if (sortcodeval == "") {
          FieldName = FieldName + "," + "Sort Code";
        }
        FieldName = FieldName.substring(1, 25);
        ToastAndroid.show("Please fill all required field " + FieldName, ToastAndroid.SHORT);
        return false;

      }

    }

    return true;
  };

  const handeleFName = (firstNameval) => {
    if (firstNameval != "") {
      var firstnameptn = /^(?!\s)[-a-zA-Z ]*$/;
      if (!firstnameptn.test(firstNameval.trim())) {
        ToastAndroid.show('Please enter valid First name.', ToastAndroid.SHORT);
        return false;
      }

    }
    return true;

  }
  const handeleLastName = (lastNameval) => {
    if (lastNameval != "") {
      var lastnameptn = /^(?!\s)[-a-zA-Z ]*$/;
      if (!lastnameptn.test(lastNameval.trim())) {
        ToastAndroid.show('Please enter valid Last name.', ToastAndroid.SHORT);
        return false;
      }

    }
    return true;

  }
  const handleForeignCountry = (foreignval) => {
    if ((data.country == "Outside of UK") && foreignval == "") {
      ToastAndroid.show('Please enter Foreign Country name.', ToastAndroid.SHORT);
      return false;
    }


    else if (foreignval != "") {
      var lastnameptn = /^(?!\s)[-a-zA-Z ]*$/;
      if (!lastnameptn.test(foreignval.trim()))
      // if (foreignval !="" || foreignval =="")
      {
        ToastAndroid.show('Please enter valid Country name.', ToastAndroid.SHORT);
        return false;
      }
    }
    return true;
  }

  const isValidInput = (input) => {
    if (/^[\s]|([-&/\s])$/.test(input)) {
      return false;
    }
    return /^[A-Za-z-&/\d\s]*$/.test(input);
  };

  const findSpecialCharacterPosition = (inputString) => {
    const regex = /[^a-zA-Z0-9 &\/\-]/;

    //find the position of the first occurence of the special character
    const match = inputString.search(regex);
    const len = inputString.length
    if (match < len - 1 && match >= 0) {
      return true
    } else {
      return false
    }

  };

  const handleAddress = (address1val) => {
    if (address1val == "") {
      ToastAndroid.show('Error! Please enter Address 1.', ToastAndroid.SHORT);
      return false;
    }
    else if (address1val != "") {
      if (findSpecialCharacterPosition(address1val.trim())) {
        ToastAndroid.show('Only the following special characters can be used: / - &', ToastAndroid.SHORT);
        return false;
      } else {
        if (!isValidInput(address1val.trim())) {
          // ToastAndroid.show('Error:Use only/,-,or&.No special character should be at the end', ToastAndroid.SHORT);
          ToastAndroid.show('Addresses cannot end with a special character.', ToastAndroid.SHORT);
          return false;
        }
      }
    }
    return true;
  }

  const handleAddress2 = (address2val) => {
    if (address2val == "") {
      ToastAndroid.show('Error! Please enter Address 2.', ToastAndroid.SHORT);
      return false;
    } else if (address2val != "") {
      if (findSpecialCharacterPosition(address2val.trim())) {
        ToastAndroid.show('Only the following special characters can be used: / - &', ToastAndroid.SHORT);
        return false;
      } else {
        if (!isValidInput(address2val.trim())) {
          // ToastAndroid.show('Error:Use only/,-,or&.No special character should be at the end', ToastAndroid.SHORT);
          ToastAndroid.show('Addresses cannot end with a special character.', ToastAndroid.SHORT);
          return false;
        }
      }
    }
    return true;
  }

  const handleCity = (cityval) => {
    if (cityval != "") {
      if (findSpecialCharacterPosition(cityval.trim())) {
        ToastAndroid.show('Only the following special characters can be used: / - &', ToastAndroid.SHORT);
        return false;
      } else {
        if (!isValidInput(cityval.trim())) {
          // ToastAndroid.show('Error:Use only/,-,or&.No special character should be at the end', ToastAndroid.SHORT);
          ToastAndroid.show('Addresses cannot end with a special character.', ToastAndroid.SHORT);
          return false;
        }
      }
    }
    return true;
  }
  const handleCounty = (countyval) => {
    if (countyval != "") {
      if (findSpecialCharacterPosition(countyval.trim())) {
        ToastAndroid.show('Only the following special characters can be used: / - &', ToastAndroid.SHORT);
        return false;
      } else {
        if (!isValidInput(countyval.trim())) {
          // ToastAndroid.show('Error:Use only/,-,or&.No special character should be at the end', ToastAndroid.SHORT);
          ToastAndroid.show('Addresses cannot end with a special character.', ToastAndroid.SHORT);
          return false;
        }
      }
    }
    return true;
  }


  const handlePostCode = (postcodeval) => {
    if (postcodeval == "") {
      ToastAndroid.show('Error! Please enter Postcode.', ToastAndroid.SHORT);
      return false;
    }
    return true;
  }






  useEffect(() => {
    AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        var result = new Array();
        result = JSON.parse(res);
        const url = "http://" + ress + ".nomismasolution.co.uk/AccountREST/AccountService.svc/" + ress + "/" + result.AuthToken + "/" + result.UserCode + "/4/GetUserDetailsListApp";
        console.log("URL ===== ", url)
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            console.log("User details Response ===== ", json.ResultInfo[0]);
            data.firstName = json.ResultInfo[0].FirstName;
            data.title = json.ResultInfo[0].Title;
            data.lastName = json.ResultInfo[0].LastName;
            data.gender = json.ResultInfo[0].Gender;
            setGender(json.ResultInfo[0].Gender);
            data.dob = moment(json.ResultInfo[0].DOB, "DD/MM/YYYY").format("DD/MM/YYYY");
            data.address = json.ResultInfo[0].Address1;
            data.address2 = json.ResultInfo[0].Address2;
            data.address3 = json.ResultInfo[0].Address3;
            data.address4 = json.ResultInfo[0].Address4;
            data.country = json.ResultInfo[0].Country;
            // data.country= typeof(json.ResultInfo[0].Country) != "undefined" ? json.ResultInfo[0].Country:"-1";
            if (data.country == "Outside of UK") {
              setShouldShow(true);
            }
            data.foreignCountry = json.ResultInfo[0].ForeignCountry;
            data.postalCode = json.ResultInfo[0].PostCode;
            data.phone = json.ResultInfo[0].Phone;
            data.email = json.ResultInfo[0].Email;
            data.niNumber = json.ResultInfo[0].NINumber;
            data.department = json.ResultInfo[0].DeptName;
            data.bankname = json.ResultInfo[0].BankName;
            data.accountnumber = json.ResultInfo[0].BankAccountCode;
            data.sortcode = json.ResultInfo[0].BankAccountSortCode;
            data.taxcode = json.ResultInfo[0].TaxCode;
            data.payslippwd = json.ResultInfo[0].PayslipPassword;

            data.IsABritish = json.ResultInfo[0].IsABritish;
            setIsW1M1(json.ResultInfo[0].IsW1M1)
            setuserDetail(json.ResultInfo[0])

            // setData(json.ResultInfo)

          })
          .catch((error) => console.error(error))
        // .finally(() => setLoading(false));

      })
    })
  }, []);


  // function validGender(g){
  const validGender = (g) => {
    console.log("Gender validation === ", g, " data.titl ==", data.title);

    if (g == 'F' || g == 'M') {
      console.log("Enter In IF condition ")
      if (data.title == 'Dr.' && g == 'S') {
        console.log("Title is Dr.");
        ToastAndroid.show('Wrong Input! Please select a valid gender.', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ])

        return false;

      }

      if (data.title == 'Dr.' && g != 'S') {
        console.log("Title is Dr is OKAy .", g);
        return true;
      }

      if (data.title == 'Prof.' && g == 'S') {
        console.log("Title is Prof.");
        ToastAndroid.show('Wrong Input! Please select a valid gender dr.', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ])

        return false;

      }

      if (data.title == 'Prof.' && g != 'S') {
        console.log("Title is Prof is OKAy .", g);
        return true;
      }




      if (data.title == 'Mr.' && g == 'F') {
        ToastAndroid.show('Wrong Input! Please select a valid gender.', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ])
        return false;
      }

      if (data.title == 'Mr.') {

        if (g == "M") {
          return true
        } else {
          ToastAndroid.show('Wrong Input! Please select a valid gender.', ToastAndroid.SHORT, [
            { text: 'Okay' }
          ])
        }

        return true;
      }

      if (data.title == 'Mrs.' || data.title == 'Miss' || data.title == 'Ms.') {

        if (g == "F") {
          return true
        } else {
          ToastAndroid.show('Wrong Input! Please select a valid gender.', ToastAndroid.SHORT, [
            { text: 'Okay' }
          ])
          return false
        }


      }

    } else {
      //  Toast.show('This is a toast.');
      ToastAndroid.show('Wrong Input! Please select a valid gender.', ToastAndroid.SHORT, [
        { text: 'Okay' }
      ]);
      return false;
    }


    // data.gender =item.value

  }


  const profileUpdate = () => {

    if (!handeleFName(data.firstName)) {
      return;
    }

    if (!handeleLastName(data.lastName)) {
      return;
    }

    if (!handlePostCode(data.postalCode)) {
      return;
    }


    if (!handleAddress(data.address)) {
      return;
    }

    if (!handleAddress2(data.address2)) {
      return;
    }
    if (!handleCity(data.address3)) {
      return;
    }
    if (!handleCounty(data.address4)) {
      return;
    }

    if (!handleForeignCountry(data.foreignCountry)) {
      return;
    }

    if (!handleBankName(data.bankname, data.sortcode, data.accountnumber)) {
      return;
    }

    if (data.niNumber) {
      niNumberValid(data.niNumber.replace(/ +/g, ""));
    } else {
      data.niStatus = true;
    }


    if (validGender(data.gender) && data.firstName && data.lastName && data.gender && data.dob && data.address && data.address2 && data.postalCode && validateEmail(data.email) && data.niStatus == true && isValidPostcode(data.postalCode.toUpperCase()) && isValidTaxCode(data.taxcode.toUpperCase()) && data.address2) {


      AsyncStorage.getItem('urlPrefix').then(ress => {
        AsyncStorage.getItem('userDetails').then(res => {
          data.isloading = true;

          var result = new Array();
          result = JSON.parse(res);
          const url = "http://" + ress + ".nomismasolution.co.uk/AccountREST/AccountService.svc/" + ress + "/" + result.AuthToken + "/" + result.UserCode + "/4/UpdateUserDetailsApp";
          console.log("PostURL==" + url);
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify({
              Title: data.title,
              FirstName: data.firstName,
              LastName: data.lastName,
              Gender: data.gender,
              DOB: moment(data.dob, "DD/MM/YYYY").format("MM/DD/YYYY"),
              Address1: data.address,
              Address2: data.address2,
              Address3: data.address3,
              Address4: data.address4,
              Country: data.country,
              PostCode: data.postalCode.toUpperCase(),
              Email: data.email,
              Phone: data.phone,
              NINumber: data.niNumber,
              DeptName: data.department,
              BankName: data.bankname,
              BankAccountCode: data.accountnumber,
              BankAccountSortCode: data.sortcode,
              TaxCode: data.taxcode.toUpperCase(),
              PayslipPassword: data.payslippwd,
              IsABritish: data.IsABritish,
              ForeignCountry: data.foreignCountry,//(data.country=='Outside of UK' || selectcountry=='Outside of UK' )?data.foreignCountry:'',
              IsW1M1: IsW1M1
            })
          })
            .then((response) => response.json())
            .then((json) => {
              data.isloading = false;
              // setData(json.ResultInfo)
              if (json.IsSuccess) {
                navigation.navigate('HomeOne');
                ToastAndroid.show('Successfull! Your details successfully updated.', ToastAndroid.SHORT, [
                  { text: 'Okay' }
                ]);
              } else {
                ToastAndroid.show('OOPS! Something Went wrong.', ToastAndroid.SHORT, [
                  { text: 'Okay' }

                ]);

              }

            })
            .catch((error) => {
              data.isloading = false;
              console.error(error)
            }
            )
          // ).finally(() => setLoading(false));

        })
      })


    } else {



      if (!validateEmail(data.email)) {
        ToastAndroid.show('Wrong Input! Please enter Valid Email.', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ]);
      }

      // if (data.niNumber.length < 9 || data.niStatus == false) {
      //   Alert.alert('Wrong Input!', 'Please enter correct NI Number.', [
      //     { text: 'Okay' }
      //   ]);
      // }
      //  if (data.bankname.length > 0 && !isValidbankName(data.bankname)) {  //change place of this popup
      //    Alert.alert('Wrong Input!', 'Please enter valid Bank Name.', [
      //      { text: 'Okay' }
      //    ]);
      //  }

      if (!isValidPostcode(data.postalCode)) {
        ToastAndroid.show('Post Code Example! PO1 3AX, SE19 2LQ, E18 2HB,AA1 1AA', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ]);
      }

      else if (!data.firstName || !data.lastName || !data.gender || !data.dob || !data.address || !data.address2 || !data.postalCode || !data.taxcode) {
        ToastAndroid.show('Wrong Input! Please enter all required field.', ToastAndroid.SHORT, [
          { text: 'Okay' }
        ]);
      }
      //  if (!data.address2){
      //   Alert.alert('Error!', 'Please enter address 2.', [
      //     { text: 'Okay' }
      //   ]);
      // }
    }
  }
  items = [
    { label: 'Mr.', value: 'Mr.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
    { label: 'Mrs.', value: 'Mrs.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
    { label: 'Miss', value: 'Miss', icon: () => <Icon name="user" size={18} color="r" /> },
    { label: 'Ms.', value: 'Ms.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
    { label: 'Dr.', value: 'Dr.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
    { label: 'Prof.', value: 'Prof.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
  ];

  const validateEmail = (email) => {
    console.log("EMAIL ======================================= ", email);
    if (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log("EMAIl ============= ", re.test(email));
      return re.test(email);
    } else {
      return true
    }
  }

  const dateSet = (date) => {

  }


  items2 = [
    { label: 'Select Gender', value: 'S', icon: () => <Icon name="genderless" size={18} color="#ff00aa" /> },
    { label: 'Male', value: 'M', icon: () => <Icon name="mars" size={18} color="#ff00aa" /> },
    { label: 'Female', value: 'F', icon: () => <Icon name="venus" size={18} color="#ff00aa" /> },
    // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
  ]

  countrylist=[
    { label: 'Select', value: -1 },
    { label: 'British', value: 1 },
    { label: 'Non-British', value: 0 },
    // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
  ]

  return (
    <View style={styles.container}>
      <ScrollView>



        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

          <Text style={styles.labelwidth}>Title:</Text>

          {/* <DropDownPicker
            items={[
              { label: 'Mr.', value: 'Mr.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
              { label: 'Mrs.', value: 'Mrs.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
              { label: 'Miss', value: 'Miss', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
              { label: 'Ms.', value: 'Ms.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
              { label: 'Dr.', value: 'Dr.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
              { label: 'Prof.', value: 'Prof.', icon: () => <Icon name="user" size={18} color="#ff00aa" /> },
            ]}
            defaultValue={data.title}
            containerStyle={{ height: 40, width: "65%", marginLeft: 30, marginVertical: 15 }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff', }}
            onChangeItem={(item) => {
              data.title = item.value

              console.log("Value ======== ", data.title);
              if (data.title == 'Mr.') {
                data.gender = 'M'
                setGender('M');
              }
              else if (data.title == 'Mrs.' || data.title == 'Miss' || data.title == 'Ms.') {
                data.gender = 'F'
                setGender('F');

              } else if (data.title == 'Dr.') {
                data.gender = 'S'
                setGender('S');

              } else if (data.title == 'Prof.') {
                data.gender = 'S'
                setGender('S');
              }


              console.log("Gender Set ========= ", data.gender, " gender== ", gender);

            }
            }
          /> */}


          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconColor='red'
            iconStyle={styles.iconStyle}
            data={items}


            maxHeight={300}

            labelField="label"
            valueField="value"
            placeholder=""
            value={data.title}
            onChange={item => {
              data.title = item.value
              data.title = item.value

              console.log("Value ======== ", data.title);
              if (data.title == 'Mr.') {
                data.gender = 'M'
                setGender('M');
              }
              else if (data.title == 'Mrs.' || data.title == 'Miss' || data.title == 'Ms.') {
                data.gender = 'F'
                setGender('F');

              } else if (data.title == 'Dr.') {
                data.gender = 'S'
                setGender('S');

              } else if (data.title == 'Prof.') {
                data.gender = 'S'
                setGender('S');
              }


              console.log("Gender Set ========= ", data.gender, " gender== ", gender);

            }

            }
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          // )}
          />


        </View>
        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>First Name:<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            keyboardType='default'
            onChangeText={(item) => data.firstName = item}

            // onChangeText={(e) => {
            //   let value = e
            //   value = value.replace(/[^A-Za-z]/ig, '')
            //   console.log("Value === ",value)
            //   data.firstName =value 
            // }}
            defaultValue={data.firstName}
            underlineColorAndroid='rgba(0,0,0,0)' placeholder='First Name' style={styles.inputBox}
            maxLength={30}
          />
        </View>
        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>Last Name:<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput

            defaultValue={data.lastName}
            onChangeText={(item) => data.lastName = item}
            style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Last Name' maxLength={30} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: 10 }}>
          <Text style={styles.labelwidth}>Gender:<Text style={{ color: 'red' }}>*</Text></Text>

          {/* <DropDownPicker
            items={[
              { label: 'Select Gender', value: 'S', icon: () => <Icon name="genderless" size={18} color="#ff00aa" /> },
              { label: 'Male', value: 'M', icon: () => <Icon name="mars" size={18} color="#ff00aa" /> },
              { label: 'Female', value: 'F', icon: () => <Icon name="venus" size={18} color="#ff00aa" /> },
              // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
            ]}
            defaultValue={data.gender}
            containerStyle={{ height: 40, width: "65%", marginLeft: 30, marginVertical: 15, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              data.gender = item.value;

              if (data.title == 'Prof.' || data.title == 'Dr.') {

              } else if (data.gender == 'M') {
                data.title = 'Mr.'
                setTitle('Mr.');
              } else if (data.gender == 'F') {
                data.title = 'Mrs.'
                setTitle('Mrs.');

              }


              validGender(data.gender);
              return;

            }
            }

          /> */}

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconColor='red'
            iconStyle={styles.iconStyle}
            data={items2}


            maxHeight={300}

            labelField="label"
            valueField="value"
            placeholder=""
            value={data.gender}
            onChange={item => {


              data.gender = item.value;

              if (data.title == 'Prof.' || data.title == 'Dr.') {

              } else if (data.gender == 'M') {
                data.title = 'Mr.'
                setTitle('Mr.');
              } else if (data.gender == 'F') {
                data.title = 'Mrs.'
                setTitle('Mrs.');

              }


              validGender(data.gender);
              return;





            }

            }
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          // )}
          />

        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>DOB:<Text style={{ color: 'red' }}>*</Text></Text>

          <View style={styles.inputBox}><Text style={{ paddingVertical: 10 }}>{data.dob}</Text>
            <View style={styles.thouchablebtn}><Icon name='calendar' onPress={showDatepicker} size={18} color="#a1a1a1" /></View>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.labelwidth}>Nationality:<Text style={{ color: 'red' }}></Text></Text>
          <DropDownPicker
            items={[
              { label: 'Select', value: -1 },
              { label: 'British', value: 1 },
              { label: 'Non-British', value: 0 },
              // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
            ]}
            defaultValue={data.IsABritish}
            containerStyle={{ height: 40, width: "65%", marginLeft: 30, marginVertical: 15, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => data.IsABritish = item.value}
          />
        </View>


        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Address 1:<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            defaultValue={data.address}
            onChangeText={(item) => data.address = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.address = item.value} placeholder="Address 1" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>
        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Address 2:<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            defaultValue={data.address2}
            onChangeText={(item) => data.address2 = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.address2 = item.value} placeholder="Address 2" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        {/* //@manoharSahu Add fields City ,County,Country,Department,BankName,AccountNo,SortCode,Taxcode,PayslipPassword*/}

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>City</Text>
          <TextInput
            defaultValue={data.address3}
            onChangeText={(item) => data.address3 = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.address3 = item.value} placeholder='City' onChangeItem={(item) => data.city = item.value} underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>County:</Text>
          <TextInput
            defaultValue={data.address4}
            onChangeText={(item) => data.address4 = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.address4 = item.value} placeholder='County' underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.labelwidth}>Country:<Text style={{ color: 'red' }}></Text></Text>
          {/* <DropDownPicker
            items={[
              { label: 'Select', value: "-1" },
              { label: 'England', value: "England" },
              { label: 'Northern Ireland', value: "Northern Ireland" },
              { label: 'Scotland', value: "Scotland" },
              { label: 'Wales', value: "Wales" },
              { label: 'Outside of UK', value: "Outside of UK" },

              // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
            ]}
            defaultValue={data.country}
            containerStyle={{ height: 40, width: "65%", marginLeft: 27, marginVertical: 15, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              data.country = item.value

              if (data.country == "Outside of UK") {
                setShouldShow(true);
              }
              else {
                setShouldShow(false);
              }
            }
            }
          /> */}
          <DropDownPicker
            
            defaultValue={data.IsABritish}
            containerStyle={{ height: 40, width: "65%", marginLeft: 30, marginVertical: 15, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => data.IsABritish = item.value}
          />

        </View>

        <View style={styles.flexrow1}>
          {shouldShow ? (
            <><Text style={styles.labelwidth}></Text><TextInput
              defaultValue={data.foreignCountry}
              onChangeText={(item) => data.foreignCountry = item}
              maxLength={15} placeholder='Country Name' onChangeItem={(item) => data.foreignCountry = item.value} style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' /></>
          ) : null}
        </View>


        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>Post Code:<Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput

            defaultValue={data.postalCode}
            onChangeText={(item) => data.postalCode = item}
            maxLength={8} placeholder='Postal Code' onChangeItem={(item) => data.postalCode = item.value} style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>Phone:</Text>
          <TextInput
            defaultValue={data.phone}
            onChangeText={(item) => data.phone = item}
            maxLength={13} keyboardType={'phone-pad'} placeholder='Phone' onChangeItem={(item) => data.phone = item.value} style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' />


        </View>
        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>Email:</Text>
          <TextInput
            defaultValue={data.email}
            onChangeText={(item) => data.email = item}
            placeholder='Email' onChangeItem={(item) => data.email = item.value} style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' />
        </View>
        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth}>NI Number:</Text>
          {/* <TextInput autoCapitalize="sentences" autoGrow keyboardType="default"  style={styles.inputBox} /> */}

          <TextInput

            defaultValue={data.niNumber}

            onChangeText={(item) =>
              // niNumberValid(item)
              data.niNumber = item.toUpperCase()

            }
            autoCapitalize="characters"
            keyboardType="default"
            maxLength={9} style={styles.inputBox} placeholder='NI Number' underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Department:</Text>
          <TextInput
            editable={false}
            //<Text style={{ color: 'red' }}>*</Text>
            defaultValue={data.department}
            onChangeText={(item) => data.department = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.department = item.value} placeholder="Department" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Bank Name:</Text>
          <TextInput
            defaultValue={data.bankname}
            onChangeText={(item) => data.bankname = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.bankname = item.value} placeholder="Bank Name" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Account Number:</Text>
          <TextInput
            defaultValue={data.accountnumber}
            onChangeText={(item) => data.accountnumber = item}
            keyboardType="numeric"
            maxLength={8} style={styles.inputBox} onChangeItem={(item) => data.accountnumber = item.value} placeholder="Account Number" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Sort Code:</Text>
          <TextInput
            defaultValue={data.sortcode}
            onChangeText={(item) => data.sortcode = item}
            keyboardType="numeric"
            maxLength={6} style={styles.inputBox} onChangeItem={(item) => data.sortcode = item.value} placeholder="Sort Code" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Tax Code:</Text>
          <TextInput
            editable={false}
            defaultValue={data.taxcode}
            onChangeText={(item) => data.taxcode = item}
            maxLength={8} style={styles.inputBoxtaxcode} onChangeItem={(item) => data.taxcode = item.value} placeholder="Tax Code" underlineColorAndroid='rgba(0,0,0,0)' />
          {/* <View style={{alignSelf:'center',flexDirection:"row",marginLeft:5, marginRight:5,width:'35%'}}>
    <CheckBox
      checked={IsW1M1 ? true:false}
      onPress={() =>  setIsW1M1(!IsW1M1) }
      checkedColor={"#43a1a2"}
      // title={"W1/M1 basis"}
    />
    
           <Text style={{marginTop:17,color:'black',fontSize:12}}>W1/M1 basis</Text>
      </View> */}

        </View>

        <View style={styles.flexrow1}>
          <Text style={styles.labelwidth} >Payslip Password:</Text>
          <TextInput
            editable={false}
            defaultValue={data.payslippwd}
            onChangeText={(item) => data.payslippwd = item}
            maxLength={30} style={styles.inputBox} onChangeItem={(item) => data.payslippwd = item.value} placeholder="Payslip Password" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <TouchableOpacity onPress={() => profileUpdate()} style={styles.log_btn} >
          <Text style={styles.btn_text}>Update</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10

  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007173',
    paddingVertical: 30,
    color: '#ffffff',
    fontSize: 18,
    padding: 15,
  },

  onebox: {
    backgroundColor: '#ff00aa',
    textAlign: "left",
    fontSize: 24,
    color: '#ffffff',
    textAlignVertical: "center",
    marginBottom: 1,
    justifyContent: "space-evenly",
    paddingVertical: 60,
    paddingLeft: 20,
  },

  coricon: {
    fontSize: 16,
    color: '#ffffff',
  },

  CardItembg: {
    backgroundColor: '#ff00aa',
    marginBottom: 15,
    height: 70,

  },

  card_headtext: {
    fontSize: 20,
    color: '#ffffff',
    paddingLeft: 15,

  },

  cardicon: {
    fontSize: 20,
    color: '#ffffff',
  },

  headerbg: {
    backgroundColor: '#ff00aa',
  },

  labelwidth: {
    width: 120,
    marginVertical: 10,
    paddingLeft: 10,
  },
  log_btn: {
    backgroundColor: "#ff00aa",
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 10,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,

  },

  btn_text: {
    color: '#ffffff',
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 18,
  },

  inputBoxw1: {
    width: 225,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,

  },

  textBoxcontainer: {
    width: "100%",
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

  flexrow1: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#ffffff'
  },

  labelwidth: {
    width: "25%",
    marginVertical: 20,
    paddingLeft: 10,
    fontSize: 14,
  },

  inputBox: {
    width: "65%",
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    fontSize: 14,
    marginLeft: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'relative',
    backgroundColor: '#fff'

  },
  inputBoxtaxcode: {
    width: "65%",
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    fontSize: 14,
    marginLeft: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'relative',
    backgroundColor: '#fff',

  },
  thouchablebtn: {
    position: 'absolute',
    right: -4,
    width: 35,
    height: 40,
    padding: 2,
    paddingVertical: 10,
  }, dropdown: {
    color: "black",
    padding: 5,
    height: 35,
    borderRadius: 5,
    width: "67%",
    borderWidth: 1,
    borderColor: "#d3d3d3",


  },
  icon: {
    paddingLeft: 6,
    marginRight: 10,
  },
  placeholderStyle: {
    color: "black",
    paddingLeft: 10,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,

  }




});


