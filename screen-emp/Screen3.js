import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,AsyncStorage,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './styleSheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';


const Screen3 = ({route,navigation})=>{
  const [value, setValue] = useState('');
  const [taxYear, setTaxyear] = useState([]);
  const [periodEnd, setPeriodEnd] = useState([]);
  const [recentExps,setRecentExps] = useState([]);
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
      PayrollEmployeeCode:''
    },
    
  );

  useEffect(() => {
    AsyncStorage.getItem('userDetails').then(res => {
    AsyncStorage.getItem('companyCode').then(compCod => {
    AsyncStorage.getItem('urlPrefix').then(prefix => {
        result =JSON.parse(res);
        console.log("Result =========== ",res);
         data.token=result.AuthToken;
         data.userCode =result.UserCode;
         data.compnyCode=compCod;
         data.prefix = prefix;
         data.PayrollEmployeeCode=result.PayrollEmployeeCode
         data.url = "http://"+prefix+".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+data.token+"/"+data.compnyCode+"/";
         data.url2 = "http://"+prefix+".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+data.token+"/";
        console.log("User Details !!=== ",result.AuthToken);
        getTaxyerPeriodEnd();
        });
      });
    })

  }, []);

  const getTaxyerPeriodEnd = () => {
    let url = data.url+'GetPayrollTaxYearInfo';
   
    fetch(url, {
      method: 'GET',
      //Request Type       
  })
  .then((response) => response.json())
  .then((responseJson) => {  
    let  dropdown = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(dropdown); 
   
     data.periodEnd = parseData.payPeriodEnd[0].PeriodEnd;
    let dropDownData=[];
    parseData.taxYearInfo = parseData.taxYearInfo.map(item => {
      item.value = item.TaxYearCode
      item.label =item.TaxYearName 
      console.log("judjd")
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
      getExpDetails( data.selectedTaxYear,data.selectedPeriodEnd)

    }else{
      console.log("No DATA");
    }
  //  console.log("DATA =========== ",data);

    return;
       
});

  }

  const getExpDetails =(taxYear,periodEnd)=>{

    let url = data.url2+'GetEmployeeExpences';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.token,
        TaxYearCode:taxYear,
        PeriodEnd:moment(periodEnd,'DD/MM/YYYY').format("YYYY-MM-DD"),
        companyCode:data.compnyCode,
        PayrollEmployeeCode: data.PayrollEmployeeCode
        // PayrollEmployeeCode: '48011'

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

    return (
      
      <View style={style.container}>
        
       <View style={style.labelinput}>
        <Text style={style.label}>Tax Year:</Text>
        
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
                    console.log("ITEM ==== ",item.value);
                    data.selectedTaxYear =item.value
                    getExpDetails(data.selectedTaxYear,data.selectedPeriodEnd)
                    // getExpDetails();
                  
                  } }
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



        <View style={{marginTop:25,}}>
        <Text style={style.label}>Summary</Text>
        <ScrollView
          horizontal={true}
          >
        <View style={style.boxrow}>

        <TouchableOpacity onPress={()=>navigation.navigate('pendingExp')}>
          <View style={style.boxview_pending}>
            <Text style={style.status}>Pending</Text>
           <Text style={style.status_no}>05</Text>

          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>navigation.navigate('approvedExp')}>
          <View  style={style.boxview_Approve}>
            <Text style={style.status}>Approved</Text>
            <Text style={style.status_no}>15</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('rejectedExp')}>
          <View style={style.boxview_rejected}>
            <Text style={style.status}>Rejected</Text>
            <Text style={style.status_no}>25</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>navigation.navigate('draftExp')}>
          <View style={style.boxview_draft}>
            <Text style={style.status}>Draft</Text>
            <Text style={style.status_no}>25</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('allExp')}>
          <View style={style.boxview_all}>
            <Text style={style.status}>All</Text>
            <Text style={style.status_no}>25</Text>
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
            {item.AccountName}
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

<Text onPress={()=>navigation.navigate('addExp')}>Add Expense</Text>


      </View>
    );
};


export default Screen3;
