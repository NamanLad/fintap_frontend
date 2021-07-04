import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  AsyncStorage,
} from "react-native";
import { Title } from "native-base";
import { NavigationEvents } from "react-navigation";

export default class SpashScreen extends Component {
  constructor({ navigation, baseurl }) {
    super();
    this._checkSession_id(navigation, baseurl);
  }

  _checkSession_id = async (navigation, baseurl) => {
    this._storeData(baseurl).then(
      setTimeout(async () => {
        console.log(JSON.stringify(AsyncStorage.getItem("session_id"))+"aila")
        await AsyncStorage.getItem("session_id").then((userToken) => {
          console.log(userToken+"userToken")
          navigation.navigate('Login')
          // navigation.navigate(userToken ? "Dashboard" : "Login");
        });
      }, 1200) // navigate to dashboard or login in 1200
    );
  };

  _storeData = async (base_url) => {
    try {
      await AsyncStorage.setItem("base_url", base_url);
    } catch (error) {
      console.log("error saving base url:", error);
    }
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/login_background.jpg")}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={styles.CustomHeaderText}>FinTap</Title>
        <Text style={styles.CustomHeaderSubHeading}>Empowered You</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  CustomHeaderText: {
    fontSize: 65,
    color: '#fff',
    fontFamily: "Raleway-Light",
    alignSelf: "center",
  },
  CustomHeaderSubHeading: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
    fontFamily: "OpenSans-Regular",
    color: "#fff",
  },
});
