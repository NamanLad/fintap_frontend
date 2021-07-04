import React, { PureComponent } from "react";

import {
  StyleSheet,
  View,
  AsyncStorage,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import { Button, Text } from "native-base";

export default class OtpScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      phone: this.props.navigation.getParam("phone"),
      otpkey1: "",
      otpkey2: "'",
      otpkey3: "",
      otpkey4: "",
      splittedsess: this.props.navigation.getParam("splittedsess"),
      user_id: this.props.navigation.getParam("user_id"),
    };
  }
  static navigationOptions = {
    headerTitle: () => <CustomHeader />,
  };
  check = async () => {
    const key =
      this.state.otpkey1 +
      this.state.otpkey2 +
      this.state.otpkey3 +
      this.state.otpkey4;

    if (key === this.state.phone.substring(6)) {
      AsyncStorage.multiSet([
        ["session_id", this.state.splittedsess],
        ["user_id", this.state.user_id],
      ]).then(() => this.props.navigation.navigate("Dashboard"));
    } else {
      Alert.alert("Invalid OTP", "Plase enter valid OTP");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={require("../../assets/login_background.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "20%" }}>
              <Text
                style={{
                  fontSize: 65,
                  fontFamily: "Raleway-Light",
                  alignSelf: "center",
                  color: "white",
                }}
              >
                Fundly
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: "center",
                  fontStyle: "italic",
                  fontFamily: "OpenSans-Regular",
                  color: "#bbcedd",
                }}
              >
                Empowered You
              </Text>
            </View>
            <View style={{ alignItems: "center", marginTop: "17%" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Enter 4-digit OTP key
              </Text>
            </View>
            <View>
              <View style={{ marginTop: "10%", height: "15%" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginHorizontal: "5%",
                    justifyContent: "space-evenly",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    maxLength={1}
                    style={{ flex: 1 }}
                    onChangeText={async (text) => {
                      await this.setState({ otpkey1: text });
                      {
                        this.state.otpkey1.length > 0
                          ? this.refs["second"].focus()
                          : null;
                      }
                    }}
                    keyboardType="number-pad"
                    returnKeyType={"next"}
                    style={{
                      backgroundColor: "#c7d7f0",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 12,
                      textAlign: "center",
                      flex: 1,
                      marginHorizontal: 3,
                    }}
                  />
                  <TextInput
                    ref="second"
                    onChangeText={async (text) => {
                      await this.setState({ otpkey2: text });
                      {
                        this.state.otpkey2.length > 0
                          ? this.refs["third"].focus()
                          : null;
                      }
                    }}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: "#c7d7f0",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 12,
                      textAlign: "center",
                      flex: 1,
                      marginHorizontal: 3,
                    }}
                  />
                  <TextInput
                    ref="third"
                    onChangeText={async (text) => {
                      await this.setState({ otpkey3: text });
                      {
                        this.state.otpkey3.length > 0
                          ? this.refs["fourth"].focus()
                          : null;
                      }
                    }}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: "#c7d7f0",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 12,
                      textAlign: "center",
                      flex: 1,
                      marginHorizontal: 3,
                    }}
                  />
                  <TextInput
                    ref="fourth"
                    onChangeText={async (text) => {
                      await this.setState({ otpkey4: text });
                    }}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: "#c7d7f0",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 12,
                      textAlign: "center",
                      flex: 1,
                      marginHorizontal: 3,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: "12%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                iconRight
                style={{
                  backgroundColor: "#1f36a6",
                }}
                rounded
                onPress={() => {
                  this.check();
                }}
              >
                <Text> Confirm OTP </Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CustomHeaderContainer: {
    flex: 2,
    padding: "5%",
    justifyContent: "center",
    alignContent: "center",
  },
  CustomHeaderText: {
    fontSize: 65,
    fontFamily: "Raleway-Light",
    alignSelf: "center",
  },
  CustomHeaderSubHeading: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
    fontFamily: "OpenSans-Regular",
    color: "#bbcedd",
  },
});
