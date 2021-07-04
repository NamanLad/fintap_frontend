import React, { Component } from "react";
import { StyleSheet, View, Modal, TextInput, ScrollView } from "react-native";
import {
  Container,
  Text,
  Card,
  Button,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import RNUpiPayment from "react-native-upi-payment";
import CustomHeader from "../components/CustomHeader";
import HeaderButtons from "../components/HeaderButtons";
import { NavigationEvents } from 'react-navigation';

export default class DetailsScreen extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.amount = navigation.getParam("amount");
    this.id = navigation.getParam("id");
    this.due_date = navigation.getParam("due_date");
    this.number = navigation.getParam("number");
    this.baseurl = navigation.getParam("baseurl");
    // this.days = navigation.getParam('days');
    this.state = {
      transactionNo: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <CustomHeader />,
      headerRight: () => <HeaderButtons navigation={navigation} />
    };
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("session_id");
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  changeLoanStatus = () => {
    var data = `status=1`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        console.log(this.responseText);
        this.navigation.navigate("Loans", {
          baseurl: this.navigation.getParam("baseurl")
        });
      }
    });

    xhr.open(
      "POST",
      this.baseurl + `loan/edit/${this.navigation.getParam("id")}`
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cookie", this._retrieveData);

    xhr.send(data);
  };
  convertLoanToLoyalty = callback => {
    var data = `amount=${Math.floor(this.amount / 10)}&loanid=${this.id}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        this.changeLoanStatus();
      }
    });

    xhr.open("POST", this.baseurl + "loyalty/add");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cookie", this._retrieveData());

    xhr.send(data);
    callback();
  };

  makePayment = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: "john@upi", // or can be john@ybl or mobileNo@upi
        payeeName: "John Doe",
        amount: "1",
        transactionRef: "aasf-332-aoei-fn"
      },
      successCallback,
      failureCallback
    );

    function successCallback(data) {
     // console.log("data", data);
    }

    function failureCallback(data) {
     // console.log("fail", data);
    }
  };

  sendTransactionNo = () => {
    var data = `transaction_no=${this.state.transactionNo}`;
    console.log("Post data = ", data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
       // console.log(xhr.responseText);
        this.changeLoanStatus();
        // this.makePayment();
      }
    });
    xhr.open(
      "POST",
      this.baseurl + `loan/edit/${this.navigation.getParam("id")}`
    );
    console.log(
      this.baseurl + `invoice/edit/${this.navigation.getParam("id")}`
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cookie", this._retrieveData());
    xhr.send(data);
  };
  render() {
    return (
      <Container style={styles.Container}>
     
        <ScrollView>
          <View style={styles.HeaderStyle}>
            <Card style={styles.PaymentCard}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{ flex: 1, flexDirection: "column", padding: "2%" }}
                >
                  <Form>
                    <Text
                      style={{ flex: 1, color: "#fff", fontSize: 20 }}
                    ></Text>
                    <Item floatingLabel>
                      <Label>Transaction No</Label>
                      <Input
                        style={{ color: "#fff" }}
                        onChangeText={text =>
                          this.setState({ transactionNo: text })
                        }
                        value={this.state.transactionNo}
                      />
                    </Item>
                  </Form>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end",
                    padding: "3%"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      flexDirection: "column"
                    }}
                  >
                    <Text style={styles.FadedText}>INVOICE NUMBER</Text>
                    <Text style={styles.CardInfo}>{this.number}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      flexDirection: "column"
                    }}
                  >
                    <Text style={styles.FadedText}>AMOUNT</Text>
                    <Text style={styles.CardInfo}>INR {this.amount}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      flexDirection: "column"
                    }}
                  >
                    <Text style={styles.FadedText}>DUE DATE</Text>
                    <Text style={styles.CardInfo}>{this.due_date}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
        <View style={styles.BodyStyle}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
                textDecorationLine: "underline"
              }}
            >
              Instructions
            </Text>
            <Item
              style={{
                flexDirection: "column",
                paddingLeft: "2%",
                paddingBottom: "2%"
              }}
            >
              <Text style={{ color: "#635F5F" }}>
                {"\n"}
                1. Please mention your cheque number in the input above which
                says transaction number
                {"\n"}
              </Text>
              <Text style={{ color: "#635F5F" }}>
                2. Incase you made payment via net banking/other way mention
                transaction id in transactions number
                {"\n"}
              </Text>
              <Text style={{ color: "#635F5F" }}>
                3. Once submitted our backend team will verify & approve so you
                can earn loyalty
                {"\n"}
              </Text>
            </Item>
            <Button
              full
              style={{ alignSelf: "center" }}
              onPress={() => this.sendTransactionNo()}
            >
              <Text>Make Payment</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f0f0f0"
  },
  HeaderStyle: {
    backgroundColor: "#0077b5",
    flex: 1,
    alignItems: "center",
    paddingBottom: "5%"
  },
  FadedText: {
    color: "#C0C0C0",
    fontSize: 15,
    fontFamily: "OpenSans-Italic"
  },
  CardInfo: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Raleway"
  },
  PaymentCard: {
    flex: 1,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#13293D",
    paddingBottom: "2%"
  },
  BodyStyle: {
    flex: 7
  }
});
