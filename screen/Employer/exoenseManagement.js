import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,
    ActivityIndicator,Route } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState,Component, Fragment } from 'react';
import style from '../styleSheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import Loader from '../component/loader';


const Screen3 = ({route,navigation})=>{
  const [value, setValue] = useState('');
  const [taxYear, setTaxyear] = useState([]);
  const [periodEnd, setPeriodEnd] = useState([]);
  const [recentExps,setRecentExps] = useState([]);
  const [selectedItems, setSelectedItems] = useState();
  const [employeeList, setEmployeeList] = useState([])
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState('0');
  const [pending, setPending] = useState('0');
  const [rejected, setRejected] = useState('0');
  const [empValue, setEmpValue] = useState('0');

  const [data, setData] = useState(
    {
      taxYear:[],
      periodEnd:'',
      compnyCode:'',
      token:'',
      prefix:'',
      url:'',
      url2:'',
      selectedTaxYear:'',
      selectedPeriodEnd:'',
      userCode:'',
      resentExp:[],
      PayrollEmployeeCode:'',
      dfltindx:1,
      PayrollCompanyCode:'',
      approved:'0',
      pending:'0',
      rejected:'0'
    },
    
  );

  var items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ];


  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('userDetails').then(res => {
      AsyncStorage.getItem('companyCode').then(compCod => {    //This id PayrollCompanyCode
        AsyncStorage.getItem('companycodee').then(comnyCod => { //This is CompanyCode
          AsyncStorage.getItem('urlPrefix').then(prefix => {
            AsyncStorage.getItem('PayrollCompanyCode').then(PayrollCompanyCode => {
            result = JSON.parse(res);
            data.token = result.AuthToken;
            data.compnyCode = compCod;
            data.compnyCodee = comnyCod;
            data.prefix = prefix;
            data.PayrollCompanyCode=PayrollCompanyCode;
            data.url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/" + data.compnyCodee + "/";
            data.url2 = "http://"+ prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+data.token+"/";
            // getExpenseType();
          // getTaxyerPeriodEnd();

          (async () => {
            setLoading(true);
            someResponse = await firstRun(); // it takes some time

             empL = await employeeListFuntion();

             recentEXp = await getRecentExpDetails();
            // When request is finished:
            // setSomeData(someResponse.data); // (1) write data to state
            setLoading(false); // (2) write some value to state
        })();

          // firstRun();
          //  employeeListFuntion();          
          // setLoading(false)
            
          });
        });
        });
      });
    })

  }, []);

  const getExpenseType = () => {
    let PeriodEndArr = [];
    let url = data.url + 'GetExpenseHeadInfoList';
    fetch(url, {
      method: 'GET',
      //Request Type       
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let dropdown = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(dropdown);
        let leng = responseJson.ResultInfo.length;

        if (leng > 0 && responseJson.ResultInfo) {
          for (let i = 0; i < leng; i++) {                    
              var joined = { id: parseData[i].ExpenseHeadCode, name: responseJson.ResultInfo[i].ExpenseHeadName }
            PeriodEndArr.push(joined)

          }

        }
        setExpenseType(PeriodEndArr);
        return;

      });

  }

  const getTaxyerPeriodEnd = () => {

    let url = data.url2+'GetPayrollTaxYearDetails';
    // http://regression.nomismasolution.co.uk/AccountREST/Accountservice.svc/regression/f18affa1-9552-44df-b95b-6a2706b0647f/GetPayrollTaxYearDetails
    // 'http://regression.nomismasolution.co.uk/AccountREST/Accountservice.svc/regression/a6c0faad-9852-4cd9-9e9a-605b9321f6ee/GetPayrollTaxYearDetails'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PayrollCompanyCode:data.compnyCode
      })
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    // return
    let  dropdown = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(dropdown);
    // data.periodEnd = parseData.payPeriodEnd[0].PeriodEnd;
    let dropDownData=[];
    parseData.taxYearInfo = parseData.taxYearInfo.map(item => {
      item.value = item.TaxYearCode
      item.label =item.TaxYearName
      return item;
    });
    parseData.payPeriodEnd = parseData.payPeriodEnd.map(item => {
      item.value =moment.utc(item.PeriodEnd).valueOf();
      item.utc = moment.utc(item.PeriodEnd).valueOf();
      item.label = moment(item.PeriodEnd).format("DD/MM/YYYY");
      return item;
    });
    
    // console.log("parseData.taxYearInfo ============ ",parseData.taxYearInfo);
    data.selectedTaxYear =parseData.taxYearInfo[0].TaxYearCode;
    data.selectedPeriodEnd =  moment(parseData.payPeriodEnd[0].PeriodEnd).format("DD/MM/YYYY");
    setTaxyear(parseData.taxYearInfo);
    setPeriodEnd(parseData.payPeriodEnd);
    setValue(parseData.payPeriodEnd[0].value)
    
    if( data.selectedTaxYear){
      // getExpDetails( data.selectedTaxYear,data.selectedPeriodEnd)
      getRecentExpDetails();

    }else{
      console.log("No DATA");
    }
  //  console.log("DATA =========== ",data);

    return;
       
});

  }

  const firstRun =()=>{
    let url = data.url2+'GetPayrollTaxYearDetails';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PayrollCompanyCode:data.compnyCode
      })
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    // return
    let  dropdown = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(dropdown);
    parseData.taxYearInfo = parseData.taxYearInfo.map(item => {
      item.value = item.TaxYearCode
      item.label =item.TaxYearName
      return item;
    });
    parseData.payPeriodEnd = parseData.payPeriodEnd.map(item => {
      item.value =moment.utc(item.PeriodEnd).valueOf();
      item.utc = moment.utc(item.PeriodEnd).valueOf();
      item.label = moment(item.PeriodEnd).format("DD/MM/YYYY");
      return item;
    });
    
    data.selectedTaxYear =parseData.taxYearInfo[0].TaxYearCode;
    data.selectedPeriodEnd =  moment(parseData.payPeriodEnd[0].PeriodEnd).format("DD/MM/YYYY");
    setTaxyear(parseData.taxYearInfo);
    setPeriodEnd(parseData.payPeriodEnd);
    setValue(parseData.payPeriodEnd[0].value)
    getKpi(data.compnyCode,parseData.taxYearInfo[0].TaxYearCode,0);   
    // getExpDetails(data.compnyCode,parseData.taxYearInfo[0].TaxYearCode,0); 
    getRecentExpDetails();


    return;
       
});


  }

  const getExpDetails =(payrollCmpnyCode,taxYear,empCode)=>{
  
    let url = data.url2+'GetEmployeeExpences';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
                PayrollCompanyCode:payrollCmpnyCode,
                TaxYearCode:taxYear,
                PayrollEmployeeCode:empCode,
                ExpenseStatus:0
                // PayrollCompanyCode:"39197",
                // "TaxYearCode":"10",
                // "PayrollEmployeeCode": 48011,
                    })
                })
  .then((response) => response.json())
  .then((responseJson) => { 
    let allData = JSON.stringify(responseJson);
    let status = JSON.parse(allData)
    let  rawData = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(rawData);
    if(status.IsSuccess==true){
         setRecentExps(parseData.slice(0, 10))
    }else{
      setRecentExps([]);
    }
    
  
  return;    
}

);

  }

  const moveToSummaryPage =(pageStatus)=>{
    console.log("empValue =================== ",empValue);
    if(empValue >0){
      navigation.navigate('singleEmpSummary', {
        pageStatus: pageStatus,
      })
    }else{
      console.log("move to common page");

      navigation.navigate('pendingExpense', {
        pageStatus: pageStatus,
      })

     
      
    }
    
  }

  const getKpi = (payrollCmpnyCode,taxYear,empCode) => {
    let url = data.url2+'GetEmployerExpencesCount';
    console.log('getKpi 222222222222222222222222 =======',taxYear," Request =========",JSON.stringify({
      token: data.token,
      PayrollCompanyCode:payrollCmpnyCode,
      TaxYearCode:taxYear,
      EmpCode:empCode

    }));

            fetch(url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                PayrollCompanyCode:payrollCmpnyCode,
                TaxYearCode:taxYear,
                PayrollEmployeeCode:empCode
              })
          })
          .then((response) => response.json())
          .then((responseJson) => { 

            let  allData = JSON.stringify(responseJson.ResultInfo);
            let parseData = JSON.parse(allData);
            console.log("KPI RESPONSE ========= ",parseData[0])

            setApproved(parseData[0].Approved);
            setPending(parseData[0].AwaitingApproval);
            setRejected(parseData[0].Reject);
            
            data.approved=parseData[0].Approved;
            data.pending=parseData[0].AwaitingApproval;
            data.rejected=parseData[0].Reject;

            return;
              
        });
 
    
  }


  const employeeListFuntion = () => {
    let url = data.url2+'GetEmployeeList';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PayrollCompanyCode:39197,
        TaxYearCode:'10'
      })
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    let  allData = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(allData);

    parseData.unshift({
      "AEPayrollCompanyCode": 1,
      "AEPayrollEmployeeCode": 1,
      "Apprentice": 1,
      "BasicSalary": 1,
      "DOB": null,
      "EmployeeNi": 1,
      "EmployeePension": 0,
      "EmployerNi": 0,
      "EmployerPension": 0,
      "FirstName": null,
      "FullName": 'All Employee',
      "GrossPay": 0,
      "HolderType": null,
      "HourRate": 0,
      "IncomeTax": 0,
      "IsDirector": false,
      "IsW1M1": false,
      "LastNetPay": 0,
      "Lastname": null,
      "LoanRepayment": 0,
      "NICategoryCode": null,
      "NINumber": null,
      "NetPay": 0,
      "NextPayrollDate": null,
      "PayId": null,
      "PaySlipPath": null,
      "PaySlipUrl": null,
      "PayrollCompanyCode": 0,
      "PayrollDate": null,
      "PayrollEmployeeCode": '0',
      "PayrollTranCode": 0,
      "PensionSchemeName": null,
      "TaxCode": null,
      "WorkerStatus": 0,
    })
    if(responseJson.IsSuccess){
      parseData = parseData.map(item => {
        item.value = item.PayrollEmployeeCode
        item.label =item.FullName
        return item;
      });
      setEmployeeList(parseData)

    }


    return;
       
});

  }

  // Resent Exp

  const getRecentExpDetails = () => {

    let url = data.url2+'GetEmployerExpences';
    console.log("getRecentExpDetails URL =========================",url," === Request ======================= ",JSON.stringify({
      PayrollCompanyCode:data.compnyCode,
      TaxYearCode:'10',
      PayrollEmployeeCode: 0,
        ExpenseStatus: 0
     
    }));
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PayrollCompanyCode:data.compnyCode,
        TaxYearCode:'10',
        PayrollEmployeeCode: 0,
        ExpenseStatus: 0
       
      })
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    let  allData = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(allData);
    
    if(responseJson.IsSuccess==true){
         setRecentExps(parseData.slice(0, 10))
    }else{
      setRecentExps([]);
    }
    

    return;
       
});

  }
    return (

      <View style={style.container}>
          <Loader loading={loading} />
       <View style={style.labelinput}>
        <Text style={style.label}>Tax Year:</Text>
        
        {taxYear? 
        <DropDownPicker
                  items={taxYear}
                  defaultValue={data.selectedTaxYear}
                  containerStyle={{height: 40,width:"73%", marginLeft:26}}
                  style={{backgroundColor: '#ffffff'}}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#ffffff'}}
                   onChangeItem={(item) =>{                     
                    data.selectedTaxYear =item.value;

                    getKpi(data.compnyCode,item.value,empValue);   

                    // getExpDetails(data.selectedTaxYear,data.selectedPeriodEnd)
                    // getExpDetails();
                  
                  } }
          />:null }
      
        </View>
       

        {/* EMployeee Drop DOwn */}

              <View style={{width:'100%',height:'6%'}}>
                {employeeList.length > 0?

                <DropDownPicker
                items={employeeList}
                searchable={true}
                 defaultValue={empValue}
                containerStyle={{ flex:1,}}
                style={{backgroundColor: '#ffffff'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#ffffff'}}
                  onChangeItem={(item) =>{ 
                  setEmpValue(item.value);

                //   (async () => {
                //     setLoading(true);
                //     someResponse = await firstRun(); // it takes some time
                //     setLoading(true)
                //     getKpi(data.compnyCode,data.selectedTaxYear,item.value); 
                //     setLoading(false);  
                // })();
                    console.log("Emp Code ==== ",item.value);
                  getKpi(data.compnyCode,data.selectedTaxYear,item.value);   
                 
                
                } }
               /> : null  }
              
              </View>
        

        {/* <Fragment> */}
          {/* Multi */}
          {/* <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectedItems}
            onItemSelect={(item) => {
              const items = this.state.selectedItems;
              items.push(item)
              this.setState({ selectedItems: items });
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: items });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "placeholder",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          /> */}
          {/* Single */}
          {/* <SearchableDropdown
            onItemSelect={(item) => {
            //   const items = this.state.selectedItems;
            //   items.push(item)
            //   this.setState({ selectedItems: items });
            }}
            
            selectedItems={selectedItems}
            containerStyle={{ padding: 0,   }}
            onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            }}
            itemStyle={{
              paddingLeft: 10,
              marginTop: 5,
              marginBottom:5,
              borderColor: '#bbb',
              borderWidth: 0,
              borderRadius: 5,
              paddingBottom:5,
              
            }}
            itemTextStyle={{ color: '#3d3d3d' }}
            itemsContainerStyle={{ maxHeight: 140,  borderWidth: 1,
               borderColor:"lightgrey",  backgroundColor: '#fff',   borderBottomLeftRadius: 10,
               borderBottomRightRadius: 10, box_shadow:1,   shadowColor: '#000',
               shadowOffset: { width: 0, height: 1 },
               shadowOpacity: 0.6,
               shadowRadius: 2,  
               elevation: 5,  }}
            items={items}
            defaultIndex={2}
            resetValue={true}
            textInputProps={
              {
                placeholder: "Search",
                underlineColorAndroid: "transparent",
               
                style: {
                    padding: 5,
                    paddingLeft:12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,  
                    elevation: 5,
                },
                
                // onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        /> */}
      {/* </Fragment> */}






        <View style={{marginTop:25,}}>
        <Text style={style.label}>Summary</Text>
        <ScrollView
          horizontal={true}
          >

          <View style={style.boxrow}>

          <TouchableOpacity onPress={()=>moveToSummaryPage(1)}>
            <View style={style.boxview_pending}>
              <Text style={style.status}>Pending</Text>
             <Text style={style.status_no}>{pending}</Text>
  
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ ()=> moveToSummaryPage(0)}>
            <View  style={style.boxview_Approve}>
              <Text style={style.status}>Approved</Text>
              <Text style={style.status_no}>{approved}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>moveToSummaryPage(2)}>
            <View style={style.boxview_rejected}>
              <Text style={style.status}>Rejected</Text>
              <Text style={style.status_no}>{rejected}</Text>
            </View>
            </TouchableOpacity>
            

  
          </View>
        </ScrollView>


        </View>

<View style={{marginTop:25,}}>
<Text style={style.label}>Recent Expenses</Text>

<FlatList

          style={{marginTop:10}}
          data={recentExps}
          renderItem={({ item }) => (
          <View style={style.rexp}> 
           <Text style={style.rexp1}>
            {item.FirstName}
           </Text>

           <Text style={style.rexp1_amt}>£{item.Amount}</Text>
           {item.ExpenseStatus==0 ? 
            <Text style={style.rexp1_icon}>Draft</Text>
            : null}
            {item.ExpenseStatus==1 ? 
            <Text style={style.rexp1_icon}>Pending</Text>
            : null}
            {item.ExpenseStatus==2 ? 
            <Text style={style.rexp1_icon}>Waiting for approval</Text>
            : null}

          {item.ExpenseStatus==3 ? 
            <Text style={style.rexp1_icon}> <Icon name='eye-slash' size={18} /></Text>
            : null}

        {item.ExpenseStatus==4 ? 
            <Text style={style.rexp1_icon}>Reject</Text>
            : null}

          {item.ExpenseStatus==5 ? 
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

<Text onPress={()=>navigation.navigate('addExpByEmployes')}>Add Expense</Text>


</View>
    );
};


export default Screen3;
