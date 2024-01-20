import { Button, SafeAreaView, StyleSheet, Modal, 
    View, TextInput, Dimensions } from "react-native";
  const { width } = Dimensions.get("window");
  
  
  export default StyleSheet.create({
  
   
  container:{
    flex:1,
    padding:15,
  },
  labeldrop:{
    marginLeft:30, width:'72%',
    textAlignVertical:"center",
    zIndex:99999,
  },
  labeldrop1:{
    marginLeft:17, width:'71%',
    textAlignVertical:"center",  zIndex:9999,
  },
  labelinput:{
    flexDirection:'row',
    marginVertical:10,
    justifyContent:"space-between",
  },
  labelinput1:{
    flexDirection:'row',
    marginVertical:20,
    justifyContent:"space-between",
  },
  label:{
    fontSize:16,
    color:'#000000',
    textAlignVertical:"center",
  },
  boxrow:{
    flexDirection:'row',
    marginTop:10,
  },
  boxview_pending:{
    width:100,
    height:100,
    backgroundColor:'#FFD133',
    color:'#ffffff',
    marginRight:10,
  },

  boxview_Approve:{
    width:100,
    height:100,
    backgroundColor:'#7DCA20',
    color:'#ffffff',
    marginRight:10,
  },
  boxview_rejected:{
    width:100,
    height:100,
    backgroundColor:'#EC581F',
    color:'#ffffff',
    marginRight:10,
  },
  boxview_draft:{
    width:100,
    height:100,
    backgroundColor:'#C5C5C5',
    color:'#ffffff',
    marginRight:10,
  },
  boxview_all:{
    width:100,
    height:100,
    backgroundColor:'#63BCDF',
    color:'#ffffff',
    marginRight:10,
  },
  status:{
    color:'#ffffff',
    padding:10,
    paddingTop:8,
   
  },
  status_no:{
   alignItems:'stretch',
 justifyContent:'space-between',
   color:'#ffffff',
   marginTop:10,
    padding:8,
    fontSize:30,

  },
  rexp:{
    flexDirection:'row', 
    padding:10,
    backgroundColor:"#ffffff",
    borderRadius:5,
    marginTop:10,
  },
  rexp1:{
    width:'40%',
    paddingVertical:4,
  },
  rexp1_amt:{
    width:'30%',
    fontSize:18,
  },
  rexp1_icon:{
    width:'30%',
    fontSize:20,
    fontWeight:'bold',
    color:'red',
    textAlign:'center',
  },
  taxYrDrp1:{
    height:100,
    width:300,
    margin:20,
    
  },
  dropd2: {

    borderColor: "#D5D5D5", height: 40,

    marginBottom: 10,

    width: '97%',

    marginLeft: 10,

  },
  appexplist1:{
    backgroundColor:"#ffffff",
    padding:10,
    marginBottom:20,
       
    },
  appexplist:{
    backgroundColor:"#ffffff",
    padding:0,
    flexDirection:'row',
    
    },
    expdes:{
      paddingLeft:10,
      width:'60%',
    },
    expdes1:{
        width:'40%',
       
    },
    expdes_head:{
      fontSize:18,
    },
    expdes_head1:{
      fontSize:12,
      lineHeight:20,
    },
    expdes_head2:{
      fontSize:12,
      marginTop:20,
    
    },
    expdes_des:{
      fontSize:12,
      color:"gray",
      paddingTop:8,
     
    },
    expdes_des1:{
      fontSize:12,
      color:"gray",
      padding:5,
     
    },
    listamt:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:10,
    },
    listamt1:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingLeft:10,
      width:'40%',
    },
    expdes_date:{
      textAlign:'left',
      fontWeight:'bold',
    },

    expdes_amt1:{
      fontSize:20,
      color:'#ff00aa',
      fontWeight:'bold',
      textAlign:'right',
    },
    subdates:{
      flexDirection:"row",
    },

    datestyle:{
      textAlign:'center',
      marginTop:20,
   
    },
    
    datestyleR:{
      textAlign:'center',
      marginTop:20,
      color:"green",
   
    },
    datestyle1:{
      textAlign:'center',
      marginTop:10,
   
    },
    righticon:{
      flex:1,
      marginTop:5,
  
    },
    btn_pink:{
      backgroundColor:"#ff00aa",   
      padding:8,
      marginVertical:30,
      borderRadius:5,

    },
    btn_pink50:{
      backgroundColor:"#ff00aa",   
      padding:8,
      marginVertical:30,
      borderRadius:5,
      width:"48%",

    },

    btn_white:{
      backgroundColor:"#ffffff",   
      padding:8,
      marginVertical:30,
      borderRadius:5,
      borderColor:"#7d7d7d",
      borderWidth:0.5,
      width:"48%",

    },


    btn_label:{
      textAlign:"center",
      color:"#ffffff",
      fontSize:20,
    },

    btn_label_black:{
      textAlign:"center",
      color:"#7d7d7d",
      fontSize:20,
    },

    expdes_head_all:{
      fontSize:12,
      color:"gray",
     paddingVertical:5,
       
    },

    expdes_amt_all:{
      fontSize:18,
      color:'#000',
      fontWeight:'600',
      textAlign:'center',
      paddingVertical:3,
    },
    expdes1_all:{
      width:'50%',
     
  },
  listamt1_all:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
    width:'40%',
  },
  
  desbox:{
    alignItems: 'center',
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    borderColor:"lightgrey",
    borderRadius: 5,
    textAlignVertical:'top',
    borderWidth:0.5,
    marginTop:10,
  },
  inputBox: {
    width: "65%",
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    fontSize: 14,
    marginLeft: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'relative',
    backgroundColor: '#fff'

  },
 
  pendinglist:{
    padding:20,
    flexDirection:"row",
  },

  pendingemplist1: {
      width: "40%",
    },
    pendingemplist2: {
      width: "30%",
    },
    pendingemplist3: {
      width: "30%",
      flexDirection:"row",
    },

      pendingempname:{
        fontSize:14,
        color:"#ff00aa",
      },

      pendingempexp:{
        fontSize:12,
        color:"#676a6c",
      },

      pendingempamt:{
        fontSize:14,
        color:"#000000",
      },
      pendingcircle:{
        width: 40,
        height: 40,
        justifyContent: "center",
        borderRadius: 60 / 2,
        backgroundColor: '#FFD133',
        marginRight:30,
      },
      Approvedcircle:{
        width: 40,
        height: 40,
        justifyContent: "center",
        borderRadius: 60 / 2,
        backgroundColor: '#FFD133',
        marginRight:30,
      },
      rejectcircle:{
        width: 40,
        height: 40,
        justifyContent: "center",
        borderRadius: 60 / 2,
        backgroundColor: '#FFD133',
        marginRight:30,
      },
      pendingcircletext:{
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
      },
      tabrate_icon_pending2:{
       
        color:"#000000",
      },
      expdetail1:{
        flexDirection:"row",
      
      },
      expdetail_pink_amt:{      
        padding:20,
        backgroundColor:"#ffffff",
        borderRadius:5,
        marginRight:25,
        width:"45%",
        textAlign:"center",
        justifyContent:"center",
      },
      expdetail_pink_amt1:{
        color:"#ff00aa",
        fontSize:18,
        textAlign:"center",
        justifyContent:"center",
      },
      expdetail_pink_amt2:{
        color:"#000000",
        fontSize:18,
        textAlign:"center",
        justifyContent:"center",
      },
      expdetail2:{
        marginTop:20,
        
      },
      expdetail2_destext:{
        color:"#676a6c",
        fontSize:14,
        marginTop:10,
      },
      expdetail_Sub_date: {
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 5,
          width: "100%",
          marginTop: 20,
        },

        expdetail2_destext1: {
          color: "#676a6c",
          fontSize: 14,
        },
        expsdatepick:{
    alignSelf:"flex-end",
        },

        explefticon:{
    
         marginRight:20,
       
          
          },

          Approve_btn:{
            width:"50%",
            backgroundColor:"#7DCA20",
            borderRadius:5,
            paddingVertical:7,
            marginVertical:25,
            fontSize:18,
            height:40,
            
            textAlign:'center',
            color:'#ffffff',
           
          
          },

          reject_btn:{
            width:"50%",
            backgroundColor:"#EC581F",
            borderRadius:5,
            paddingVertical:7,
            marginVertical:25,
            fontSize:18,
            height:40,
            textAlign:'center',
            color:'#ffffff',
           
          
          },

    });
    
    