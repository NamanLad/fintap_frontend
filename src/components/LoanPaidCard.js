import React, { Component, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
  View,
  CheckBox
} from "native-base";
import ProgressBar from "./ProgressBar";
import VerticalDivider from "./VerticleDivider";
//name number call button modal

const LoanPaidCard = ({
  progress,
  amount,
  id,
  number,
  days,
  due_date,
  navigation,
  baseurl,
  
  
}) => {
  
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Card
          button
          style={[
            styles.CardStyle,
            { backgroundColor:  "white"}
          ]}
        >
          <CardItem
            button
            // onPress={() => {
            //   navigation.navigate("LoanDetails", {
            //     progress: progress,
            //     amount: amount,
            //     id: id,
            //     number: number,
            //     days: days,
            //     due_date: due_date,
            //     baseurl: baseurl
            //   });
            // }}
            style={[
              styles.SubContainer,
              { backgroundColor:"white" }
            ]}
          >
            <View style={styles.MainContentContainer}>
              <View style={styles.HeadingContainer}>
                <Icon style={styles.Icon} name="rupee" type="FontAwesome" />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignContent: "flex-start"
                  }}
                >
                  <Text style={styles.CardMainText}>{amount}</Text>
                  <Text style={styles.CardSomeText}>invoice no: {number}</Text>
                </View>
                <Text style={styles.CardSubText}>Due Date: {due_date}</Text>
              </View>
              <View style={styles.ProgressBar}>
                <ProgressBar progress={progress} />
              </View>
            </View>
          
          </CardItem>
        </Card>
      </View>

    
    </View>
  );
};

export default LoanPaidCard;

const styles = StyleSheet.create({
  CardStyle: {
    flex: 1 / 5,
    marginLeft: "2%",
    borderRadius: 12,
    elevation: 5,
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "2%",
    paddingRight: "2%"
  },
  MainIconContainer: {
    flex: 1 / 4,
    justifyContent: "space-around",
    flexDirection: "row"
  },
  SubContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#217ec4",
    borderRadius: 10
  },
  MainContentContainer: {
    flex: 1,
    paddingLeft: "1%"
  },
  Icon: {
    paddingTop: "3%",
    paddingRight: "2%"
  },
  HeadingContainer: {
    flex: 2,
    flexDirection: "row",
    paddingTop: "2%"
  },
  ProgressBar: {
    flex: 1 / 2,
    paddingRight: "2%"
  },
  CardMainText: {
    flex: 1,
    fontSize: 30,
    fontFamily: "OpenSans-Light",
    color: "black"
  },
  CardSomeText: {
    flex: 1,
    color: "#585858",
    fontFamily: "Raleway-Light",
    color: "black"
  },
  CardSubText: {
    alignSelf: "flex-start",
    //color: "#D0D0D0",
    color: "black",
    fontFamily: "OpenSans-Italic",
    paddingRight: "2%",
    fontSize: 14
  }
});
