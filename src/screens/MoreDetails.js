import React, { Component } from "react";
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
  CheckBox,
  Picker,
  Textarea
} from "native-base";

import Modal from "react-native-modal";
import Pdf from "react-native-pdf";
import {
  StyleSheet,
  View,
  ImageBackground,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import Dimensions from "../services/Dimensions";
//click on login->come to moredetails->take inputs ->on sumbit show modal->on accepts otpscreen
export default class MoreDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      splittedsess: this.props.navigation.getParam("splittedsess"),
      user_id: this.props.navigation.getParam("user_id"),
      phone: this.props.navigation.getParam("phone"),
      selected: "",
      nameoforg:"",
      pannum:"",
      gstnum:"",
      druglicnum:"",
      mobnum:"",
      email:"",
      address:"",
    };
  }
  onValueChange2 = value => {
    this.setState({
      selected: value
    });
  };
  static navigationOptions = ({ navigation }) => {
    // headerTitle instead of title
    return {
      headerTitle: () => <CustomHeader />,

      headerLeft: () => <View />
    };
  };

  componentDidMount = async () => {};
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
    const source = {
      uri: "http://www.africau.edu/images/default/sample.pdf",
      cache: true
    };
    return (
     <ScrollView>
    <Container>
        <View
          style={{
            paddingHorizontal: "1%",
            paddingVertical: "1%",
            marginHorizontal: "2%",
            marginBottom: "1%",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
        {/* selected: "",
      pannum:"",
      gstnum:"",
      druglicnum:"",
      mobnum:"",
      email:"",
      address:"", */}
          <FormItem>
            <Icon active name="organization" type="Octicons" />

            <Input placeholder="Name of organization" value={this.state.nameoforg} onChangeText={value =>this.setState({nameoforg:value})}  />
          </FormItem>

          <Item picker>
            <Label>Type of organization</Label>
            <Picker
            note
            mode='dropdown'
            style={{width: 120}}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange2}
            >
              <Picker.Item label='ASDF' value='key0' />
              <Picker.Item label='QWER' value='key1' />

            </Picker>

            {/* <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "10%" }}
              placeholder="Type of organization"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange2}
            >
              <Picker.Item label="Private Limited" value="Private Limited" />
              <Picker.Item label="Partnership" value="Partnership" />
              <Picker.Item label="Proprietary" value="Proprietary" />
            </Picker> */}
          </Item>

          <FormItem floatingLabel>
            <Icon active name="id-card-o" type="FontAwesome" />
            {/* <Label>Pan No.</Label> */}

            <Input placeholder="Pan No." value={this.state.pannum} onChangeText={value =>this.setState({pannum: value})} />
          </FormItem>
          <FormItem>
            <Icon
              active
              name="textbox-password"
              type="MaterialCommunityIcons"
            />
            {/* <Label>GST No.</Label> */}
            <Input placeholder="GST No." value={this.state.gstnum} onChangeText={value =>this.setState({gstnum:value})} />
          </FormItem>
          <FormItem floatingLabel>
            <Icon active name="drivers-license-o" type="FontAwesome" />

            <Input placeholder="Drug License No." value={this.state.druglicnum} onChangeText={value =>this.setState({druglicnum:value})} />
          </FormItem>
          <FormItem>
            <Icon active name="mobile" type="FontAwesome" value={this.state.mobnum} onChangeText={value =>this.setState({mobnum:value})} />

            <Input placeholder="Mobile No." />
          </FormItem>
          <FormItem>
            <Icon active name="email" type="MaterialCommunityIcons" value={this.state.email} onChangeText={value =>this.setState({email:value})} />

            <Input placeholder="E-mail" />
          </FormItem>

          <Textarea rowSpan={4} bordered placeholder="Address" value={this.state.address} onChangeText={value =>this.setState({address:value})} />

          <Button
            iconRight
            full
            primary
            rounded
            style={{}}
            onPress={() => {
              console.log(JSON.stringify(this.state));
              this.setState({ isModalVisible: true });
            }}
          >
            <Text> Submit </Text>
            <Icon name="done" type="MaterialIcons" />
          </Button>
        </View>

        <Modal style={{ flex: 1 }} isVisible={this.state.isModalVisible}>
          <Container style={styles.modalcontainer}>
            <View style={styles.modalheading}>
              <Text style={{ fontSize: 20, color: "red" }}>
                Legal Agreement
              </Text>
            </View>
            <View style={styles.modalpdf}>
              <Pdf style={{ flex: 1 }} source={source} />
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <View style={styles.button1}>
                <Button
                  iconLeft
                  light
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                  style={styles.disagreebutton}
                >
                  <Icon>
                    <Text>X</Text>
                  </Icon>
                  <Text>Disagree</Text>
                </Button>
                <Button
                  iconLeft
                  light
                  onPress={() => {
                    this.termsandconditionaccepted();
                  }}
                  style={styles.agreebutton}
                >
                  <Icon name="checkbox" />
                  <Text>Agree</Text>
                </Button>
              </View>
            </View>
          </Container>
        </Modal>
     
      </Container>
      </ScrollView>
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

  modalpdf: {
    flex: 9,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "black",
    opacity: 0.8,
    paddingBottom: 1,
    borderRadius: 3
  }
});
