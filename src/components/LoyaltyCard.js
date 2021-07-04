import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Item, View } from 'native-base';
import ProgressBar from './ProgressBar'
import VerticalDivider from './VerticleDivider'
//name number call button modal

 const LoyaltyCard = ({ amount, id, camount,number }) => {
    return (
        <Card button style={styles.CardStyle}>
            <CardItem button style={styles.SubContainer}>
                <View style={styles.MainIconContainer}>
                    <Icon style={{alignSelf:"center", color:"orange"}} name='money-bill-wave' type='FontAwesome5'/>
                  
                    <VerticalDivider style={{paddingRight:"10%"}} height='100'/>
                </View>
                
                <View style={styles.MainContentContainer}>
                    <View style={styles.HeadingContainer}>
                        <Icon style={styles.Icon} name='rupee' type='FontAwesome'/>
                        <View style={{flex:1, flexDirection:"column", alignContent:"flex-start"}}>
                            <Text style={styles.CardMainText}>{ amount }</Text>
                            <Text style={styles.CardSomeText}>invoice no: {number}</Text>
                        </View>
                        <Icon style={styles.Icon} name='rightcircle' type='AntDesign'/>
                        <Text style={styles.CardMainText}>{ camount }</Text>
                    </View>
                </View>
            </CardItem>
        </Card>
             
    );
}

export default LoyaltyCard


const styles = StyleSheet.create({
    CardStyle:{
        flex:1/5,
        marginHorizontal:"2%",
        borderRadius:12,
        elevation:5,
        padding:"2%"
    },
    MainIconContainer:{
        flex:1/4,
        justifyContent:"space-around",
        flexDirection:"row"
    },
    SubContainer:{
        flex:1,
        flexDirection:"row"
    },
    MainContentContainer:{
        flex:1,
        paddingLeft:"1%"
    },
    Icon:{
        paddingTop:"3%",
        paddingRight:"2%"
    },
    HeadingContainer:{
        flex:2,
        flexDirection:"row",
        paddingTop:"2%"
    },
    ProgressBar:{
        flex:1/2,
        paddingRight:"2%"
    },
    CardMainText:{
        flex:1,
        fontSize:30,
        fontFamily:"OpenSans-Light",
    },
    CardSomeText:{
        flex:1,
        color:"#585858",
        fontFamily:"Raleway-Light"
    },
    CardSubText:{
        alignSelf:"flex-start",
        color:"#D0D0D0",
        fontFamily:"OpenSans-Italic",
        paddingRight:"2%",
        fontSize:14
    }
})