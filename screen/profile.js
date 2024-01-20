import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView ,Linking,StyleSheet,TextInput,
  TouchableOpacity,
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
      page:1,
      firstName:''
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
      // const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken +"/"+code+"/GetAllPEmployeeListApp?Page="+pagenum+"&Limit=12";
      const url = "http://"+ress+".nomismasolution.co.uk/AccountREST/AccountService.svc/"+ress+"/"+ result.AuthToken+"/"+result.UserCode+"/4/GetUserDetailsListApp";
        
      fetch(url, {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((responseJson) => { 
                  if(pagenum ==1){
                  this.setState({
                    data: responseJson.ResultInfo[0],
                    loading:false,
                    firstName:responseJson.ResultInfo[0].FirstName
                    // error: responseJson.error || null,
                    // loading: false,
                  });
                }else{
                  
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

  profileUpdate=()=>{
  }

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

  changeName = (value) => {
  };

  render() {
    const {onChange} = this.props;

    return  (
      <View>
        <ScrollView>
   
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Title:</Text>
       <DropDownPicker
                     items={[  
                         {label: 'Mr.', value: 'Mr.', icon: () => <Icon name="user" size={18} color="#ff00aa" />},
                         {label: 'Mrs.', value: 'Mrs.', icon: () => <Icon name="user" size={18} color="#ff00aa" />},
                         {label: 'Miss', value: 'miss', icon: () => <Icon name="user" size={18} color="#ff00aa" />},
                         {label: 'Ms.', value: 'ms', icon: () => <Icon name="user" size={18} color="#ff00aa" />},
                         {label: 'Dr', value: 'dr', icon: () => <Icon name="user" size={18} color="#ff00aa" />},
                     ]}
                     defaultValue={this.state.data.Title}
                     containerStyle={{height: 40,width:225,marginLeft:30, marginVertical:15,}}
                     style={{backgroundColor: '#fafafa'}}
                     itemStyle={{
                         justifyContent: 'flex-start'
                     }}
                     dropDownStyle={{backgroundColor: '#fafafa'}}
                      // onChangeItem={(item) =>data.title =item.value} 
                 />

                 
       </View> 
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>First Name:<Text style={{ color: 'red' }}>*</Text></Text>
       <TextInput defaultValue={this.state.data.FirstName}
       returnKeyType="next"
       onChangeText={(item) =>this.changeName(item)}  
       value={this.setState.firstName}
       underlineColorAndroid='rgba(0,0,0,0)' placeholder='First Name'  style={styles.inputBox}  
       maxLength={30}
       />
       </View>
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Last Name:<Text style={{ color: 'red' }}>*</Text></Text>
       <TextInput defaultValue={this.state.data.LastName} style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Last Name' maxLength={30} />
       </View>
   
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Gender:<Text style={{ color: 'red' }}>*</Text></Text>
       <DropDownPicker
                     items={[  
                         {label: 'Male', value: 'M', icon: () => <Icon name="mars" size={18} color="#ff00aa" />},
                         {label: 'Female', value: 'F', icon: () => <Icon name="venus" size={18} color="#ff00aa" />},
                         // {label: 'Other', value: 'o', icon: () => <Icon name="genderless" size={18} color="#900" />},
                     ]}
                     defaultValue='M'
                     containerStyle={{height: 40,width:225,marginLeft:30, marginVertical:15, }}
                     style={{backgroundColor: '#fafafa'}}
                     itemStyle={{
                         justifyContent: 'flex-start'
                     }}
                     dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={(item) =>data.gender =item.value} 
                 />
       </View>
   
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>DOB:<Text style={{ color: 'red' }}>*</Text></Text>
       
         <View style={styles.inputBox}><Text style={{paddingVertical:10}}> kjhkjh</Text> 
           {/* <View style={styles.thouchablebtn}><Icon name='calendar'  onPress={showDatepicker}  size={18} color="#a1a1a1" /></View> */}
         </View>
        
      
      </View>
      
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth} >Address:<Text style={{ color: 'red' }}>*</Text></Text>
       <TextInput  maxLength={30} style={styles.inputBox}  placeholder="Address" underlineColorAndroid='rgba(0,0,0,0)'  />
       </View>
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}></Text>
       <TextInput   maxLength={30} style={styles.inputBox}  placeholder='City'  underlineColorAndroid='rgba(0,0,0,0)'  />
       </View>
   
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}></Text>
       <TextInput   maxLength={30} style={styles.inputBox}  placeholder='State' underlineColorAndroid='rgba(0,0,0,0)'  />
       </View>
   
       <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Post Code:<Text style={{ color: 'red' }}>*</Text></Text>
       <TextInput  maxLength={7} placeholder='Postal Code'  style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'  />
       </View>
   
     <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Phone:</Text>
       <TextInput  maxLength={13} keyboardType={'phone-pad'} placeholder='Phone'  style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'  />
       
     
     </View>
     <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>Email:</Text>
       <TextInput  placeholder='Email'  style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'  />
     </View>
     <View style={styles.flexrow1}>
       <Text style={styles.labelwidth}>NI Number:</Text>
       <TextInput  maxLength={9} style={styles.inputBox} placeholder='NI Number'  underlineColorAndroid='rgba(0,0,0,0)'  />
     </View>
   
   
   <TouchableOpacity onPress={() =>this.profileUpdate()} style={styles.log_btn} >
   <Text style={styles.btn_text}>Update</Text>
   </TouchableOpacity>
   
   </ScrollView>
   </View>
     );
  }
}

export default FlatListDemo;


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#eee',
    flexDirection:"column",
    justifyContent:'center',
    alignItems:'center',

  },
  
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#007173',
    paddingVertical:30, 
    color:'#ffffff',
    fontSize:18,
    padding:15,
  },

  onebox:{
      backgroundColor:'#ff00aa',
      textAlign:"left",
      fontSize:24,
      color:'#ffffff',
      textAlignVertical:"center",
      marginBottom:1,
      justifyContent:"space-evenly",
      paddingVertical:60,
      paddingLeft:20,
  },

  coricon:{
    fontSize:16,
      color:'#ffffff',
  },

  CardItembg:{
    backgroundColor:'#ff00aa',
    marginBottom:15,
    height:70,

  },
  
