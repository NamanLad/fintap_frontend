import React, { Component, useEffect } from "react";
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
  Right
} from "native-base";
import { getInvoices } from "../apis/InvoiceToLoan";

const InvoiceCard = ({
  id,
  amount,
  date,
  number,
  details,
  status,
  retailer_id,
  distributor_name,
  distributor_id,
  product_id,
  due_date,
  created_date,
  navigation,
  baseurl,
  req_status
}) => {
  // console.log({product_id}+"product id")
  useEffect(() => {
    // console.log({ created_date });
  }, []);
  return (
    <Card style={styles.CardStyle}>
      <CardItem
        button
        onPress={() => {
          navigation.navigate("Details", {
            id: id,
            number: number,
            amount: amount,
            date: date,
            details: details,
            retailer_id: retailer_id,
            distributor_name: distributor_name,
            distributor_id: distributor_id,
            product_id: product_id,
            status: status,
            baseurl: baseurl,
            due_date: due_date,
            created_date: created_date
          });
        }}
      >
        <Left>
          <Thumbnail
            source={require("../../assets/paper_icon2.png")}
            style={styles.ThumbnailStyle}
          />
          <Body>
            <Text>{distributor_name}</Text>
            <Text note>INVOICE NO: {number}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="coins" type="FontAwesome5" />
            <Text>{amount}</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>{status}</Text>
          </Button>
        </Body>
        <Right>
          <Text>{created_date}</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  CardStyle: {
    marginHorizontal: "2%"
  }
});
