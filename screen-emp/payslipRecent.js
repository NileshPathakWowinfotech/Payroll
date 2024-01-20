import React, { Component } from 'react';

import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking, StyleSheet, List} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row } from 'native-base';
  


class FlatListDemo extends Component {
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
    // if (this.state.loading) {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        {this.state.data.length ==0? 
      <Text style={styles.error}>No Record Found</Text>
      :null}
          <View>     
        <Text style={styles.header}>Recent Payslip</Text>
        </View>  
        <ScrollView>
        <FlatList
        
          data={this.state.data}
          renderItem={({ item }) => (

            <View style={{flexDirection:'row', backgroundColor:"#fff", padding:10, margin:10,}}>
                 <View style={{flexDirection:'column', width:"30%", paddingLeft:20,}}>
                  <Text>{`${moment(item.PayrollDate).format("DD MMM")}`}</Text>
                  <Text>{`${moment(item.PayrollDate).format("YYYY")}`}</Text>
              
              </View>
              <View style={{flexDirection:'column', width:"40%", alignContent:"center", }}>
              <Text>Total</Text>
              <Text style={{fontSize:15,}}>{`£${item.NetSalary}`}</Text>
              </View>
              <Text style={{width:"20%", lineHeight:40,}}>
              < Icon color="black" name="eye" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20}  style={{color:"#7d7d7d",   paddingVertical:20,}}/>
              </Text>
              <Text style={{width:"20%", lineHeight:40,}}>
              < Icon color="black" name="download" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20}  style={{color:"#7d7d7d", marginLeft:30,}} />
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
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
        </ScrollView>
        <ScrollView>
        <View>     
        <Text style={styles.header}>Expense claims</Text>
        </View> 
        < Icon color="black" name="clock" onPress={ ()=> Linking.openURL(item.PaySlipUrl) }  size={20} style={{paddingLeft:350}}/>
        <FlatList
        style={{borderRadius:5, marginTop:0, marginLeft:18, marginRight:18,marginVertical:20}}
          data={this.state.data}
          renderItem={({ item }) => (
            
            <ListItem 
           // onPress={()=> Linking.openURL(item.PaySlipPath)}
            // onPress={() =>this.setCompanyCode(item)}
              // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${moment(item.PayrollDate).format("DD MMM")}              Total`     }
              
              subtitle= {`${moment(item.PayrollDate).format("  YYYY")}                  £ ${item.NetSalary}`}
            />
          )}

          />
        </ScrollView>

  <ActivityIndicator style={{position:"absolute", top:"50%", right:"50%",}} animating={this.state.loading} color="#ff00aa"   size="large" />
      </View>
    );
    
  
  }

}

export default FlatListDemo;


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
    marginTop: 15,
    marginBottom:10,
    fontSize:20,
    fontStyle: "normal",
    marginLeft: 20
    
  },
  listview:{
        marginTop:0,
        marginLeft:18,
        marginRight:18,
        marginVertical:50
       
  }



})


