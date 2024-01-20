import {
  View, Text, Button, Touchable, StyleSheet, Image, TextInput, Alert, Linking,
  TouchableOpacity, ActivityIndicator, Route, ToastAndroid,TextStyle,st
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import style from './styleSheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderComponent } from './header';
import { BottomPopup } from './BottomPopup';
import { Dropdown } from 'react-native-element-dropdown';


const Screen3 = ({ route, navigation }) => {
  var pending_Count = 0;
  const [value, setValue] = useState('');
  const [taxYear, setTaxyear] = useState([]);
  const [recentExps, setRecentExps] = useState([]);
  const [expenseStatus, setExpenseStatus] = useState([]);
  const [data, setData] = useState(
    {
      taxYear: [],
      periodEnd: '',
      compnyCode: '',
      token: '',
      prefix: '',
      url: '',
      url2: '',
      url3: '',
      selectedTaxYear: '',
      userCode: '',
      resentExp: [],
      PayrollEmployeeCode: '',
      PendingStatus: [''],
      ApprovedStatus: [''],
      RejectedStatus: [''],
      DraftStatus: [''],
      AllStatus: [''],
      ApprovedExpenseDetailsArr: [],
      PendingExpenseDetailsArr: [],
      RejectedExpenseDetailsArr: []
    },

  );



  //BottomPopup
  const popuplist = [
    {
      id: 1,
      name: 'Add Leaves',
      //action:()=> navigation.navigate('profile2'),
      action: () => ToastAndroid.show('Add Leaves .', ToastAndroid.SHORT),
      icon: <Image style={{ width: 40, height: 40 }} source={require("../images/bottomicon/app_icns_Leave.png")} />,
    },
    {
      id: 2,
      name: 'Add Expense',
      action: () => navigation.navigate('addExpense'),
      icon: <Image style={{ width: 40, height: 40 }} source={require("../images/bottomicon/app_icns_expense.png")} />,
    },

  ]
  //BottomPopup
  let popupRef = React.createRef()

  const onShowPopup = () => {
    popupRef.show()
  }

  const onClosePopup = () => {
    popupRef.close()
  }

  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(res => {
      AsyncStorage.getItem('companyCode').then(compCod => {
        AsyncStorage.getItem('urlPrefix').then(prefix => {
          result = JSON.parse(res);
          console.log("Result =========== ", res);
          data.token = result.AuthToken;
          data.userCode = result.UserCode;
          data.compnyCode = compCod;
          data.prefix = prefix;
          data.PayrollEmployeeCode = result.PayrollEmployeeCode
          data.url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/" + data.compnyCode + "/";
          data.url2 = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/";
          data.url3 = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/";
          console.log("User Details !!=== ", result.AuthToken);
          getTaxyerPeriodEnd();
          // getEmployeeExpCount();
        });
      });
    })

  }, []);

  const getTaxyerPeriodEnd = () => {
    let url = data.url + 'GetPayrollTaxYearInfo';
    fetch(url, {
      method: 'GET',
      //Request Type       
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let dropdown = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(dropdown);
        let dropDownData = [];
        parseData.taxYearInfo = parseData.taxYearInfo.map(item => {
          item.value = item.TaxYearCode
          item.label = item.TaxYearName
          return item;
        });

        // console.log("parseData.taxYearInfo ============ ",parseData.taxYearInfo);
        data.selectedTaxYear = parseData.taxYearInfo[0].TaxYearCode;
        setTaxyear(parseData.taxYearInfo);
        if (data.selectedTaxYear) {
          getExpDetails(data.selectedTaxYear)
          getEmployeeExpCount(data.selectedTaxYear)

        } else {
          console.log("No DATA");
        }
        //  console.log("DATA =========== ",data);

        return;

      });

  }

  const getExpDetails = (taxYear) => {

    let url = data.url2 + 'GetEmployeeExpences';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.token,
        TaxYearCode: taxYear,
        companyCode: data.compnyCode,
        PayrollEmployeeCode: data.PayrollEmployeeCode
        // PayrollEmployeeCode: '48011'

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let allData = JSON.stringify(responseJson);
        let status = JSON.parse(allData)
        let rawData = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(rawData);
        console.log("GetEmployeeExpences_allData" + allData);
        console.log("GetEmployeeExpences_parseData" + parseData);

        if (status.IsSuccess == true) {
          for (var i = 0; i < parseData.length; i++) {
            // Alert.alert(parseData[i].ExpenseStatus.toString());
            if (parseData[i].Pending) {
              console.log("parseData[i].Pending=====" + parseData[i].Pending);
              data.PendingStatus = parseData[i].Pending;
              data.PendingExpenseDetailsArr.push(parseData[i]); //For Pending data pass

            }
            if (parseData[i].Approved) {
              data.ApprovedStatus = parseData[i].Approved;
              data.ApprovedExpenseDetailsArr.push(parseData[i]); //For Approved data pass
            }
            if (parseData[i].Reject) {
              data.RejectedStatus = parseData[i].Reject;
              data.RejectedExpenseDetailsArr.push(parseData[i]); //For Rejected data pass
            }
            if (parseData[i].Draft) {
              data.DraftStatus = parseData[i].Draft;
            }
          }
          setRecentExps(parseData.slice(0, 10))

        } else {
          setRecentExps([]);
          setExpenseStatus([]);
        }


        return;
      }

      );

  }

  const getEmployeeExpCount = (taxYear) => {
    let url = data.url3 + 'GetEmployeeExpencesCount';
    console.log("URL3====" + url);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.token,
        TaxYearCode: taxYear,
        //companyCode:data.compnyCode,
        PayrollEmployeeCode: data.PayrollEmployeeCode
        // PayrollEmployeeCode: '48011'

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let allData = JSON.stringify(responseJson);
        let status = JSON.parse(allData)
        let rawData = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(rawData);
        console.log("rawData=====" + JSON.stringify(responseJson.ResultInfo));
        console.log("setExpenseStatus=====" + allData);

        // var test = JSON.parse(allData)
        //  test.value.length; // 2

        if (status.IsSuccess == true) {
          let rawData = JSON.stringify(responseJson.ResultInfo);
          let pendingData = rawData
          console.log("pendingData========" + pendingData);
          data.PendingStatus = 0;
          data.ApprovedStatus = 0;
          data.RejectedStatus = 0;
          data.DraftStatus = 0;
          data.AllStatus = 0;
          for (var i = 0; i < parseData.length; i++) {
            // Alert.alert(parseData[i].ExpenseStatus.toString());
            if (parseData[i].Pending) {
              console.log("parseData[i].Pending=====" + parseData[i].Pending);
              data.PendingStatus = parseData[i].Pending;
              data.PendingExpenseDetailsArr.push(parseData[i]); //For Pending data pass

            }
            if (parseData[i].Approved) {
              data.ApprovedStatus = parseData[i].Approved;
              data.ApprovedExpenseDetailsArr.push(parseData[i]); //For Approved data pass
            }
            if (parseData[i].Reject) {
              data.RejectedStatus = parseData[i].Reject;
              data.RejectedExpenseDetailsArr.push(parseData[i]); //For Rejected data pass
            }
            if (parseData[i].Draft) {
              data.DraftStatus = parseData[i].Draft;
            }
          }
          data.AllStatus = data.PendingStatus + data.RejectedStatus + data.ApprovedStatus;
        } else {
          setExpenseStatus([]);
        }
        return;
      }

      );


  }
  // const dataa = [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];
  return (
    <>
      <HeaderComponent />
      <View style={style.container}>

        <View style={style.labelinput}>
          <Text style={style.label}>Tax Year:</Text>
          {/* <DropDownPicker
            items={taxYear}
            defaultValue={data.selectedTaxYear}
            containerStyle={{ height: 40, width: "73%", marginLeft: 26 }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
         //   dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              console.log("ITEM ==== ", item.value);
              data.selectedTaxYear = item.value
              getExpDetails(data.selectedTaxYear)
              getEmployeeExpCount(data.selectedTaxYear)

            }}
          /> */}
     
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={taxYear}
              
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="`Select Tax Year`"
            value={value}
            onChange={item => {
             
              setValue(item.value);
              data.selectedTaxYear = item.value
              getExpDetails(data.selectedTaxYear)
              console.log("ITEM ==== ", item.value);
              getEmployeeExpCount(data.selectedTaxYear)
            }}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          // )}
          />
        </View>
        {/* <View style={style.labelinput}>
        <Text style={style.label}>Period End:</Text>
    
        <DropDownPicker
                  items={periodEnd}
                  defaultValue={value}
                  containerStyle={{height: 40,width:"73%", marginLeft:10}}
                  style={{backgroundColor: '#ffffff'}}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#ffffff'}}
                   onChangeItem={(item) =>{ 
                    console.log("ITEM ==== ",item);
                    data.selectedPeriodEnd=item.label
                    getExpDetails(data.selectedTaxYear,data.selectedPeriodEnd)
                  } }
              />
             
    
        </View> */}



        <View style={{ marginTop: 25, }}>
          <Text style={style.label}>Summary</Text>
          <ScrollView
            horizontal={true}
          >

            <View style={style.boxrow}>

              <TouchableOpacity onPress={() => navigation.navigate('pendingExp', { data })}>
                <View style={style.boxview_pending}>
                  <Text style={style.status}>Pending</Text>
                  <Text style={style.status_no}>{data.PendingStatus}</Text>

                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('approvedExp', { data })}>
                <View style={style.boxview_Approve}>
                  <Text style={style.status}>Approved</Text>
                  <Text style={style.status_no}>{data.ApprovedStatus}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('rejectedExp', { data })}>
                <View style={style.boxview_rejected}>
                  <Text style={style.status}>Rejected</Text>
                  <Text style={style.status_no}>{data.RejectedStatus}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('draftExp', { data })}>
                <View style={style.boxview_draft}>
                  <Text style={style.status}>Draft</Text>
                  <Text style={style.status_no}>{data.DraftStatus}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('allExp')}>
                <View style={style.boxview_all}>
                  <Text style={style.status}>All</Text>
                  <Text style={style.status_no}>{data.AllStatus}</Text>
                </View>

              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>

        <View style={{ marginTop: 25, }}>
          <Text style={style.label}>Recent Expenses</Text>

          <FlatList

            style={{ marginTop: 10 }}
            data={recentExps}
            renderItem={({ item }) => (
              <View style={style.rexp}>
                <Text style={style.rexp1}>
                  {item.AccountName}
                </Text>

                <Text style={style.rexp1_amt}>£{item.Amount}</Text>
                {item.ExpenseStatus == 0 ?
                  <Text style={style.rexp1_icon}>Draft</Text>
                  : null}
                {item.ExpenseStatus == 1 ?
                  <Text style={style.rexp1_icon}>Pending</Text>
                  : null}
                {item.ExpenseStatus == 2 ?
                  <Text style={style.rexp1_icon}>Waiting for approval</Text>
                  : null}

                {item.ExpenseStatus == 3 ?
                  <Text style={style.rexp1_icon}> <Icon name='eye-slash' size={18} /></Text>
                  : null}

                {item.ExpenseStatus == 4 ?
                  <Text style={style.rexp1_icon}>Reject</Text>
                  : null}

                {item.ExpenseStatus == 5 ?
                  <Text style={style.rexp1_icon}>Send</Text>
                  : null}
              </View>
            )

            }
            // onEndReached={this.scrollViewr}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          // ItemSeparatorComponent={this.AccountCode}
          // ListHeaderComponent={this.renderHeader}



          />


        </View>

        {/* <Text onPress={()=>navigation.navigate('addExp')}>Add Expense</Text> */}


      </View>
      <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
        <TouchableOpacity
          onPress={onShowPopup}
          style={{
            alignSelf: 'flex-end',
            position: 'relative',
            bottom: 0,
            right: 12,
          }}>
          <Image
            style={{ width: 60, height: 60 }}
            source={require('../images/app_icns_Plus_Icon.png')}
          />
        </TouchableOpacity>
        {/* For bottomPopup */}
        <BottomPopup
          //  title="Demo popup"
          ref={(target) => (popupRef = target)}
          onTouchOutside={onClosePopup}
          data={popuplist}
        />
      </View>
    </>
  );
}; 
const styles = StyleSheet.create({
  dropdown: {
   
    padding:5,
    height: 35,
    borderRadius:5,
    width:"80%",
    borderWidth: 1,
   borderColor:"#d3d3d3",
   
   
  },
  icon: {
    paddingLeft:6,
    marginRight: 10,
  },
  placeholderStyle: {
    paddingLeft:10,
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
    
  },
});


export default Screen3;
