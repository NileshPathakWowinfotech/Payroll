
import React, { Component, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, ScrollView, Linking,
  StyleSheet, Alert, ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';


class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxyeardropdown: [],
      periodenddropdown: [],
      taxyear: "",
      periodend: "",
      defaulttaxyear: "",
      defaultperiodend: "",
      loading: true,
      data: [],
      error: null,
      page: 1,
      RecordNotFound: false
    };


    this.arrayholder = [];
  }

  taxYearFilter = () => {
    AsyncStorage.getItem('urlPrefix').then(prefix => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
          this.setState({
            RecordNotFound: false
          })
          var result = new Array();
          result = JSON.parse(res);
          let code = compCod;
          var taxyearArr = [];
          var PeriodEndArr = [];
          const url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + result.AuthToken + "/GetPayrollTaxYearDetails";

          console.log(JSON.stringify(code));
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              PayrollCompanyCode: code,
              TaxYearCode: this.state.taxyear == "" ? null : this.state.taxyear //this.state.taxyeardropdown.value,
            })
            //Request Type 
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("User details ResponsetaxYearFilter ===== ", responseJson.ResultInfo);
              if (responseJson.IsSuccess) {
                console.log("taxdtl" + JSON.stringify(responseJson));
                let len = responseJson.ResultInfo.taxYearInfo.length;
                // let lengp = responseJson.ResultInfo.payPeriodEnd.length;
                // if (lengp == 0 || lengp == "") {         // No data 
                //   var joined = { value: "", label: "" }
                //   PeriodEndArr.push(joined);
                //   this.setState({
                //     periodenddropdown: PeriodEndArr,
                //     periodend: PeriodEndArr?.[0]?.value,
                //     data: ""
                //     // error: responseJson.error || null,
                //     // loading: false,
                //   });
                //   this.setState({
                //     RecordNotFound: true
                //   })
                //   //this.state.data = "";
                //   return;
                // }
                if (len == "") {
                  var joined = { value: "", label: "" }
                  taxyearArr.push(joined)
                  this.state.taxyear = "";

                }

                if (len > 0 && responseJson.ResultInfo) {
                  //Alert.alert("No Records Found!");
                  if (this.state.taxyear == "") {
                    for (let i = 0; i < len; i++) {

                      var indexvalue = responseJson.ResultInfo.taxYearInfo[i];
                      var joined = { value: indexvalue.TaxYearCode, label: indexvalue.TaxYearName }
                      taxyearArr.push(joined)


                    }
                    // setDropdown(temp);
                    // if (len == 1) //This condition for APi issue handle by code 
                    // {

                    // }
                    // else
                    //{

                    this.setState({
                      taxyeardropdown: taxyearArr,
                      taxyear: taxyearArr?.[0]?.value
                      // error: responseJson.error || null,
                      // loading: false,

                    });
                    // }
                    //    getKey(temp[0].value);
                    //    selectedValue(temp[0].value);
                    //    refreshLoader.droDownValue=temp[0].value;     
                  }
                  else {
                    this.state.data = "";
                  }
                }

                let leng = responseJson.ResultInfo.payPeriodEnd.length;

                if (leng > 0 && responseJson.ResultInfo) {
                  //Alert.alert("No Records Found!");
                  for (let i = 0; i < leng; i++) {
                    var indexvalue = responseJson.ResultInfo.payPeriodEnd[i];
                    // var indexvalue =  moment(responseJson.ResultInfo.payPeriodEnd[i], "DD/MM/YYYY").format("DD/MM/YYYY");
                    // moment(json.ResultInfo[0].DOB, "DD/MM/YYYY").format("DD/MM/YYYY")             
                    var FormatedPeriodEnd = moment(indexvalue.PeriodEnd, "MM/DD/YYYY").format("DD-MM-YYYY");
                    var joined = { value: FormatedPeriodEnd, label: FormatedPeriodEnd }
                    PeriodEndArr.push(joined)

                  }

                }
                else if (leng == "") {   //This condition executue when no data found in Company //31-10-2023
                  this.state.loading = false;
                  this.state.RecordNotFound = true;
                  var joined = { value: "", label: "" }
                  PeriodEndArr.push(joined)

                }
                // setDropdown(temp);

                this.setState({
                  periodenddropdown: PeriodEndArr,
                  periodend: PeriodEndArr?.[0]?.value
                  // error: responseJson.error || null,
                  // loading: false,
                });
                //    getKey(temp[0].value);
                //    selectedValue(temp[0].value);
                //    refreshLoader.droDownValue=temp[0].value;
              }
              else if (responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo) === 0) {

                //Alert.alert("No Records Found!");
                //  this.setState({
                //   data: JSON.parse(resp),

                // });  


              }
              else {
                this.state.data = "";
                this.state.RecordNotFound = true;
              }


            });
        });
      });
    });

  }


  CheckIfJsonIsEmpty(JsonObject) {

    return Object.keys(JsonObject).length;
  }


  allPEmployeeList = (year, peroidend) => {
    AsyncStorage.getItem('urlPrefix').then(prefix => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
          var result = new Array();
          result = JSON.parse(res);
          let code = compCod;
          var peroidendmoment = moment(peroidend, "DD-MM-YYYY").format("YYYY-MM-DD");
          if (year != "" && peroidend != "") {
            // const url =  "http://"+prefix+".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+ result.AuthToken +"/"+code+"/"+tax+"/"+periodend+"/GetAllPEmployeeList";
            const url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + result.AuthToken + "/" + code + "/" + year + "/" + peroidendmoment + "/GetAllPEmployeeList";
            console.log(url);
            fetch(url, {
              method: 'GET',
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("User details ResponseCallApi ===== ", responseJson.ResultInfo);
                if (responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo) !== 0) {
                  // Alert.alert("No Records Found!");
                  this.state.RecordNotFound = false;
                  this.setState({
                    data: responseJson.ResultInfo,
                    loading: false

                  });

                }
                // else if (responseJson.IsSuccess && responseJson.ResultInfo.length == "") {
                //   this.state.RecordNotFound = true;
                //   this.setState({
                //     loading: false,
                //     data: ""
                //   });
                //   //Alert.alert("No Records Found!");
                // }
                else if (responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo) === 0) {

                  this.state.RecordNotFound = false;
                  this.setState({
                    // data: responseJson.ResultInfo
                    loading: false

                  });

                }
                else {
                  this.state.data = "";
                  this.state.RecordNotFound = true;

                }
              });
          }
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
      () => this.allPEmployeeList(this.state.taxyear, this.state.periodend),
      1000
    );

    // this.getEmployeeListApp(this.state.page);


  }

  scrollViewr = () => {

    this.setState({
      page: this.state.page + 1
    })
    //  this.getEmployeeListApp(this.state.page + 1);
    //this.allPEmployeeList(this.state.taxyear,this.state.periodend);

  }




  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
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

    if (this.state.taxyear != "" && this.state.periodend != "") {
      // this.allPEmployeeList(this.state.defaulttaxyear,this.state.defaultperiodend)
      //this.allPEmployeeList(this.state.taxyear, this.state.periodend)
    } []

    return (

      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.flexrow1}>

          <View style={{ width: "48%" }}>
            <Text style={styles.labelwidth}>Tax Year:</Text>
            <Dropdown
              data={this.state.taxyeardropdown}
              value={this.state.taxyear}
              labelField={"label"}
              valueField={"value"}
              // maxHeight={150}
              containerStyle={{ height: 'auto', width: "100%", marginVertical: 0, }}
              // itemTextStyle={{marginBottom:1}}
              style={styles.dropdown}
              itemTextStyle={{
                fontSize: 14,
                marginTop: -24,
                marginBottom: -10,
                marginLeft: -6
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              itemContainerStyle={{ backgroundColor: '#ffffff', height: 25 }}
              dropDownStyle={{ backgroundColor: '#fff' }}
              placeholder="Select Tax Year"
              placeholderStyle={{ fontSize: 12, marginLeft: 12, }}
              onChange={item => {
                this.state.taxyear = item.value
                this.taxYearFilter()
                //this.allPEmployeeList(this.state.taxyear,this.state.periodend);
                this.timerID = setTimeout(
                  () => this.allPEmployeeList(this.state.taxyear, this.state.periodend),
                  1000
                );
              }}
            />
          </View>
         
          <View style={{ width: "50%", marginLeft:10, }}>
            <Text style={styles.labelwidth}>Period End:</Text>
            <Dropdown
              data={this.state.periodenddropdown}
              value={this.state.periodend}
              labelField={"label"}
              valueField={"value"}
              // maxHeight={150}
              containerStyle={{ height: 'auto', width: "100%", marginVertical: 0 }}
              // itemTextStyle={{marginBottom:1}}
              style={styles.dropdown}
              itemTextStyle={{
                fontSize: 14,
                marginTop: -24,
                marginBottom: -10,
                marginLeft: -6
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              itemContainerStyle={{ backgroundColor: '#ffffff', height: 25 }}
              dropDownStyle={{ backgroundColor: '#fff' }}
              placeholder="Select Period End"
              placeholderStyle={{ fontSize: 12, marginLeft: 12 }}
              onChange={item => {
                this.state.periodend = item.value
                this.allPEmployeeList(this.state.taxyear, this.state.periodend);
              }}
            />

          </View>

          {this.state.RecordNotFound ?
            <Text style={styles.error}>No Record Found</Text>
            : null}
        </View>

        <FlatList

          data={this.state.data}
          renderItem={({ item, separators }) => (

            <ScrollView>
              <View>
                {/* < Icon color="black" name="download" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20} style={{paddingLeft:350}}/> */}
                <View style={{ flexDirection: 'row', backgroundColor: "#fff", padding: 8, paddingLeft: 4, marginVertical: 5 }}>
                  <View style={{ flexDirection: 'column', width: "50%", paddingLeft: 10, }}>
                    <Text style={styles.nameformat}>{`${item.FullName}`}</Text>

                    <Text style={styles.lastformat}>Last net pay: ${item.NetPay}</Text>

                  </View>

                  <View style={{ textAlign: 'right', flexDirection: 'column', width: "50%", marginTop: 5, marginRight: 5, marginLeft: -5 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity>
                        <Icon color="#2a323c" name="download" onPress={() => Linking.openURL(item.PaySlipPath)} size={20} style={{ color: "#7d7d7d", marginLeft: 30, }} />
                      </TouchableOpacity>
                      {/* <Text style={styles.netpayformat}>Next pay date: {moment(item.NextPayDate, "MM/DD/YYYY").format("MM/DD/YYYY")}</Text> */}
                    </View>
                  </View>
                </View>

                {/* <ListItem
             
              title={`${item.FullName }`  }  
             
             
             subtitle= {`Last net pay: ${item.LastNetPay}                      Next pay Date ${item.NextPayDate}`} 
            
              /> */}
              </View>

            </ScrollView>


          )}

        // onEndReached={this.scrollViewr}
        //  keyExtractor={item => item.PayrollTranCode}
        //  ItemSeparatorComponent={this.renderSeparator}
        // ListHeaderComponent={this.renderHeader}
        />


        <ActivityIndicator style={{ position: "absolute", top: "50%", right: "50%", }} animating={this.state.loading} color="#ff00aa" size="large" />


      </View>

    );
  }
}



export default FlatListDemo;

const styles = StyleSheet.create({



  error: {
    color: "red",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    fontSize: 20,
    flexDirection: "column"


  },
  labelwidth: {
    width: "100%",
    marginBottom: 0,
    fontSize: 16,
    marginTop: 10,
  },
  listicon: {
    marginRight: 20
  },
  nameformat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff00aa'
  },
  lastformat: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#363739'
  },
  netpayformat: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#363739',
    marginTop: 3

  }, flexrow1: {
    marginTop: -2,
    flexDirection: "row",
  },
  flexrow2: {
    marginTop: 2
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#ffffff',
    height: 38,
    width: "100%",
    marginLeft: 0,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,



  }



})