card_headtext:{
  fontSize:20,
  color:'#ffffff',
  paddingLeft:15,

},

cardicon:{  fontSize:20,
  color:'#ffffff',},

headerbg:{
  backgroundColor:'#ff00aa',
},

labelwidth:{
  width:120,
  marginVertical:10,
  paddingLeft:10,
},
log_btn:{
  backgroundColor:"#ff00aa",
  borderRadius:5,
  paddingVertical:8,
  marginVertical:10,
  fontSize:20,
  justifyContent:'center',
  alignItems:'center',
  marginLeft:15,
  marginRight:15,

},

btn_text:{
  color:'#ffffff',
  fontWeight:'300',
  textAlign:'center',
  fontSize:18,
},

inputBox:{
  width:225,
  borderRadius:5,
  marginVertical:5,
  borderColor:'#ccc',
  borderWidth:1,
  backgroundColor:'#fff'
},
textBoxcontainer:{
  width:"100%",
position:'relative',
alignItems:'center',
justifyContent:'center',
},

thouchablebtn:{
 position:'absolute', 
 right:35,
 width:35,
 height:40,
 padding:2,
 paddingVertical:10,
},

flexrow1:{
flex:1,
 flexDirection:"row",
},

labelwidth:{
  width:"25%",
  marginVertical:20,
  paddingLeft:10,
  fontSize:14,
},

inputBox:{
  width:225,
  borderRadius:5,
  paddingLeft:10,
  marginVertical:10,
  fontSize:14, 
  marginLeft:30,
  height:40,
  borderColor:'#ccc',
  borderWidth:1,
  position:'relative',
  
},



thouchablebtn:{
 position:'absolute', 
 right:-4,
 width:35,
 height:40,
 padding:2,
 paddingVertical:10,
},



});


