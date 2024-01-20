import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, ActivityIndicator, ScrollView, Linking, StyleSheet, List, Image, ToastAndroid, SafeAreaView, Alert } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomPopup } from './BottomPopup';
import { createStackNavigator } from '@react-navigation/stack';
import payslipView from './payslipView'
import { Dropdown } from 'react-native-element-dropdown';
import { HeaderComponent } from './header';


//payslipView with BottomNavigation
export const PaySlipStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='PaySlipList' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"PaySlipList"} component={payslipIndividual} />
      <Stack.Screen name='PaySlipView' component={payslipView} />
    </Stack.Navigator>
  )
}

class payslipIndividual extends Component { 
  
  constructor(props) {
    super(props);
    this.state = {
      taxyeardropdown: [],
      periodenddropdown: [],
      taxyear: "",
      periodend: "",
      loading: true,
      setValue:"",
      data: [],
      error: null,
      page: 1
    };
    RecordNotFound :false

    this.arrayholder = [];
  }

  taxYearFilter = () => {
    AsyncStorage.getItem('urlPrefix').then(prefix => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
      //     this.setState({
      //       RecordNotFound:false

      // })
          this.RecordNotFound=false;
          var result = new Array();
          result = JSON.parse(res);
          let code = compCod;
          var taxyearArr = [];
          var PeriodEndArr = [];
          //loading=true;
          console.log("URL executing");
          const url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + result.AuthToken + "/GetPayrollTaxYearDetails";
         
          console.log("JSON.stringify"+JSON.stringify(code));

          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              PayrollCompanyCode:code,
             
            })
            //Request Type 
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("User details ResponsetaxYearFilter ===== ", responseJson.ResultInfo);
              if (responseJson.IsSuccess) {
                console.log(JSON.stringify(responseJson));

                let len = responseJson.ResultInfo.taxYearInfo.length;

                if (len > 0 && responseJson.ResultInfo) {
                  //Alert.alert("No Records Found!");
                  for (let i = 0; i < len; i++) {
                    var indexvalue = responseJson.ResultInfo.taxYearInfo[i];
                    var joined = { value: indexvalue.TaxYearCode, label: indexvalue.TaxYearName } 
                    taxyearArr.push(joined)
                  }
                  // setDropdown(temp);

                  this.setState({
                    taxyeardropdown: taxyearArr,
                    taxyear: taxyearArr?.[0]?.value

                  });
                  AsyncStorage.setItem('DefaultTaxyear', responseJson.ResultInfo.taxYearInfo[0].TaxYearCode.toString()); 
                }
              
              }

