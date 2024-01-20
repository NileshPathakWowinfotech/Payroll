import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking,
   StyleSheet, List,Image,ToastAndroid} from 'react-native';
   import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, SearchBar } from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomNavigation } from 'react-native-paper';
import { BottomPopup } from './BottomPopup';
import { HeaderComponent } from './header';

// import BottomNavigator from './BottomNavigator';


class payslipView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      error: null,
      page:1
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    // this.makeRemoteRequest();
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
      // const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp?Page="+pagenum+"&Limit=12";
      const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp";

                  fetch(url, {
                    method: 'GET',
                    //Request Type 
                })
                .then((response) => response.json())
                .then((responseJson) => { 
                  if(pagenum ==1){
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

  makeRemoteRequest = () => {

    AsyncStorage.getItem('urlPrefix').then(ress => {
    AsyncStorage.getItem('userDetails').then(res => {
          var result = new Array();
          result =JSON.parse(res);

    const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken + '/GetCompanyInfoList';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.ResultInfo,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.ResultInfo;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

     });
   });
  };

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
    const popuplist =[
      {
        id: 1,
        name: 'Add Leaves',
       // action:()=> this.props.navigation.navigate('profile2'),
        action:()=> ToastAndroid.show('Add Leaves .',ToastAndroid.SHORT),
        icon: <Image style={{width:40,height:40}} source={require("../images/bottomicon/app_icns_Leave.png")} />,
      },
      {
        id: 2,
        name: 'Add Expense',
        action:()=> ToastAndroid.show('Add Expense .',ToastAndroid.SHORT),
        icon: <Image style={{width:40,height:40}} source={require("../images/bottomicon/app_icns_expense.png")} />,
      },
     
    ]
        //BottomPopup
        let popupRef = React.createRef()
    
        const onShowPopup =()=>{
                popupRef.show()
        }
    
        const onClosePopup =() =>{
                popupRef.close()
        }
    // if (this.state.loading) {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
  let {data} = this.props.route.params
  console.log("157",data)
    return (

        <>
        <HeaderComponent backIcon/>
        <View style={styles.container}>
           
                {/* {this.state.data.length == 0 ?
                    <Text style={styles.error}>No Record Found</Text>
                    : null} */}
               <View ><Text style={styles.month_header}>
                   {moment(data.PayrollDate).format("DD")}{' '}
                   {moment(data.PayrollDate).format("MMM")}{' '}
                  {moment(data.PayrollDate).format("YYYY")}</Text></View>
                <View style={styles.rowjustify1}>
                    <Text style={styles.header}>Summary</Text>
                    <Text style={styles.downloadicon}> 
                    {' '}
                    <TouchableOpacity>
                    < Icon color="black" name="download" onPress={ ()=> Linking.openURL(data.PaySlipPath) }  
                        size={22} 
                        style={{color:"#7d7d7d",}} />
                    </TouchableOpacity>
                    </Text>
                </View>
                      <View style={{backgroundColor:'#ffffff', padding:10, marginTop:5,borderRadius:6}}>
                        <View style={styles.listrow}><Text style={styles.firstname}>First name</Text><Text style={styles.lastname}>{data.FirstName}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>Last name</Text><Text style={styles.lastname}>{data.Lastname}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>Gross Pay</Text><Text style={styles.lastname}>£{data.GrossPay}</Text></View>
                       
                        </View>  
                        <Text style={styles.taxheader}>Tax and NI</Text>
                        <View style={{backgroundColor:'#ffffff', padding:10, marginTop:8,borderRadius:6}}>
                        <View style={styles.listrow}><Text style={styles.firstname}>Income Tax</Text><Text style={styles.lastname}>£{data.IncomeTax}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>EE NI</Text><Text style={styles.lastname}>£{data.EmployeeNi}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>EE Pension</Text><Text style={styles.lastname}>£{data.EmployeePension}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>Loan Repayment</Text><Text style={styles.lastname}>£{data.LoanRepayment}</Text></View>
                       
                        </View>  
                        <View style={{backgroundColor:'#ffffff', padding:10, marginTop:28,borderRadius:6}}>
                        <View style={styles.listrow}><Text style={styles.firstname}>ER NI</Text><Text style={styles.lastname}>£{data.EmployerNi}</Text></View>
                        <View style={styles.listrow}><Text style={styles.firstname}>ER Pension</Text><Text style={styles.lastname}>£{data.EmployerPension}</Text></View>
                        </View> 
                        <View style={styles.listrow}><Text style={styles.netpayheader}>Net Pay</Text><Text style={styles.netpayamnt}>£{data.NetPay}</Text></View>
                        
                   
                        
                      
                
                <View style={{flex:1,flexDirection:'column-reverse'}}>
       <TouchableOpacity onPress={onShowPopup} style={{alignSelf:'flex-end',position:'relative',bottom:-3,right:-3}}>
      
       {/* <Image  style={{width:60,height:60}} source={require("../images/bottomicon/app_icns_Plus_Icon.png")} /> */}
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
            {/* <BottomNavigator/> */}
            </>
     
    );
  }
}

export default payslipView;

const styles = StyleSheet.create({

  container:{
    // backgroundColor: '#ff00aa',
  
padding:15,
    flex:1,
  

    
  },

  error: {
    color:"red",
    justifyContent: "center",
    textAlign:"center",
    padding:20,
    fontSize:20
  },
  header:{
    color: "#363739",
    marginTop:22,
    fontSize:17,
    fontStyle:"normal",
    fontWeight: 'bold',
    marginLeft: 6
    
  },
  taxheader:{
    color: "#363739",
    marginTop:25,
    fontSize:17,
    fontStyle:"normal",
    fontWeight: 'bold',
    marginLeft: 6
  },
  listview:{
        marginTop:0,
        marginLeft:18,
        marginRight:18,
        marginVertical:50
       
  },
  labelwidth: {
    width: 70,
    marginVertical: 20,
    paddingLeft: 5,
    marginRight:0,
    color: 'black',
  
  },
  labelwidth1:{
    width: 80,
    marginVertical: 20,
    paddingLeft: 5,
    marginRight:0,
    color: 'black',
  },
  monthformat:{
    fontSize:18,
    fontWeight:'bold',
    color:'#257AD2'
},
firstname:{
color:"#363739",
marginBottom:10,
fontSize:14,
justifyContent:"flex-start",
},
lastname:{
  color:"#363739",
  fontSize:14,
  textAlign:"right",
  fontWeight:"bold",
  justifyContent:"flex-end",
  
  },
  rowjustify:{
    flexDirection: 'row', justifyContent: "space-between", flex: 1,
  },
  rowjustify1:{
    flexDirection: 'row', justifyContent: "space-between", 
  },
  downloadicon:{
    color:"#363739",
    fontSize:14,
   marginRight:28,
   marginTop:22,
  },
yearformat:{
  fontSize:14,
  fontWeight:'normal',
  color:'#257AD2'
},
netpayformat:{
  fontSize:18,
  fontWeight:'bold',
  color:'#363739'
},
dropDownStyle3:{
  backgroundColor:'gray',

},
placeholderstyles:{
color:"grey"
},
month_header:{
    textAlign:"center",
    color:"#ff00aa",
    fontWeight:'bold',
    fontSize:18,
    marginBottom:-15,
  
},
listrow:{
    flexDirection:"row",
    justifyContent:"space-between",
},
netpayheader:{
  color: "#ff00aa",
  marginTop:38,
  fontSize:17,
  fontStyle:"normal",
  fontWeight: 'bold',
  marginLeft: 6

},
netpayamnt:{
  color: "#ff00aa",
  marginTop:38,
  fontSize:17,
  fontStyle:"normal",
  fontWeight: 'bold',
  marginLeft: 6

}

})