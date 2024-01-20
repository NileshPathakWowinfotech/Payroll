import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, 
  Linking, StyleSheet, List,Image, Alert, SafeAreaView,ToastAndroid, BackHandler} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomPopup } from './BottomPopup';
import { createStackNavigator } from '@react-navigation/stack';
import payslipViewRecent from './payslipViewRecent';
import { HeaderComponent } from './header';
  
//const approvedExp = ({route,navigation})=>{
//payslipViewRecent with BottomNavigation
export const PaySlipRecentStack=()=>{
  // PaySlipRecentStack mention in BottomNavigation component
  const Stack = createStackNavigator()
  const [count, setCount] = useState(0);
  useEffect(()=> {
     const handleBackButton = () => {
      if (count == 1) {
        BackHandler.exitApp()
      }else{
        setCount(count +1 );
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
      }
      return true;
     };
     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
     return () =>{
       BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
     };
 }, [count]);
  return(
    <Stack.Navigator initialRouteName='PaySlipList' screenOptions={{headerShown:false}}>
      <Stack.Screen name={"PaySlipList"} component={payslipRecent} />
     <Stack.Screen name='PaySlipViewRecent' component={payslipViewRecent} />
    </Stack.Navigator>
  )
}

class payslipRecent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      error: null,
      page:1,
      img1:'',
      scrollEnabled: false,
    
    };

    this.arrayholder = [];
  }
 

  componentDidMount() {
     this.img1 = '../images/bottomicon/app_icns_Home.png';
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
    console.warn("No DATA");

    AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
        var result = new Array();
        result =JSON.parse(res);
        let code =compCod
        
        this.setState({
          data:[]
        })
      // const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp?Page="+pagenum+"&Limit=12";
      const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp";
      console.log(url);

                  fetch(url, {
                    method: 'GET',
                    //Request Type 
                })
                .then((response) => response.json())
                .then((responseJson) => { 
                  if(responseJson.IsSuccess)
                  {
                  console.log("Description"+responseJson.Description);
                  if(pagenum ==1){
                  this.setState({
                    data: responseJson.ResultInfo,
                    loading:false
                    // error: responseJson.error || null,
                    // loading: false,
                  });
                } 
                else{
                  this.setState({
                    data: this.state.data.concat(responseJson.ResultInfo),
                    // error: responseJson.error || null,
                     loading: false,
                  });
                }
              }
              // else{
              //    if(responseJson.Description === 'Unknown error.') {
              //     Alert.alert(responseJson.Description+" Please contact IT Support"); 
              //   }
              // }
              });
                });      
              });
            });    

  }

  makeRemoteRequest = () => {
    console.log("No DATA");

    AsyncStorage.getItem('urlPrefix').then(ress => {
    AsyncStorage.getItem('userDetails').then(res => {
          var result = new Array();
          result =JSON.parse(res);

    const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken + '/GetCompanyInfoList';
    this.setState({ loading: true }); 
     console.log(url)

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.ResultInfo,
          error: res.error || null,
          loading: false, 
          
        }); 
        console.warn("No DATA");
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
        name: '  Add Leaves',
       // action:()=> this.props.navigation.navigate('profile2'),
       action:()=> ToastAndroid.show('Add Leaves .',ToastAndroid.SHORT),
        icon: <Image style={{width:40,height:40}} source={require("../images/bottomicon/app_icns_Leave.png")} />,
    
      },
      {
        id: 2,
        name: '  Add Expense',
        action:()=> ToastAndroid.show('Add Expense .',ToastAndroid.SHORT),
        icon: <Image style={{width: 40,height:40}} source={require("../images/bottomicon/app_icns_expense.png")} />,
      }
     
    ]

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
    return (
      <View style={styles.container}>
        <HeaderComponent />
        {/* {this.state.data.length ==0? 
      <Text style={styles.error}>No Record Found</Text>
      :null} */}
       {this.state.data ? this.state.data.length ==0?
      <Text style={styles.error}>No Record Found</Text>
      :null :  <Text style={styles.error}>No Record Found</Text>}
          <View style={{marginTop:10}}>     
        <Text style={styles.header}>Recent Payslips</Text>
        </View>  
       
        <View style={{height:285}}>
        <FlatList  scrollEnabled={this.state.scrollEnabled}
        
          style={{borderRadius:5, marginTop:0, marginLeft:15, marginRight:15,marginVertical:20}}
          data={this.state.data}
          renderItem={({ item }) => (

          
            <View style={{ flexDirection: 'row', backgroundColor: "#fff", padding: 4, margin: 4, }}>
              <View style={{ flexDirection: 'column', width: "30%", paddingLeft: 10, }}>
              <Text style={styles.monthformat}>{`${moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('D')}`} 
              {` ${moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('MMM')}`}</Text>
              <Text style={styles.yearformat}>{moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').isValid() ? moment(item.PayrollDate, 'M/D/YYYY hh:mm:ss A').format('YYYY') : 'Invalid Date'}</Text>

              </View>
              <View style={{ flexDirection: 'column', width: "40%", alignContent: "center", }}>
                <Text>Net pay</Text>
                <Text style={styles.netpayformat}>{`£${item.NetSalary}`}</Text>
              </View>
              <Text style={{ width: "20%", lineHeight: 50, }}>
                <TouchableOpacity>
                <Icon color="black" name="eye" onPress={() => this.props.navigation.navigate("PaySlipViewRecent",{data:item})} size={20} style={{ color: "#7d7d7d", paddingVertical: 20, }} />
                </TouchableOpacity>
              </Text>
              <Text style={{ width: "20%", lineHeight: 40, }}>
                <TouchableOpacity>
                <Icon color="black" name="download" onPress={() => Linking.openURL(item.PaySlipPath)} size={20} style={{ color: "#7d7d7d", marginLeft: 2, }} />
                </TouchableOpacity>
              </Text>
            </View>
            
           
     
            
          //   <ListItem
          //   // onPress={()=> Linking.openURL(item.PaySlipPath)}
          //   // onPress={() =>this.setCompanyCode(item)}
          //     // leftAvatar={{ source: { uri: item.picture.thumbnail } }} 
           
          //  // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
          //     title={`${moment(item.PayrollDate).format("DD MMM")}              Total`     }
              
          //     subtitle= {`${moment(item.PayrollDate).format("  YYYY")}                  £ ${item.NetSalary}`}
                       
                              
          
          //     />

          )}
          // onEndReached={this.scrollViewr}
           keyExtractor={item => item.PayrollTranCode}
         // ItemSeparatorComponent={this.renderSeparator} //For seprater between FlatList
          // ListHeaderComponent={this.renderHeader}
        />
       </View>
      
       
        <View style={{marginTop:-10}}>     
        {/* <Text style={styles.header}>Expense Claims</Text> */}
        </View> 
        <View style={{height:285}}>
        {/* <FlatList  scrollEnabled={this.state.scrollEnabled}
        
          style={{borderRadius:5, marginTop:0, marginLeft:15, marginRight:15,marginVertical:20}}
          data={this.state.data}
          renderItem={({ item }) => (

          
            <View style={{ flexDirection: 'row', backgroundColor: "#fff", padding: 4, margin: 4, }}>
              <View style={{ flexDirection: 'column', width: "30%", paddingLeft: 10, }}>
                <Text style={styles.monthformat}>{`${moment(item.PayrollDate).format("MMMM")}`}</Text>
                <Text style={styles.yearformat}>{`${moment(item.PayrollDate).format("YYYY")}`}</Text>

              </View>
              <View style={{ flexDirection: 'column', width: "40%", alignContent: "center", }}>
                <Text>Net pay</Text>
                <Text style={styles.netpayformat}>{`£${item.NetSalary}`}</Text>
              </View>
              <Text style={{ width: "20%", lineHeight: 50, }}>
                <TouchableOpacity>
                <Icon color="black" name="eye" onPress={() => this.props.navigation.navigate("PaySlipViewRecent",{data:item})} size={20} style={{ color: "#7d7d7d", paddingVertical: 20, }} />
                </TouchableOpacity>
              </Text>
              <Text style={{ width: "20%", lineHeight: 40, }}>
                <TouchableOpacity>
                <Icon color="black" name="download" onPress={() => Linking.openURL(item.PaySlipPath)} size={20} style={{ color: "#7d7d7d", marginLeft: 2, }} />
                </TouchableOpacity>
              </Text>
            </View>

     
          )}

          /> */}
        </View>
       
        <View style={{flex:1,flexDirection:'column-reverse'}}>
          <SafeAreaView>
       <TouchableOpacity onPress={onShowPopup} style={{alignSelf:'flex-end',position:'relative',bottom:12,right:12}}>
      
        {/* <Image style={{width:60,height:60}} source={require("../images/app_icns_Plus_Icon.png")} /> */}
       
      </TouchableOpacity>  
      </SafeAreaView>
      {/* For bottomPopup */}
      <BottomPopup
        //  title="Demo popup"
         
         ref={(target) => popupRef = target}
         onTouchOutside={onClosePopup}
         data={popuplist}
      />
      </View>
      

  <ActivityIndicator style={{position:"absolute", top:"50%", right:"50%",}} animating={this.state.loading} color="#ff00aa"   size="large" />
      </View>
    );
    
  
  }

}

export default payslipRecent;


const styles = StyleSheet.create({

  container:{
    // backgroundColor: '#ff00aa',
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
    color: "black",
    marginTop: 0,
    marginBottom:3,
    fontSize:20,
    fontStyle: "normal",
    marginLeft: 20
    
  },
  listview:{
        marginTop:0,
        marginLeft:18,
        marginRight:18,
        marginVertical:50
       
  },
  monthformat:{
      fontSize:16,
      fontWeight:'bold',
      color:'#ff00aa'
  },
  yearformat:{
    fontSize:14,
    fontWeight:'normal',
    color:'#ff00aa'
  },
  netpayformat:{
    fontSize:17,
    fontWeight:'bold',
    color:'#363739'
  }



})


