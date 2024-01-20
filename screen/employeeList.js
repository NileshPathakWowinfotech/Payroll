import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking,StyleSheet} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

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
                  console.log("Data ========= ",responseJson); 
                  if(responseJson.IsSuccess){
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
       {this.state.data.length ==0? 
      <Text style={styles.error}>No Record Found</Text>
      :null}
             
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (

            <ListItem 
            onPress={()=> Linking.openURL(item.PaySlipPath)}
           
               title={`${item.FullName}`}
               subtitle= {`Last net pay: ${item.LastNetPay}      Next pay Date ${item.NextPayDate}`} 
 
            />

          )}
          // onEndReached={this.scrollViewr}
          //  keyExtractor={item => item.PayrollTranCode}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
         
                 <ActivityIndicator  style={{position:"absolute", top:"50%", right:"50%",}} animating={this.state.loading} color="#257AD2"   size="large" />
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
    fontSize:20
  },labelwidth:{
color:'black',

  },

})