              else if (responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo) === 0) {

              }
              else {
                this.state.data = "";
              //  Alert.alert("Session Expired!");
              }
            });
        });
      });
    });

  }


  CheckIfJsonIsEmpty(JsonObject) {

    return Object.keys(JsonObject).length;
  }

  componentDidMount() {

    this.taxYearFilter();
    this.timerID = setTimeout(
      () => this.testScrolling(1),
      1000
    );

  }

  // scrollViewr =()=>{
  //   this.setState({
  //     page:this.state.page +1
  //   })
  //   this.testScrolling(this.state.page + 1);
  // }

  testScrolling = (pagenum) => {
   
    AsyncStorage.getItem('DefaultTaxyear').then(taxyr => {
      AsyncStorage.getItem('urlPrefix').then(ress => {
        AsyncStorage.getItem('userDetails').then(res => {
          AsyncStorage.getItem('companyCode').then(compCod => {
            var result = new Array();
            result = JSON.parse(res);
            let code = compCod
            this.RecordNotFound = false;
            console.log("JSON.stringify==========" + JSON.stringify(res));
            console.log("result.PayrollCompanyCode==========" + result.PayrollCompanyCode);
            console.log("PayrollEmployeeCode========" + result.PayrollEmployeeCode);
            console.log("TaxYearCode=========" +this.state.taxyear);
            console.log("UserType=========" + result.UserCode);
            // const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp?Page="+pagenum+"&Limit=12";
            const url = "http://" + ress + ".nomismasolution.co.uk/AccountREST/AccountService.svc/" + ress + "/" + result.AuthToken + "/GetPEmployeeListByEmp";
           console.log("taxyr============"+url); 
            
            fetch(url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }, 
              
              body: JSON.stringify({
              
                PayrollCompanyCode:  result.PayrollCompanyCode,
                PayrollEmployeeCode: result.PayrollEmployeeCode,
                PeriodEnd: this.state.periodend != "" ? this.state.periodend : null,
                TaxYearCode:this.state.taxyear,
                UserCode: result.UserCode,
                UserType: "4"
              })
              //Request Type 
            })
              .then((response) => response.json())
              .then((responseJson) => {
                if(responseJson.IsSuccess)  //this for data hold in UI //30-10-23
                {
                  let Arraylength = responseJson.ResultInfo.length;
                  if(Arraylength ==0)
                    this.RecordNotFound = true;
                if (pagenum == 1) {
                //Alert.alert(JSON.stringify(responseJson.ResultInfo));
                  // var result = Object.entries(responseJson.ResultInfo).filter(item => item.NetSalary === '0.0000');

                  //  console.log("data.NetSalary"+ data.NetSalary);
                  
                  this.setState({
                    data: responseJson.ResultInfo,
                    loading: false,
                    RecordNotFound: false  // 30/11/2023 change
                    // error: responseJson.error || null,
                    // loading: false,
                  });
                } else {
                  this.setState({
                    data: this.state.data.concat(responseJson.ResultInfo),
                    // error: responseJson.error || null,
                    loading: false,
                  });
                }
              } else {
                this.state.data="";
                this.RecordNotFound = true;
              }  
              });
          });
        });
      });
    });
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '0%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.CompanyName}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(text) > -1;
    });
    this.setState({
      data: newData,
    });
  };


  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    //BottomPopup
    const popuplist = [
      {
        id: 1,
        name: 'Add Leaves',
        // action:()=> this.props.navigation.navigate('profile2'),
        action: () => ToastAndroid.show('Add Leaves .', ToastAndroid.SHORT),
        icon: <Image style={{ width: 40, height: 40 }} source={require("../images/bottomicon/app_icns_Leave.png")} />,
      },
      {
        id: 2,
        name: 'Add Expense',
        action: () => ToastAndroid.show('Add Expense .', ToastAndroid.SHORT),
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
    // if (this.state.loading) {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    // if(this.state.taxyear != ""){
    //   // this.callApi(this.state.defaulttaxyear,this.state.defaultperiodend)
    //   this.testScrolling(1)
    // }[]
    return (
      <>  
      <HeaderComponent />
        <View style={{ flexDirection: 'row',padding:20 }}>
          <Text style={styles.labelwidth}>Tax Year:</Text>
          {/* <DropDownPicker
                items={this.state.taxyeardropdown}
                  defaultValue={this.state.taxyear}
                  containerStyle={{ height: 35, width: "75%", marginLeft:0, marginVertical: 15,marginRight:10 }}
                style={{ backgroundColor: '#ffffff' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#ffffff' }}
    
               onChangeItem={(item) =>
                {
                  this.state.taxyear = item.value
                  this.taxYearFilter()
                  this.testScrolling(1)
              
              }
            }

              />    */}

              <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={this.state.taxyeardropdown}
              
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="`Select Tax Year`"
            value={this.state.taxyear}
            onChange={item => {
             
            //  setValue(item.value);
              this.state.taxyear = item.value
              this.state.taxyear = item.value
              this.taxYearFilter()
              this.testScrolling(1)
            }}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          // )}
          /> 
              

          {/* <Dropdown
            data={this.state.taxyeardropdown}
           // defaultValue={this.state.taxyear}
            labelField={"label"}
            valueField={this.state.taxyear}
            maxHeight={150}
            containerStyle={{backgroundColor:'#ffffff'}}
            // itemTextStyle={{marginBottom:1}}
            style={styles.dropdown}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            placeholder="Select Tax Year"
            placeholderStyle={{ fontSize: 9 }}
            onChange={item => {
              this.state.taxyear = item.value
              this.taxYearFilter()
              this.testScrolling(1)
            }}
          /> */}

          {/* <Text style={styles.labelwidth1}>Period End:</Text>
          <Dropdown
            data={this.state.periodenddropdown}
           // defaultValue={this.state.periodenddropdown}
            labelField={"label"}
            valueField={this.state.periodenddropdown}
            maxHeight={150}
            style={styles.dropdown}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            placeholder="Select Period End"
            placeholderStyle={{ fontSize:9 }}
            onChange={item => {
              this.state.taxyear = item.value
              this.taxYearFilter()
              this.testScrolling(1)
            }}
          /> */}
        </View>
        <View style={styles.container}>
          {this.RecordNotFound ?
            <Text style={styles.error}>No Record Found</Text>
            : null}
          <View>
            <Text style={styles.header}> Payslip</Text>
          </View>
          <ScrollView>
            <View>
              <FlatList
                style={{ borderRadius: 5, marginTop: 0, marginLeft: 15, marginRight: 15, marginVertical: 20}}
                data={this.state.data}
                renderItem={({ item }) => (

                  // <ListItem
                  //     // onPress={()=> Linking.openURL(item.PaySlipPath)}
                  //     // onPress={() =>this.setCompanyCode(item)}
                  //     // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                  //     title={`${moment(item.PayrollDate).format("DD MMM")}             Net pay                     ${ <Icon color="black" name="download" onPress={() => Linking.openURL(item.PaySlipUrl)} size={20}/> }        `}

                  //     subtitle={`${moment(item.PayrollDate).format("  YYYY")}                  £ ${item.NetSalary}`} 
                  //     />

                  <View style={{ flexDirection: 'row', backgroundColor: "#fff", padding: 5, margin: 4, }}>
                    <View style={{ flexDirection: 'column', width: "30%", paddingLeft: 10, }}>
                    <Text style={styles.monthformat}>{`${moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('D')}`}    
                  {` ${moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('MMM')}`}</Text>
                  
                  <Text style={styles.yearformat}>{moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').isValid() ? moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('YYYY') : 'Invalid Date'}</Text>

                    </View>
                    <View style={{ flexDirection: 'column', width: "40%", alignContent: "center", }}>
                      <Text>Net pay</Text>
                      <Text style={styles.netpayformat}>{`£${item.NetPay}`}</Text>
                    </View>
                    <Text style={{ width: "20%", lineHeight: 50, }}>
                      <TouchableOpacity>
                        < Icon color="black" name="eye" onPress={() => this.props.navigation.navigate("PaySlipView", { data: item })} size={20} style={{ color: "#7d7d7d", paddingVertical: 20, }} />
                      </TouchableOpacity>
                    </Text>
                    <Text style={{ width: "20%", lineHeight: 40, }}>
                      <TouchableOpacity>
                        < Icon color="black" name="download" onPress={() => Linking.openURL(item.PaySlipPath)} size={20} style={{ color: "#7d7d7d", marginLeft: 2, }} />
                      </TouchableOpacity>
                    </Text>
                  </View>

                )}
                // onEndReached={this.scrollViewr}
                keyExtractor={item => item.PayrollTranCode}
              // ItemSeparatorComponent={this.renderSeparator} //For seperator between FlatList
              />
            </View>
          </ScrollView>
          <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
            <TouchableOpacity onPress={onShowPopup} style={{ alignSelf: 'flex-end', position: 'relative', bottom: 12, right: 12 }}>

              {/* <Image style={{ width: 60, height: 60 }} source={require("../images/app_icns_Plus_Icon.png")} /> */}
            </TouchableOpacity>
            {/* For bottomPopup */}
            <BottomPopup
              //  title="Demo popup"
              ref={(target) => popupRef = target}
              onTouchOutside={onClosePopup}
              data={popuplist}
            />
          </View>
          <ActivityIndicator style={{ position: "absolute", top: "50%", right: "50%", }} animating={this.state.loading} color="#ff00aa" size="large" />
        </View>
      </>

    );
  }
}


export default payslipIndividual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: "red",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    fontSize: 20
  },
  header: {
    color: "black",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20

  },
  listview: {
    marginTop: 0,
    marginLeft: 18,
    marginRight: 18,
    marginVertical: 50

  },
  labelwidth: {
    width: 70,
    marginVertical: 10,
    paddingLeft: 5,
    marginRight: 0,
    marginLeft:5,
    color:"black"

  },
  labelwidth1: {
    width: 80,
    marginVertical: 20,
    paddingLeft: 5,
    marginRight: 0,
  },
  monthformat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff00aa'
  },
  yearformat: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#ff00aa'
  },
  netpayformat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#363739'
  }, dropdown: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    height: 33,
    width: "80%",
    marginLeft: 0,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
   
  },dropdown: {
   color:"black",
    padding:10,
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
    color:"black",
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

 
})