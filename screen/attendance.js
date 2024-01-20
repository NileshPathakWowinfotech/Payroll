import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking, StyleSheet} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import moment from 'moment';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
      page:1,
      leave:0.00
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
    // const url ="http://integralites.com/app/apis/eBook.php";

    AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {
        var result = new Array();
        result =JSON.parse(res);
        let code =compCod
      // const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+"/4/GetPaySlipListApp?Page="+pagenum+"&Limit=12";
      const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+result.UserCode+ "/4/GetEmployeeLeaveListApp?Page="+pagenum+"&Limit=12";

                  fetch(url, {
                    method: 'GET',
                    //Request Type 
                })
                .then((response) => response.json())
                .then((responseJson) => { 

                  console.log("Response ====== ",responseJson);
                  this.setState({loading:false});
                  if(pagenum ==1){
                    if(responseJson.ResultInfo.length > 0){
                      this.setState({
                        data: responseJson.ResultInfo,
                        leave:responseJson.ResultInfo[0].Totalleave,
                        loading:false
                        // error: responseJson.error || null,
                        // loading: false,
                      });
                      this.arrayholder =responseJson.ResultInfo;
                     
                    }else{
                     

                    }
                  
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

    const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken + "/4/GetEmployeeLeaveListApp?Page="+pagenum+"&Limit=12";
    
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
        console.log("State====================== ",res.ResultInfo);
       
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

  leave = () => {
    return this.state.leave;
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

      <View style={{ flex: 1 }}>

      {/* {this.state.data ==0? 
      <Text style={styles.error}>No Record Found</Text>
      :null} */}
        <ActivityIndicator  style={{position:"absolute", top:"50%", right:"50%",}} animating={this.state.loading} color="#ff00aa"   size="large" />    
        
        <View>
        {/* {
           this.state.data.map((item1, key) => ( */}

           <Text style={{color:"#ffffff", fontSize:16, backgroundColor:"#9C9D9D", paddingVertical:5, textAlign:"center"}}>Leave Balance: {this.state.leave}  </Text>
          
          
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (

            <View style={{ borderBottomWidth:1, borderBottomColor:"#BBC0C4"}}>
              <View style={{margin:10}}>
              <Text style={styles.leavetophead}>{ item.StatutoryTypeCode }</Text>
                <Text style={{color:"#828282"}}>{ `${moment(item.StartDate).format("DD/MM/YYYY")} - ${moment(item.EndDate).format("DD/MM/YYYY")}`}</Text> 
                {/* <Text style={{color:"#3A4452", fontSize:16,}}>{`Leave Balance: ${item.Totalleave}`} </Text> */}
            </View>
            </View>

            // <ListItem 
            // // onPress={() =>this.setCompanyCode(item)}
            //   // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
            //   rightTitle={item.StatutoryTypeCode}
            //   title={ `${moment(item.StartDate).format("DD MMM YYYY")} to ${moment(item.EndDate).format("DD MMM YYYY")}`} 
            //    subtitle= {`Leave: ${item.Totalleave}`} 
            // />
          )}
          // onEndReached={this.scrollViewr}
           keyExtractor={item => item.PayrollTranCode}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
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
  },

  leavetophead:{
    fontWeight:"bold", fontSize:16, marginBottom:5, color:"#ff00aa",
  }

})