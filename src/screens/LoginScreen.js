import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Alert,
  
} from "react-native";
import { WebView } from 'react-native-webview';
import {
  Root,
  Container,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Toast,
  Icon,
  Card,
  Button,
  Body,
  Item,
  Header,
  Content,
  List,
  ListItem,
  CheckBox
} from "native-base";


import TermsAndConditionScreen from "./TermsAndConditionScreen";
import { NavigationEvents } from "react-navigation";
import Modal from "react-native-modal";
import CustomHeader from "../components/CustomHeader";
import OneSignal from "react-native-onesignal";
import Pdf from "react-native-pdf";
export default class LoginScreen extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      phone: "",
      password: "",
      showToast: false,
      session_id: "",
      user_id: "",
      appid: "",
      isModalVisible: false,
      tncaccepted: false,
      splittedsess: "",
      tnccheckbox: true,
      tncmodal: false
    };
    OneSignal.init("dc472492-2a76-4bd4-a545-bd29efa25ee0");
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }
  componentDidMount() {
    this.setState({
      phone: "",
      password: "",
      showToast: false,
      isModalVisible: false,
      tncaccepted: false,
      tnccheckbox: true
    });
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds = device => {
    console.log("Device info: ", device);
    this.setState({ appid: device }, () => {
      console.log("unique app id", this.state.appid.userId);
    });
  };
  static navigationOptions = {
    headerTitle: () => <CustomHeader />
  };

  // _storeData = async (session_id, user_id) => {
  //   try {
  //     await AsyncStorage.multiSet([
  //       ["session_id", session_id],
  //       ["user_id", user_id],
  //     ]);
  //   } catch (error) {
  //     console.log("error saving session data:", error);
  //   }
  // };

  CheckStatus = async (session_id, status, user_id) => {
    if (status === 200) {
      // this._storeData(session_id.split(";")[0], user_id);
      await this.setState({ session_id: session_id });
      //  this.navigation.navigate('Dashboard');
      await this.setState({ user_id: user_id });
      await this.setState({ splittedsess: session_id.split(";")[0] });
      this.props.navigation.navigate('MoreDetails',{
        user_id: this.state.user_id,
        splittedsess: this.state.splittedsess,
        phone: this.state.phone
      })
      // await this.setState({ isModalVisible: true });

      return 0;
    } else {
      Toast.show({
        text: status.toString(),
        buttonText: "Okay",
        duration: 3000
      });
    }
  };

  checkIfAdmin = () => {
    if (this.state.phone == "123") {
      Toast.show({
        text: "Admin should use dashboard",
        buttonText: "Okay",
        duration: 3000
      });
      return false;
    }
    return true;
  };

  sendUniqueKey = (userAppId, userId, base_url) => {
    const data = `app_id=${userAppId}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText, "updated the unique key ");
      }
    });
    xhr.open("POST", base_url + "Components/edit/" + userId);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
  };

  checklogin = base_url => {
    const data = `username=${this.state.phone}&password=${this.state.password}`;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
      console.log(base_url + "Components/login");
      console.log("State = ", xhr.readyState);
      console.log("Response = ", xhr.responseText);

      if (xhr.readyState === 4) {
        try {
          console.log("User ID == ", JSON.parse(xhr.responseText).id);
          this.sendUniqueKey(
            this.state.appid.userId,
            JSON.parse(xhr.responseText).id,
            base_url
          );
        } catch (error) {
          Alert.alert("Login Failed", "Invalid username or password");
          console.log(" " + error.message);

          return error;
        }
        // this.setState({user_id: xhr.responseText.id});

        this.CheckStatus(
          xhr.getResponseHeader("Set-Cookie"),
          xhr.status,
          JSON.parse(xhr.responseText).id
        );
      }
    });
    xhr.open("POST", base_url + "Components/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
  };

  _getData = async () => {
     this.navigation.navigate('Dashboard');
    // AsyncStorage.getItem("base_url").then(base_url =>
    //   this.checklogin(base_url)
    // );
  };
  termsandconditionaccepted = async () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow"
    };

    await fetch(
      `http://ardouranalytics.com:3000/agree/${this.state.user_id}`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));

    await this.setState({ isModalVisible: false });
    await this.props.navigation.navigate("OtpScreen", {
      phone: this.state.phone,
      splittedsess: this.state.splittedsess,
      user_id: this.state.user_id
    });
  };
  render() {
    
    return (
      <Root>
        <Container style={styles.Container}>
          <ImageBackground
            source={require("../../assets/login_background.jpg")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.CustomHeaderContainer}>
              <Title style={styles.CustomHeaderText}>FinTap</Title>
              <Text style={styles.CustomHeaderSubHeading}>Empowered You</Text>
            </View>
            <View style={styles.FormCardStyle}>
              <Card style={{ borderRadius: 8 }}>
                <Form bordered style={styles.FormStyle}>
                  <FormItem floatingLabel>
                    <Label>Phone</Label>
                    <Input
                      keyboardType="number-pad"
                      maxLength={10}
                      minLength={10}
                      onChangeText={text => this.setState({ phone: text })}
                      value={this.state.phone}
                    />
                    <Icon active name="phone" type="FontAwesome" />
                  </FormItem>
                  <FormItem floatingLabel>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={true}
                      onChangeText={text => this.setState({ password: text })}
                      value={this.state.password}
                    />

                    <Icon
                      active
                      name="textbox-password"
                      type="MaterialCommunityIcons"
                    />
                  </FormItem>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginTop: "10%"
                    }}
                  >
                    <CheckBox
                      checked={this.state.tnccheckbox}
                      onPress={() =>
                        this.setState({ tnccheckbox: !this.state.tnccheckbox })
                      }
                    />
                    <TouchableHighlight>
                      <Text
                        style={{ fontSize: 15 }}
                        onPress={() => {
                          this.setState({ tncmodal: true });
                        }}
                      >
                        Terms and conditions *
                      </Text>
                    </TouchableHighlight>
                  </View>

                  <Button
                    iconRight
                    full
                    primary
                    rounded
                    disabled={!this.state.tnccheckbox}
                    style={styles.ButtonStyle}
                    onPress={() => {
                      this._getData();
                    }}
                  >
                    <Text> Login </Text>
                    <Icon name="unlock" />
                  </Button>
                </Form>
              </Card>
            </View>
            <Modal style={{ flex: 1 }} isVisible={this.state.tncmodal}>
              <Container style={styles.modalcontainer}>
                <View style={styles.modalheading}>
                  <Text style={{ fontSize: 20, color: "red" }}>
                    Terms and condition
                  </Text>
                </View>
              <View style={styles.modalpdf}>
                <WebView
        source={{ uri: 'https://www.google.co.in/' }}
        style={{width:'100%'}}
       
      />
              </View>
                <View style={{ justifyContent: "space-evenly" }}>
                  <View style={styles.button1}>
                    <Button
                      iconLeft
                      light
                      onPress={() => {
                        this.setState({ tncmodal: false });
                      }}
                      style={styles.disagreebutton}
                    >
                      <Icon>
                        <Text>X</Text>
                      </Icon>
                      <Text>Close</Text>
                    </Button>
                  </View>
                </View>
              </Container>
            </Modal>
           
          </ImageBackground>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  agreebutton: {
    backgroundColor: "#0077b5",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  disagreebutton: {
    backgroundColor: "#e6493e",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  button1: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  modalpdf: {
    flex: 9,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "black",
    opacity: 0.8,
    paddingBottom: 1,
    borderRadius: 3
  },
  modalheading: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1 / 1.5,
    borderWidth: 1,

    // borderBottomStartRadius:10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
    backgroundColor: "#f2f1eb"
  },
  modalcontainer: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 10
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  CustomHeaderContainer: {
    flex: 2,
    padding: "5%",
    justifyContent: "center",
    alignContent: "center"
  },
  CustomHeaderText: {
    fontSize: 65,
    fontFamily: "Raleway-Light",
    alignSelf: "center"
  },
  CustomHeaderSubHeading: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
    fontFamily: "OpenSans-Regular",
    color: "#bbcedd"
  },
  FormStyle: {
    padding: "10%",
    borderRadius: 8
  },
  ButtonStyle: {
    marginTop: "10%"
  },
  FormCardStyle: {
    flex: 3,
    marginBottom: "10%",
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center",
    alignContent: "center"
  },
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 22,
    alignSelf: "center"
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP: {
    marginTop: 10,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15
  },

  button: {
    backgroundColor: "#136AC7",
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: "#999",
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: "#FFF",
    alignSelf: "center"
  }
});

// //baseurl +mobileno.pdf
