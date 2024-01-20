import {View,Text,Image,ToastAndroid} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomPopup } from './BottomPopup';
import { HeaderComponent } from './header';



const Screen4 = ({navigation})=>{
  //BottomPopup
const popuplist =[
  {
    id: 1,
    name: 'Add Leaves',
    //action:()=> navigation.navigate('profile2'),
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
    return (
      <>
        <HeaderComponent />
        {/* <Text style={{color: "#ff00aa", justifyContent: "center", textAlign: "center", padding: 20, fontSize: 20,marginTop: 250, fontWeight: 'bold'
        }}>Coming Soon</Text> */}
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <TouchableOpacity
            onPress={onShowPopup}
            style={{
              alignSelf: 'flex-end',
              position: 'relative',
              bottom: 12,
              right: 12,
            }}>
            {/* <Image
              style={{width: 60, height: 60}}
              source={require('../images/app_icns_Plus_Icon.png')}
            /> */}
          </TouchableOpacity>
          {/* For bottomPopup */}
          <BottomPopup
            //  title="Demo popup"
            ref={(target) => (popupRef = target)}
            onTouchOutside={onClosePopup}
            data={popuplist}
          />
        </View>
      </>
    );
};


export default Screen4;