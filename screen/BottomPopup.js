import {
    Modal, dimensions, TouchableWithoutFeedback,
    StyleSheet, View, Text, Dimensions, FlatList, Alert, TouchableOpacity
} from "react-native";
import React from "react";
import { IconButton } from 'react-native-paper';

const deviceHeight = Dimensions.get("window").height
export class BottomPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    show = () => {
        this.setState({ show: true })

    }
    close = () => {
        this.setState({ show: false })
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const { title } = this.props
        return (
            <View >
                <Text style={{
                    color: '#182e44',
                    fontSize: 25,
                    fontWeight: '500',
                    margintop: 0,
                    marginBottom: 0,
                }}>
                    {title}
                </Text>
                <IconButton onPress={this.close} size={30} color='grey' icon='close' style={{ position: 'absolute', right: -20, top: -10, zIndex:10 }} />
            </View>
        )
    }

    renderContent = () => {
        const { data } = this.props
        return (
            <View>
                <FlatList
                    style={{ marginBottom: 10 }}
                    showVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                // ItemSeperatorComponent={this.renderSeperator}
                // contentContainerStyle={{
                //     paddingBottom:0
                // }}
                />


            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (
                                                               //For border btwn option
            <TouchableOpacity style={{ borderBottomWidth: index == 1 ? 0 : 0.2 }} onPress={
                //For pop closed when click on option and navigate page
                () => { this.close(), item.action() }
            }>


                <Text style={{ borderBottomWidth: 5, borderBottomColor: '#ffffff', fontSize: 23, fontWeight: 'normal', color: '#182e44', padding: 10, }}>{item.icon} {item.name} </Text>


            </TouchableOpacity>

        )
    }

    // renderSeperator = () =>{
    //     <View
    //     style={{
    //         opacity: 0.1,
    //         backgroundColor: '#182e44',
    //         height: 1
    //     }}
    //     />
    // }

    render() {
        let { show } = this.state
        const { onTouchOutside, title } = this.props
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000AA',
                    justifyContent: 'flex-end'
                }}
                >
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#ffffff',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4
                    }}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>
            </Modal>
        )
    }
}