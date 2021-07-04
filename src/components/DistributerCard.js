import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Icon, View, Button } from 'native-base';
import ProgressBar from './ProgressBar'
import VerticalDivider from './VerticleDivider'
import { NavigationEvents } from 'react-navigation';
//name number call button modal

 const DistributorCard = ({ name, phone }) => {
    return (
        <Card button
              style={styles.CardStyle}
              >
            <CardItem button 
                      style={styles.SubContainer}>
                <View style={styles.MainIconContainer}>
                
                    <Icon style={{alignSelf:"center", color:"orange"}} name='address-card' type='FontAwesome'/>
                    <VerticalDivider style={{paddingRight:"10%"}} height='100'/>
                </View>
                
                <View style={styles.MainContentContainer}>
                    <View style={styles.HeadingContainer}>
                        <View style={{flex:1, flexDirection:"column", alignContent:"flex-start"}}>
                            <Text style={styles.CardMainText}>{ name }</Text>
                            <Text style={styles.CardSomeText}> {phone}</Text>
                        </View>
                    </View>
                
                </View>
                <Button info rounded><Text>Call</Text></Button>
            </CardItem>
        </Card>
             
    );
}

export default DistributorCard


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
        fontFamily:"OpenSans-Light"
    },
    CardSubText:{
        alignSelf:"flex-start",
        color:"#D0D0D0",
        fontFamily:"OpenSans-Italic",
        paddingRight:"2%",
        fontSize:14
    }
})