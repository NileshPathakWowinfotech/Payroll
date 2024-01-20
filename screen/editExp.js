import {
  View, Text, DatePicker, Button, Touchable, StyleSheet, Image, TextInput, Alert, Linking,
  TouchableOpacity, ActivityIndicator, Route
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import style from './styleSheet';
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PermissionsAndroid } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { RNCamera, FaceDetector } from 'react-native-camera';
import DocumentPicker from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown';
// import Modal from 'react-native-modal';


const editExpense = ({ route, navigation }) => {
  const [value, setValue] = useState('');
  const [taxYear, setTaxyear] = useState([]);
  const [periodEnd, setPeriodEnd] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isModelGallery, setModelGallery] = useState(false);
  const [camerClk, setCamera] = useState('');
  const [base64Array, setbase64Array] = useState([]);
  const [img, setImg] = useState({
    images: []
  });

  const [data, setData] = useState(
    {
      taxYear: [],
      periodEnd: '',
      compnyCode: '',
      token: '',
      prefix: '',
      url: '',
      selectedTaxYear: '',
      selectedPeriodEnd: '1',
      imageBase64: [],
    },

  );

  const textRef = useRef(null)
  useEffect(() => {
    console.log("USEEFFECT================================");
    AsyncStorage.getItem('userDetails').then(res => {
      AsyncStorage.getItem('companyCode').then(compCod => {
        AsyncStorage.getItem('urlPrefix').then(prefix => {
          result = JSON.parse(res);
          data.token = result.AuthToken;
          data.compnyCode = compCod;
          data.prefix = prefix;
          data.url = "http://" + prefix + ".nomismasolution.co.uk/AccountREST/Accountservice.svc/" + prefix + "/" + data.token + "/" + data.compnyCode + "/";
          console.log("User Details !!=== ", result.AuthToken);
          getTaxyerPeriodEnd();
        });
      });
    })

  }, []);

  const getTaxyerPeriodEnd = () => {
    let url = data.url + 'GetPayrollTaxYearInfo';
    fetch(url, {
      method: 'GET',
      //Request Type       
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response ========== ", JSON.stringify(responseJson.ResultInfo))
        let dropdown = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(dropdown);
        data.periodEnd = parseData.payPeriodEnd[0].PeriodEnd;
        console.log("DropDown List ====== ", parseData);
        console.log("Tax Year ===========", parseData.taxYearInfo);
        let dropDownData = [];
        parseData.taxYearInfo = parseData.taxYearInfo.map(item => {
          item.value = item.TaxYearCode
          item.label = item.TaxYearName
          return item;
        });
        parseData.payPeriodEnd = parseData.payPeriodEnd.map(item => {
          console.log("ITEM ==================== ", item);
          item.value = '1'
          item.label = moment(item.PeriodEnd).format("DD/MM/YYYY")
          return item;
        });

        console.log("parseData.taxYearInfo ============ ", parseData.taxYearInfo);
        console.log("parseData.payPeriodEnd=== ", parseData.payPeriodEnd);
        data.selectedTaxYear = parseData.taxYearInfo[0].TaxYearCode;
        getExpDetails(parseData.taxYearInfo[0].TaxYearCode);
        setTaxyear(parseData.taxYearInfo);
        setPeriodEnd(parseData.payPeriodEnd);
        setValue('1')
        console.log("DATA =========== ", data);

        return;




      });

  }

  const getExpDetails = (taxYear) => {

    console.log('Get EXp Details Request ========= ', JSON.stringify({
      token: data.token,
      taxYear: taxYear,
      periodEnd: '',
      companyCode: data.compnyCode
    }));
    let url = data.url + 'GetPayrollTaxYearInfo';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.token,
        taxYear: taxYear,
        periodEnd: '',
        companyCode: data.compnyCode
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response ========== ", JSON.stringify(responseJson.ResultInfo))
        let dropdown = JSON.stringify(responseJson.ResultInfo);
        let parseData = JSON.parse(dropdown);
        console.log("DATA =========== ", data);

        return;

      });

  }

  const requestCameraPermission = async () => {
    try {

      console.log("Helllooooooooooooooo");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(" PermissionsAndroid.RESULTS.GRANTED  === ", PermissionsAndroid.RESULTS.GRANTED)
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

          console.log("res ================ ", res);



        });

    } catch (err) {
      console.warn(err);
    }

  }

  const toggleModalVisibility = () => {
    console.log("toggleModalVisibility ========= ", toggleModalVisibility)
    setModelGallery(!isModelGallery);
  };



  takePicture = async () => {
    console.log("111111111111111111");
    try {
      console.log("222222222222222222222222======= ", Math.floor(100000 + Math.random() * 900000));
      const options = { quality: 0.5, base64: true };

      const data = await textRef.current.takePictureAsync(options);
      // console.log(data, '<<<<<<<<<<<<<<<<<<<<<');
      // var joined = {CamBase64:data.base64,camUri:data.uri,randonNum:Math.floor(100000 + Math.random() * 900000)}
      var joined = { camUri: data.uri, randonNum: Math.floor(100000 + Math.random() * 900000) }

      base64Array.push(joined)
      img.images.push(joined)

      console.log("Length ============ ", base64Array);
      console.log("3333333333333333333333333", isModelGallery.toString());
      setModelGallery(false);

    } catch (error) {
      console.log(error, "ERROR <<<<<<<<<<<<<44444444444444444444")
    }

  };

  //open file picker
  const documentPicker = () => {
    console.log("documentPicker open");

    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // .then(res=>{

      //   console.log('DATD IMAGE'+
      //    JSON.stringify(res) 
      //   );

      //   console.log("Response ================== ",res.uri);
      //   var joined = {camUri:res.uri,randonNum:Math.floor(100000 + Math.random() * 900000)}
      //   base64Array.push(joined)
      //   img.images.push(joined)
      //   // base64Array([...joined, ...joined]);
      // });

      // toggleModalAttachment("add","0")

    } catch (err) {
      console.log("Error ===== ", err);
      if (DocumentPicker.isCancel(err)) {
        console.log('anmitfjf ' + err)
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log("Error 2222222222===== ", err);
        throw err;
      }
    }
  }

  return (

    <View style={style.container}>
      {/* <Modal animationType="slide" 
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
                   } } style={style.label}>Attach Here:  <Icon name='close'  size={20} color="#7d7d7d" /></Text>
           </View>
 
           <View onPress={() => takePicture()} style={{
           
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
 
     
 </Modal> */}


      <ScrollView>
        <View style={style.labelinput}>
          <Text style={style.label}>Expense Type:</Text>
          <View style={{ width: "65%", height: 40, }}>
            {/* <DropDownPicker
                    items={taxYear}
                    defaultValue={data.selectedTaxYear}
                    containerStyle={{ flex:1,}}
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
                /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={taxYear}

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="`Select Tax Year`"
              value={data.selectedTaxYear}
              onChange={item => {
                console.log("ITEM ==== ", item.value);
                data.selectedTaxYear = item.value
                getExpDetails(data.selectedTaxYear, data.selectedPeriodEnd)
                // getExpDetails();

              }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
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
          <View style={{ width: "65%", height: 40, }}>
            {/* <DropDownPicker
              items={taxYear}
              defaultValue={data.selectedTaxYear}
              containerStyle={{ flex: 1, }}
              style={{ backgroundColor: '#ffffff' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                console.log("ITEM ==== ", item.value);
                data.selectedTaxYear = item.value
                getExpDetails(data.selectedTaxYear, data.selectedPeriodEnd)
                // getExpDetails();

              }}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={taxYear}

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="`Select Tax Year`"
              value={data.selectedTaxYear}
              onChange={item => {
                console.log("ITEM ==== ", item.value);
                data.selectedTaxYear = item.value
                getExpDetails(data.selectedTaxYear, data.selectedPeriodEnd)
                // getExpDetails();

              }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            />


          </View>

        </View>
        <View style={style.labelinput}>
          <Text style={style.label}>Amount:</Text>
          <View style={{ width: "65%", height: 40, }}>
            {/* <DropDownPicker
              items={taxYear}
              defaultValue={data.selectedTaxYear}
              containerStyle={{ flex: 1, }}
              style={{ backgroundColor: '#ffffff' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                console.log("ITEM ==== ", item.value);
                data.selectedTaxYear = item.value
                getExpDetails(data.selectedTaxYear, data.selectedPeriodEnd)
                // getExpDetails();

              }}
            /> */}

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={taxYear}

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="`Select Tax Year`"
              value={data.selectedTaxYear}
              onChange={item => {
                console.log("ITEM ==== ", item.value);
                data.selectedTaxYear = item.value
                getExpDetails(data.selectedTaxYear, data.selectedPeriodEnd)
                // getExpDetails();

              }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            />

          </View>

        </View>

        <View style={style.labelinput1}>
          <Text style={style.label}>Receipt: IMG6873265JPEG</Text>

          <View>
            <Text onPress={() => {

              console.log("Clicked");
              // toggleModalVisibility()
              documentPicker();


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

        <View style={style.btn_pink}><Text style={style.btn_label}>Save & New</Text></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
          <View style={style.btn_white}><Text style={style.btn_label_black}>Cancel</Text></View>
          <View style={style.btn_pink50}><Text style={style.btn_label}>Save </Text></View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    color: "black",
    padding: 10,
    height: 35,
    borderRadius: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    backgroundColor: "white"


  },
  icon: {
    paddingLeft: 6,
    marginRight: 10,
  },
  placeholderStyle: {
    color: "black",
    paddingLeft: 10,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,

  },


})
export default editExpense;