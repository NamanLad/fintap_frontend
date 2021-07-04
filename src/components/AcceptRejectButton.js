import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, TouchableOpacity } from "react-native";
import {
  Container,
  Body,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Button,
  CheckBox
} from "native-base";
import Modal from "react-native-modal";

let reasonToSend = [];

export default class AcceptRejectButton extends Component {
  constructor({ status, navigation }) {
    super();
    this.navigation = navigation;
    this.baseurl = navigation.getParam("baseurl");
    this.state = {
      status: status,
      isModalVisible: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      updater: 1,
      acceptbuttondisable: false,
      rejectbuttondisable: false
    };
  }

  toggleCheckbox1() {
    this.setState({
      checkbox1: !this.state.checkbox1,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    });
    reasonToSend = [];
    reasonToSend.push("Incorrect Amount");
  }
  toggleCheckbox2() {
    this.setState({
      checkbox2: !this.state.checkbox2,
      checkbox1: false,
      checkbox3: false,
      checkbox4: false
    });
    reasonToSend = [];
    reasonToSend.push("Goods Not As Per Order");
  }
  toggleCheckbox3() {
    this.setState({
      checkbox3: !this.state.checkbox3,
      checkbox2: false,
      checkbox1: false,
      checkbox4: false
    });
    reasonToSend = [];
    reasonToSend.push("Goods To Be Adjusted in The Bill");
  }
  toggleCheckbox4() {
    this.setState({
      checkbox4: !this.state.checkbox4,
      checkbox2: false,
      checkbox1: false,
      checkbox3: false
    });
    reasonToSend = [];
    reasonToSend.push("Damaged Goods");
  }
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

  changeInvoiveStatus = status => {
    var data = `status=${status}`;
    console.log(data + " status after function is called");
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      console.log(
        this.baseurl + `invoice/edit/${this.navigation.getParam('id')}`
      );
      if (this.readyState === 4) {
        console.log("This is invoice change", this.responseText);
      }
    });

    xhr.open(
      "POST",
      this.baseurl + `invoice/edit/${this.navigation.getParam('id')}`
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cookie", this._retrieveData);

    xhr.send(data);
  };

  convertInvoiceToLoan = callback => {
    var data = `number=${this.navigation.getParam(
      "number",
    )}&amount=${this.navigation.getParam(
      "amount",
    )}&date=${this.navigation.getParam(
      "date",
    )}&details=${this.navigation.getParam(
      "details",
    )}&retailer_id=${this.navigation.getParam(
      "retailer_id",
    )}&distributor_id=${this.navigation.getParam(
      "distributor_id",
    )}&prodcut_id=${this.navigation.getParam(
      "product_id",
    )}&due_date=${this.navigation.getParam("due_date")}&status=0`;

   


    console.log("Data loan = " + data);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        console.log("new loooog", xhr.responseText);
        this.changeInvoiveStatus("accepted");
      }
    });

    xhr.open("POST", this.baseurl + "loan/add");
    xhr.setRequestHeader("Cookie", this._retrieveData);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
    callback();
  };

  toggleModal = callback => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onSubmit = callback => {
    this.toggleModal();
    this.changeInvoiveStatus("rejected");
    console.log("rejected and onSubmit");
    callback();
  };

  render() {
    if (this.state.status === "pending") {
      return (
        <View style={styles.ActionsStyle}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Button
              full
              success
              rounded
              style={styles.Button}
              disabled={this.state.acceptbuttondisable}
              onPress={() => {
                this.setState({ acceptbuttondisable: true });
                this.convertInvoiceToLoan(() =>
                  this.navigation.replace("Loans", {
                    baseurl: this.baseurl
                  })
                );
              }}
            >
              <Text>Accept</Text>
            </Button>

            <Button
              full
              danger
              rounded
              style={styles.Button}
              disabled={this.state.rejectbuttondisable}
              onPress={() => {
                this.setState({ rejecttbuttondisable: true });
                this.toggleModal();
              }}
            >
              <Text>Decline</Text>
            </Button>
          </View>
          <Modal style={{ flex: 1 / 2 }} isVisible={this.state.isModalVisible}>
            <View
              style={{
                flex: 1,

                padding: "5%"
              }}
            >
              <Container style={{ flex: 1, justifyContent: "space-evenly" }}>
                <Header
                  style={{
                    flex: 2,
                    backgroundColor: "white",
                    margin: "8%"
                  }}
                >
                  <Text>Reasons For Rejection</Text>
                </Header>
                <Content style={{ flex: 1 }}>
                  <List style={{ flex: 1 }}>
                    <ListItem style={{ flex: 1 }}>
                      <CheckBox
                        onPress={() => this.toggleCheckbox1()}
                        checked={this.state.checkbox1}
                      />
                      <Body>
                        <Text onPress={() => this.toggleCheckbox1()}>
                          Incorrect Amount
                        </Text>
                      </Body>
                    </ListItem>

                    <ListItem style={{ flex: 1 }}>
                      <CheckBox
                        onPress={() => this.toggleCheckbox2()}
                        checked={this.state.checkbox2}
                      />
                      <Body>
                        <Text onPress={() => this.toggleCheckbox2()}>
                          Goods Not As Per Order
                        </Text>
                      </Body>
                    </ListItem>
                    <ListItem style={{ flex: 1 }}>
                      <CheckBox
                        onPress={() => this.toggleCheckbox3()}
                        checked={this.state.checkbox3}
                      />
                      <Body>
                        <Text onPress={() => this.toggleCheckbox3()}>
                          Goods To Be Adjusted In The Bill
                        </Text>
                      </Body>
                    </ListItem>
                    <ListItem style={{ flex: 1 }}>
                      <CheckBox
                        onPress={() => this.toggleCheckbox4()}
                        checked={this.state.checkbox4}
                      />
                      <Body>
                        <Text onPress={() => this.toggleCheckbox4()}>
                          Damaged Goods
                        </Text>
                      </Body>
                    </ListItem>
                    <Button
                      onPress={() => {
                        console.log("Rejected button clicked");
                        this.onSubmit(() =>
                          this.navigation.navigate("Invoices")
                        );
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: "#0077b5",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text>Submit</Text>
                    </Button>
                  </List>
                </Content>
              </Container>
            </View>
          </Modal>
        </View>
      );
    } else if (this.state.status === "rejected") {
      return (
        <View style={styles.ActionsStyle}>
          <Text style={styles.StatusText}>Pending</Text>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            <Button full success rounded style={styles.Button}>
              <Text>Accept</Text>
            </Button>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.ActionsStyle}>
        <Text style={styles.StatusText}>Accepted</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StatusText: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center"
  },
  ActionsStyle: {
    flex: 1 / 2
  },

  Button: {
    marginVertical: "6%",
    marginHorizontal: "15%",
    flex: 1
  }
});
