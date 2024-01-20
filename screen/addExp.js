import {
  View, Text, DatePicker, Button, Touchable, StyleSheet, Image, TextInput, Alert, Linking,
  TouchableOpacity, ActivityIndicator, Route, ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import style from './styleSheet';
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { RNCamera, FaceDetector } from 'react-native-camera';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { log } from 'react-native-reanimated';

const addExpense = ({ route, navigation }) => {
  const [value, setValue] = useState('');
  const [expenseType, setExpenseType] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isModelGallery, setModelGallery] = useState(false);
  const [isAttachment, setAttachment] = useState(false);
  const [camerClk, setCamera] = useState('');
  const [base64Array, setbase64Array] = useState([]);
  const [img, setImg] = useState({
    images: []
  });

  const [data, setData] = useState(
    {
      expenseType: [],
      compnyCode: '',
      compnyCodee: '',
      token: '',
      prefix: '',
      url: '',
      selectedExpenseType: '',
      imageBase64: [],
    //  accountCodeExpenseType: '',
      amount: '',
      description: '',
    },

  );
  // const Stack = createStackNavigator();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    let d = moment(selectedDate).format("DD/MM/YYYY");
    data.date = d;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const textRef = useRef(null)
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
            console.log("User Details !!=== ", result.AuthToken);
            console.log("URL-GetExpenseHeadExpenseItem====" + data.url);
            getExpenseType();
          });
        });
      });
    })

  }, []);

  const getExpenseType = () => {
    //let expenseTypeArr = [];
    let expenseTypeArr = [];
    let url = data.url + 'GetExpenseHeadExpenseItem';
    console.log("getExpenseTypeUrl==" + url);
    fetch(url, {
      method: 'GET',
      //Request Type       
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("ResponseResultInfo ========== ", JSON.stringify(responseJson.ResultInfo));
        console.log("Response ========== ", JSON.stringify(responseJson.ResultInfo[0].ExpenseHeadName));
        let dropdown = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(dropdown);
        // let accountCode = JSON.stringify(responseJson.ResultInfo[0].AccountCode);
        // console.log("accontCode===="+accountCode);
        let leng = responseJson.ResultInfo.length;

        if (leng > 0 && responseJson.ResultInfo) {
          for (let i = 0; i < leng; i++) {
            var joined = { value: parseData[i].AccountCode, label: responseJson.ResultInfo[i].ExpenseHeadName }
            expenseTypeArr.push(joined)

          }
          // this.setState({
          //   selectedExpenseType: expenseTypeArr,
          //   expenseType: expenseTypeArr?.[0]?.value
          //   // error: responseJson.error || null,
          //   // loading: false,

          // });

        }

        setExpenseType(expenseTypeArr);
        return;

      });

  }

  const addExpenseSaveAndNew = () => {

    AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {   //This is payrollcompanycode
        AsyncStorage.getItem('companycodee').then(comnyCod => { //This is CompanyCode
        data.isloading = true;
         console.log("Hello=="+res);
        var payrollCompanyCode =compCod;
        var companycodee =comnyCod;
        var result = new Array();
        result = JSON.parse(res);
       var payrollEmployeeCode = result.PayrollEmployeeCode;
        console.log("payrollEmployeeCode====="+payrollEmployeeCode);
        //http://regression.nomismasolution.co.uk/AccountREST/AccountService.svc/regression/2d7b2f96-9dc6-47fa-a2b4-d15dadb3d044/AddEmployeeExpences
        const url = "http://" + ress + ".nomismasolution.co.uk/AccountREST/AccountService.svc/" + ress + "/" + result.AuthToken + "/AddEmployeeExpences";
        console.log("PostURL==" + url);
        Alert.alert(data.selectedExpenseType.toString());
        console.log("JSon.save&NewAPI========="+JSON.stringify({
          ExpenseId: "0",
          PayrollCompanyCode: payrollCompanyCode,
          PayrollEmployeeCode: payrollEmployeeCode,
          CompanyCode: companycodee,
          AccountCode: data.selectedExpenseType,
          AccountName: "8",
          PeriodEnd: "0",
          Amount: data.amount,
          Description: data.description,
          Comment: "48011",
          TaxYearCode: "8",
          status: "1",
          UserCode: 0
        }));

        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            ExpenseId: "0",
            PayrollCompanyCode: "39197",
            PayrollEmployeeCode: "48011",
            CompanyCode: companycodee,
            AccountCode: data.selectedExpenseType,
            AccountName: "8",
            PeriodEnd: "0",
            Amount: data.amount,
            Description: data.description,
            Comment: "48011",
            TaxYearCode: "8",
            status: "1",
            UserCode: 0
          })
        })
          .then((response) => response.json())
          .then((json) => {
            data.isloading = false;
            // setData(json.ResultInfo)
            if (json.IsSuccess) {
              navigation.replace('addExpense');
              ToastAndroid.show('Successfull! Add Expense.', ToastAndroid.SHORT, [
                { text: 'Okay' }

              ]);
            } else {
              ToastAndroid.show('OOPS! Something Went wrong.', ToastAndroid.SHORT, [
                { text: 'Okay' }

              ]);

            }

          })
          .catch((error) => {
            data.isloading = false;
            console.error(error)
          }
          )
        // ).finally(() => setLoading(false));
        })
        })
      })
    })

  }

  const addExpenseSave = () => {

    AsyncStorage.getItem('urlPrefix').then(ress => {
      AsyncStorage.getItem('userDetails').then(res => {
        AsyncStorage.getItem('companyCode').then(compCod => {   //This is payrollcompanycode
        AsyncStorage.getItem('companycodee').then(comnyCod => { //This is CompanyCode
        data.isloading = true;
        var payrollCompanyCode = compCod;
        var companycodee =comnyCod;
        var result = new Array();
        result = JSON.parse(res);
        var payrollEmployeeCode = result.PayrollEmployeeCode;
        //http://regression.nomismasolution.co.uk/AccountREST/AccountService.svc/regression/2d7b2f96-9dc6-47fa-a2b4-d15dadb3d044/AddEmployeeExpences
        const url = "http://" + ress + ".nomismasolution.co.uk/AccountREST/AccountService.svc/" + ress + "/" + result.AuthToken + "/AddEmployeeExpences";
        console.log("PostURL==" + url);
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            ExpenseId: "0",
            PayrollCompanyCode: payrollCompanyCode,
            PayrollEmployeeCode:payrollEmployeeCode,
            CompanyCode: companycodee,
            AccountCode: "8",
            AccountName: "8",
            PeriodEnd: "0",
            Amount: data.amount,
            Description: data.description,
            Comment: "48011",
            TaxYearCode: "8",
            status: "1",
            UserCode: 0
          })
        })
          .then((response) => response.json())
          .then((json) => {
            data.isloading = false;
            // setData(json.ResultInfo)
            if (json.IsSuccess) {
              navigation.navigate('HomeOne');
              ToastAndroid.show('Successfull! Add Expense.', ToastAndroid.SHORT, [
                { text: 'Okay' }
              ]);
            } else {
              ToastAndroid.show('OOPS! Something Went wrong.', ToastAndroid.SHORT, [
                { text: 'Okay' }

              ]);

            }

          })
          .catch((error) => {
            data.isloading = false;
            console.error(error)
          }
          )
        // ).finally(() => setLoading(false));
        })
        })
      })
    })

  }


  
  const requestCameraPermission = async () => {
    try {
  
      console.log("Helllooooooooooooooo");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(" PermissionsAndroid.RESULTS.GRANTED  === ",PermissionsAndroid.RESULTS.GRANTED)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        cameraOpen()
         

      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const cameraOpen = async () => {
    console.log("Camera Open======")
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      console.log("Camera Open====== 22")

      launchCamera(options,
        (res) => {
          
          console.log("res ================ ",res);
          
       
        
     });

    } catch (err) {
      console.warn(err);
    }
  
  }

  const toggleModalVisibility = () => {
    console.log("toggleModalVisibility ========= ",toggleModalVisibility)
    setModelGallery(!isModelGallery);
  };

   const attachmentSetting = () => {
    console.log("Attachment ========= ",!isAttachment)
    setAttachment(!isAttachment);
  };

  takePicture = async () => {
    console.log("111111111111111111");
    try {
      console.log("222222222222222222222222======= ",Math.floor(100000 + Math.random() * 900000));
      const options = { quality: 0.5, base64: true };
      const data = await textRef.current.takePictureAsync(options);
      // console.log(data, '<<<<<<<<<<<<<<<<<<<<<');
      // var joined = {CamBase64:data.base64,camUri:data.uri,randonNum:Math.floor(100000 + Math.random() * 900000)}
      var joined = {camUri:data.uri,randonNum:Math.floor(100000 + Math.random() * 900000)}

      base64Array.push(joined)
      img.images.push(joined)
     
    console.log("Length ============ ",base64Array);
      console.log("3333333333333333333333333",isModelGallery.toString());
      setModelGallery(false);
      
      } catch (error) {
          console.log(error, "ERROR <<<<<<<<<<<<<44444444444444444444")
      }
      
  };


  const documentPicker=()=>{
    console.log("documentPicker open");
    return;
   
    try {
       DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      }).then(res=>{
       
        console.log('DATD IMAGE'+
         JSON.stringify(res) 
        );

        console.log("Response ================== ",res.uri);
        var joined = {camUri:res.uri,randonNum:Math.floor(100000 + Math.random() * 900000)}
        base64Array.push(joined)
        img.images.push(joined)
        // base64Array([...joined, ...joined]);
      });
    
     // toggleModalAttachment("add","0")
      
    } catch (err) {
      console.log("Error ===== ",err);
      if (DocumentPicker.isCancel(err)) {
        console.log('anmitfjf '+err)
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log("Error 2222222222===== ",err);
        throw err;
      }
    }
  }

    return (
      
      <View style={style.container}>
<Modal animationType="slide" 
        isVisible={isModelGallery}
       //transparent visible={isModelGallery} 
       presentationStyle="overFullScreen" 
       onDismiss={toggleModalVisibility}
       backdropOpacity={0.5}
       onBackdropPress={toggleModalVisibility}
       coverScreen={true}
       >

<View
style={{alignItems:'center',backgroundColor:'#ffffff',height:'100%',width:'100%'}}>

    <RNCamera
          // ref={cam => {
          //   this.camera = cam;
          // }}
          ref={textRef}
          
          playSoundOnCapture={true}
          // flashMode={RNCamera.Constants.FlashMode.on}
          // flashMode={this.state.flash}
          style={{
            flex:1,
            width:"100%",
            // width:Dimensions.get('screen').width
            height:"100%"

          }}
          
        >
          <View>
          <Text onPress={()=>{
                  console.log("Clicked");
                  setModelGallery(false);
                  // requestCameraPermission();
                  // attachmentSetting()
                  
                  } } style={style.label}>Attach Here:  <Icon name='close'  size={20} color="#7d7d7d" /></Text>
          </View>

          <View style={{
          
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: "center",

          }}>

        <TouchableOpacity onPress={() =>takePicture()} >
    <View  onPress={() => takePicture()} style={{position:"relative", backgroundColor:"#000000",justifyContent: 'center', borderColor:"#ffffff", borderWidth:2,
            alignItems: 'center', padding:5,  borderRadius:50,height:50,width:50,marginLeft:0, marginRight:30, }}>
        
        <View style={
          {
            backgroundColor:"#000000",justifyContent: 'center', width:"100%",
            alignItems: 'center',  borderRadius:38,height:38,width:38, borderColor:"#ffffff", borderWidth:1,
           }
          }>
            
          </View>
        
    </View>
    </TouchableOpacity>
        </View>

        </RNCamera>
</View>

    
</Modal>


               <Modal animationType="slide" 
                    isVisible={isAttachment}
                   //transparent visible={isModelGallery} 
                   presentationStyle="overFullScreen" 
                   onDismiss={attachmentSetting}
                   backdropOpacity={0.5}
                   onBackdropPress={attachmentSetting}
                   coverScreen={true}
                   >  

                   <View>
                    <View style={style.modalView}>
                    <View style={style.popupGalleryBack}>
                    <TouchableOpacity
                      onPress={()=>{ toggleModalVisibility() }}
                    >
            <View style={style.popUpGallery}>
            <View style={{justifyContent:'center',marginLeft:10,marginRight:5}}>

            <Icon name="camera" size={25} color="#363739" />
             </View>
            <Text style={style.popupText}>CAMERA</Text>
            
            </View>
            </TouchableOpacity>

            
            <TouchableOpacity   
             onPress={ documentPicker()}  >
            <View style={style.popUpGallery}>
            <View style={{justifyContent:'center',marginLeft:10,marginRight:5}}>
            <Icon  name="th-large" size={25} color="#363739" />
            </View>
          
            <Text style={style.popupText}>GALLERY</Text>
            </View>

            </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{  attachmentSetting()}} >
            <View style={style.popUpGallery}>
            <View style={{justifyContent:'center',marginLeft:12,marginRight:6}}>
            <Icon  name="close" size={25} color="#363739" />
            </View>
          
            <Text style={style.popupText}>CANCEL</Text>
            </View>

            </TouchableOpacity>

                    </View>
                    </View>
                    </View>  

        </Modal> 

      <ScrollView>
        <View style={style.labelinput}>
          <Text style={style.label}>Expense Type:</Text>
          <View style={{ width: "65%", height: 40, }}>
            <DropDownPicker
              items={expenseType}
              defaultValue={data.selectedExpenseType}
              containerStyle={{ flex: 1, }}
              style={{ backgroundColor: '#ffffff' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                console.log("ITEM ==== ", item.value);
                data.selectedExpenseType = item.value
                console.log(" data.selectedExpenseType===="+ data.selectedExpenseType)
                getExpenseType(data.selectedExpenseType)
                // getExpDetails();

              }}
            />

          </View>

        </View>

        <View style={{ marginTop: 20, }}>
          <Text style={style.label}>Description:</Text>
          <TextInput
            placeholder="Enter text here"

            multiline={true}
            numberOfLines={5}
            keyboardType={
              Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'
            }
            style={style.desbox}

          />
        </View>
        <View style={style.labelinput}>
          <Text style={style.label}>Date:</Text>
          <View style={{
            width: "65%", borderRadius: 5, paddingLeft: 10, marginVertical: 10, fontSize: 14, marginLeft: 30, height: 40, borderColor: '#ccc', borderWidth: 1, position: 'relative', backgroundColor: '#fff'
          }}>
            <Text style={{ paddingVertical: 10 }}>{data.date}</Text>
            <View style={{
              position: 'absolute', right: 5, width: 35, height: 40, padding: 2, paddingVertical: 10,
            }}><Icon name='calendar' onPress={showDatepicker} size={18} color="#a1a1a1" /></View>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

        </View>
        <View style={style.labelinput}>
          <Text style={style.label}>Amount:</Text>
          <TextInput
            defaultValue={data.amount}
            onChangeText={(item) => data.amount = item}
            keyboardType="numeric"
            maxLength={30} style={style.inputBox} onChangeItem={(item) => data.amount = item.value} placeholder="Amount" underlineColorAndroid='rgba(0,0,0,0)' />
        </View>

        <View style={style.labelinput1}>
          <Text style={style.label}>Receipt: IMG6873265JPEG</Text>

          <View>
            <Text onPress={() => {

              console.log("Clicked");
              // toggleModalVisibility()
             // documentPicker();
             attachmentSetting();


            }} style={style.label}>Attach Here: <Icon name='paperclip' size={20} color="#7d7d7d" /></Text>

          </View>

        </View>

        <FlatList
          // data={base64Array}
          data={img.images}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={{ width: 80, height: 100, backgroundColor: "grey", marginTop: 10, margin: 3, }}>
              <Image style={{ width: 80, height: 100, }}
                source={{ uri: item.camUri }}
              // source={require(item.camUri)}
              />
            </View>
          )}
          keyExtractor={item => item.randonNum}
        />

        <TouchableOpacity onPress={() => addExpenseSaveAndNew()} style={style.btn_pink}>
          <Text style={style.btn_label}>Save & New</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeOne')} style={style.btn_white}>
            <Text style={style.btn_label_black}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addExpenseSave()} style={style.btn_pink50}  >
            <Text style={style.btn_label}>Save </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};


export default addExpense;

