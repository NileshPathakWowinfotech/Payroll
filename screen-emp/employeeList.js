
import React, { Component , useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking,StyleSheet, Alert,} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, IconButton } from 'react-native-paper';




class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxcode: "",
      periodend: "",
      loading: true,
      data: [],
      error: null,
      page:1
    };
    

    this.arrayholder = [];
  }

 


   DummystringJson="[{\"AEPayrollCompanyCode\":0,\"AEPayrollEmployeeCode\":0,\"Apprentice\":0,\"DOB\":\"4/28/199812:00:00AM\",\"FullName\":\"Ms.Tanu shree\",\"HolderType\":\"1\",\"HourRate\":0,\"IsDirector\":false,\"IsW1M1\":false,\"LastNetPay\":0,\"NICategoryCode\":\"A\",\"NINumber\":\"\",\"NextPayDate\":\"30/04/2023\",\"PayId\":\"\",\"PaySlipUrl\":\"http://sandbox.nomismasolution.co.uk/PayrollUI/AccessFiles.aspx?type=Payslip&id=&PayrollCompanyCode=5965\",\"PayrollCompanyCode\":14265,\"PayrollEmployeeCode\":20374,\"PensionSchemeName\":\"\",\"TaxCode\":\"1257Y\",\"WorkerStatus\":0},{\"AEPayrollCompanyCode\":0,\"AEPayrollEmployeeCode\":0,\"Apprentice\":0,\"DOB\":\"3/13/199512:00:00AM\",\"FullName\":\"Mr.Tarun kumar\",\"HolderType\":\"1\",\"HourRate\":0,\"IsDirector\":false,\"IsW1M1\":false,\"LastNetPay\":0,\"NICategoryCode\":\"A\",\"NINumber\":\"\",\"NextPayDate\":\"30/04/2023\",\"PayId\":\"\",\"PaySlipUrl\":null,\"PayrollCompanyCode\":14265,\"PayrollEmployeeCode\":20375,\"PensionSchemeName\":\"\",\"TaxCode\":\"1257L\",\"WorkerStatus\":0}]";

   callApi= ()=>{

    AsyncStorage.getItem('urlPrefix').then(prefix => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
        
        var result = new Array();
        result =JSON.parse(res);
        let code =compCod;
       //loading=true;
     // const url =  "http://"+prefix+".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+ result.AuthToken +"/"+code+"/"+tax+"/"+periodend+"/GetAllPEmployeeList";
     const url = "http://"+prefix+".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+ result.AuthToken +"/"+code+"/"+this.state.taxcode+"/"+this.state.periodend+"/GetAllPEmployeeList";
    console.log(url);
    //const resp = this.DummystringJson;
      fetch(url, {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((responseJson) => { 
                  console.log("User details Response ===== ", responseJson.ResultInfo);
                  if(responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo) !== 0){
                   //  Alert.alert("No Records Found!");
                  this.setState({
                    data: responseJson.ResultInfo,
                    
                  });  

                }
                else if(responseJson.IsSuccess && this.CheckIfJsonIsEmpty(responseJson.ResultInfo)===0)
                {               
                 
                  Alert.alert("No Records Found!");
                  //  this.setState({
                  //   data: JSON.parse(resp),
                    
                  // });  

                          
                }
                else{
                  this.state.data="";
                  Alert.alert("Something Went Wrong!");
                }
              });
            });
            });
                });      
         
  }


  CheckIfJsonIsEmpty(JsonObject)
  {
    
     return Object.keys(JsonObject).length;
  }

 

  componentDidMount() {
    this.testScrolling(this.state.page);
   
  }

  scrollViewr =()=>{
    this.setState({
      page:this.state.page +1
    })
    this.testScrolling(this.state.page + 1);
  }

 

  testScrolling =(pagenum)=>{

        AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
        var result = new Array();
        result =JSON.parse(res);
        let code =compCod
      const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+code+"/GetAllPEmployeeListApp";
      fetch(url, {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((responseJson) => { 
                  if(responseJson.IsSuccess){
                    console.log("Json.stringfy=="+ JSON.stringify(responseJson.ResultInfo));
                  this.setState({
                    data: responseJson.ResultInfo,
                    loading:false
                    // error: responseJson.error || null,
                    // loading: false,
                  });
                }else{
                  this.setState({
                    data: this.state.data.concat(responseJson.ResultInfo),
                    // error: responseJson.error || null,
                     loading: false,
                  });
                }
               
              });
                });      
              });
            });    
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


    
    return ( 
    
      <View style={{ flex: 1 }}>
    
    <View style={styles.flexrow1}>
    <Text style={styles.labelwidth}>Tax Year:<Text style={{ color: 'red' }}></Text></Text>
          <DropDownPicker
            items={[
              { label: '2023-2024', value: "2023-2024"},
              
            ]}
          //  defaultValue={this.state.taxcode}
          containerStyle={{ height: 40, width: "98%", marginLeft: 2, marginVertical: 2, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}

           onChangeItem={(item) =>
            {
              this.state.taxcode = item.label
              this.callApi();
          
          }
        }
          />
        </View>

        <View  style={styles.flexrow1}>
        <Text style={styles.labelwidth}>Period End:<Text style={{ color: 'red' }}></Text></Text>
          <DropDownPicker
            items={[
              { label: '2023-04-05', value: "2022-04-05"},
              // { label: '30-04-2023', value: "30-04-2023"},
              
            ]}
           // defaultValue={this.state.periodend}
          containerStyle={{ height: 40, width: "98%", marginLeft: 2, marginVertical: 10, }}
            style={{ backgroundColor: '#ffffff' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#ffffff' }}

            onChangeItem={(item) =>
              {
                this.state.periodend = item.label
                this.callApi();
            
            }
          }

          
          // onChangeItem={(item) =>this.callApi(item)}
          />

      {this.state.data.length ==0? 
      <Text style={styles.error}>No Record Found</Text>
      :null}
        </View>
  
        <FlatList

          data={this.state.data}
          renderItem={({ item }) => (
            
            <ScrollView>

               
            <View>
           
             < Icon color="black" name="download" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20} style={{paddingLeft:350}}/>
             
             <ListItem
             
              title={`${item.FullName }`  }   Icon color="black" name="download" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20} style={{position:'relative'}}
             
             
             subtitle= {`Last net pay: ${item.LastNetPay}                      Next pay Date ${item.NextPayDate}`} 
            
              />
             </View>
             
             </ScrollView>
           

          )}

         
          
          
          // onEndReached={this.scrollViewr}
          //  keyExtractor={item => item.PayrollTranCode}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
       
         
                 <ActivityIndicator  style={{position:"absolute", top:"50%", right:"50%",}} animating={this.state.loading} color="#ff00aa"   size="large" />
                 
                 
      </View>
      
    );
  }
}



export default FlatListDemo;

const styles = StyleSheet.create({

 

  error: {
    color:"red",
    justifyContent: "center",
    textAlign:"center",
    padding:20,
    fontSize:20,
    flexDirection: "column"


  },
  labelwidth:{
    width:"100%",
 marginBottom:5,
 paddingLeft:0,
 fontSize:14,
 marginTop:15,
 },

 listicon :{
  marginRight:20
},

})