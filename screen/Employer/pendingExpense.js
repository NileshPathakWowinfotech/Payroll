import { View, Text, Button,Touchable, StyleSheet,Image,TextInput,Alert,Linking, TouchableOpacity,ActivityIndicator,Route } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../styleSheet'
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, SearchBar } from 'react-native-elements';
import Loader from '../component/loader';


const pendingExp = ({route,navigation})=>{
  const [exp, setExp] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    {
      taxYear:[],
      periodEnd:'',
      compnyCode:'',
      compnyCodee:'',
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
      approved:'',
      pending:'',
      rejected:''
    },
    
  );

  useEffect(() => {
    console.log("USEEFFECT================================");
    AsyncStorage.getItem('userDetails').then(res => {
      AsyncStorage.getItem('companyCode').then(compCod => {    //This id PayrollCompanyCode
        AsyncStorage.getItem('companycodee').then(comnyCod => { //This is CompanyCode
          AsyncStorage.getItem('urlPrefix').then(prefix => {
            result = JSON.parse(res);
            data.token = result.AuthToken;
            data.compnyCode = compCod;
            data.compnyCodee = comnyCod;
            data.prefix = prefix;
            data.url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/" + data.compnyCodee + "/";
            data.url2 = "http://"+ prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/"+prefix+"/"+data.token+"/";

            console.log("User Details !!=== ", result.AuthToken);
            console.log("URL-GetExpenseHeadExpenseItem====" + data.url);
            getExpDetails();
          });
        });
      });
    })

  }, []);


  const getExpDetails = () => {

    setLoading(true);
    let url = data.url2+'GetEmployerExpences';
    console.log("URL ==",url," === Request ======================= ",JSON.stringify({
      PayrollCompanyCode:data.compnyCode,
      TaxYearCode:'10'
     
    }));
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PayrollCompanyCode:data.compnyCode,
        TaxYearCode:'10'
       
      })
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    setLoading(false);
    console.log("Response ========= ",responseJson)
    let  allData = JSON.stringify(responseJson.ResultInfo);
    let parseData = JSON.parse(allData);
    console.log("Exp parseData ========",parseData);
    if(responseJson.IsSuccess){
      setExp(parseData)
    }
    return;
       
});

  }

  const searchFilterFunction = (text) => {
    setSearch(text)
    console.log("TEXT =========== ",exp);
    console.log("text ========== ",text)
    if(text){
      const newData = exp.filter(item => {
        const itemData = `${item.AccountName}`;
        return itemData.indexOf(text) > -1;
      });
      setExp(newData)
    }else{
        console.log("No changes");
        getExpDetails()

    }
    
  };
  
  renderHeader = () => {
    return (
      <SearchBar
        containerStyle={{backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 5}}
        placeholder="Search"
        placeholderTextColor={'#g5fffg5g5'}
        lightTheme
        round
        onChangeText={text => {searchFilterFunction(text)}}
        autoCorrect={false}
        value={search}
      />
    );
  };


    return (
       <View>
    <Loader loading={loading} />
        <FlatList
          data={exp}
          renderItem={({ item }) => (
      <View style={style.pendinglist}>
    <View style={style.pendingemplist1}>
        <Text style={style.pendingempname}>{`${item.AccountName}`}</Text>
        <Text style={style.pendingempexp}>Fuel Expenses</Text>
    </View>
    <View style={style.pendingemplist2}>
        <Text style={style.pendingempamt}>£1,545.00</Text>
        <Text style={style.pendingempexp}>Total</Text>
    </View>

    <View style={style.pendingemplist3}>
    <View style={style.pendingcircle}>
        <Text  style={style.pendingcircletext}>12</Text>
      </View>

      <TouchableOpacity onPress={() =>navigation.navigate('expAction')}>
      <Text ><Icon name='angle-right' style={style.tabrate_icon_pending2}  size={35}  /></Text>
        </TouchableOpacity>
    </View>
            </View>
            
          )}
          keyExtractor={item => item.ExpenseId}
          // ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={renderHeader}

        />
       </View>
    );
};


export default pendingExp;
