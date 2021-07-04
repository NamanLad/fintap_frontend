import React, { Component } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  AsyncStorage,
  Alert
} from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Container, Button, Text, Card, Icon } from "native-base";
import { HeaderBackButton } from "react-navigation-stack";
import CustomHeader from "../components/CustomHeader";
import Dimensions from "../services/Dimensions";
import HeaderButtons from "../components/HeaderButtons";
import { NavigationEvents } from "react-navigation";
export default class DashboardScreen extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.baseurl = null;
    this.state = {
      invoiceCount: 0,
      loanCount: 0,
      loyaltyCount: 0,
      distributorCount: 0,

      used_limit: 0,
      pending_limit: 0,
      credit_limit: 0,
      user_id: 0
    };
  }

  static navigationOptions = ({ navigation }) => {
    // headerTitle instead of title
    return {
      headerTitle: () => <CustomHeader />,
      headerRight: () => <HeaderButtons navigation={navigation} />,
      headerLeft: () => (
        //  <View></View>
        // <HeaderBackButton
        //   onPress={() => {
        //     Alert.alert(
        //       "Do you want to Exit fundly",
        //       "press ok to Exit",
        //       [
        //         {
        //           text: "Cancel",
        //           onPress: () => console.log("Cancel Pressed"),
        //           style: "cancel"
        //         },
        //         { text: "OK", onPress: () => BackHandler.exitApp() }
        //       ],
        //       { cancelable: false }
        //     );
        //   }}
        // />
        <View>
          {/* <HeaderBackButton
          onPress={() => {
            Alert.alert(
              "Do you want to Exit fundly",
              "press ok to Exit",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => BackHandler.exitApp() }
              ],
              { cancelable: false }
            );
          }}
         /> */}
        </View>
      )
    };
  };

  // componentWillMount() {
  //   // BackHandler.addEventListener(
  //   //   "hardwareBackPress",
  //   //   this.handleBackButtonPressAndroid
  //   // );
  // }

  componentWillUnmount() {
    // BackHandler.removeEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonPressAndroid
    // );
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }

    Alert.alert(
      "Do you want to Exit fintap",
      "press ok to Exit",
      [
        {
          text: "Cancel",
          //  onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  };

  _setData = async data => {
    //user_id,59,base_url,http://ardouranalytics.com/fundlys/
    this.baseurl = data[1][1];
    this.user_id = data[0][1];
    this.setState({ user_id: this.user_id });
  };


  // ------------------------------------------
  // this function is giving error
  // ------------------------------------------
  _getPieData = () => {
    AsyncStorage.multiGet(["user_id", "base_url"])
      .then(data => this._setData(data))
      .then(() => {
        var requestData = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", () => {
          if (xhr.readyState === 4) {
            this.setState({
              // used_limit: JSON.parse(xhr.responseText).used_limit,
              // credit_limit: JSON.parse(xhr.responseText).credit_limit,
              // pending_limit: JSON.parse(xhr.responseText).pending_limit
            });
            //  console.log(xhr.responseText, this.baseurl, this.user_id);
            console.log(this.baseurl)
          }
        });
        xhr.open("GET", this.baseurl + `Components/user_limit/${this.user_id}`);
        xhr.send(requestData);
      });
  };

  _getCountData = () => {
    var requestData = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        // this.setState({
        //   // used_limit: JSON.parse(xhr.responseText).used_limit,
        //   // credit_limit: JSON.parse(xhr.responseText).credit_limit,
        //   // pending_limit: JSON.parse(xhr.responseText).pending_limit

        // });
        //  console.log(xhr.responseText, this.baseurl, this.user_id);
        fetch(
          `http://ardouranalytics.com/fundlys/components/loan_invoice_count/${this.user_id
          }`
        )
          .then(response => response.text())
          .then(result => {
            console.log(this.user_id + "user_id");
            console.log(JSON.parse(result).invoice_count + " invoiceav1");
            console.log(JSON.parse(result).loan_count + " loanav");
            console.log(JSON.parse(result).loyalty_count + "loyalty av");
            this.setState({ invoiceCount: JSON.parse(result).invoice_count }); //invoices
            this.setState({ loanCount: JSON.parse(result).loan_count }); //approved
            this.setState({ loyaltyCount: JSON.parse(result).loyalty_count });
            this.forceUpdate();
          })
          .catch(error => console.log("error+", error));
      }
    });
    xhr.open("GET", this.baseurl + `Components/user_limit/${this.user_id}`);
    xhr.send(requestData);
  };
  // callreq=()=>{

  //   var myHeaders = new Headers();
  // myHeaders.append("Cookie", "PHPSESSID=cbde301c1a2902db7fda890d7599a246");

  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow'
  // }

  // fetch(`http://ardouranalytics.com/fundlys/components/loan_invoice_count/${this.user_id}`)
  //   .then(response => response.text())
  //   .then(result => {
  //     console.log(this.user_id+"user_id")
  //     console.log(JSON.parse(result).invoice_count+" invoiceav1")
  //     console.log(JSON.parse(result).loan_count+" loanav")
  //     console.log(JSON.parse(result).loyalty_count+"loyalty av")
  //     this.setState({invoiceCount:JSON.parse(result).invoice_count})//invoices
  //     this.setState({loanCount:JSON.parse(result).loan_count})//approved
  //     this.setState({loyaltyCount:JSON.parse(result).loyalty_count

  //     })

  //   })
  //   .catch(error =>

  //     console.log('error+', error));

  // };

  componentDidMount = async () => {
    await this._getPieData();
    await this._getCountData();
    //await  this.callreq();
  };

  render() {
    var used_percent = (this.state.used_limit / this.state.credit_limit) * 100;
    // console.log("Credit limit ", this.state.credit_limit);
    var used =
      this.state.used_limit == 0
        ? this.state.credit_limit
        : this.state.used_limit;
    // console.log("Used", used);
    var credit_percent = (this.state.credit_limit / used) * 100;
    // var remaining_percent = 100 - used_percent;
    var remaining_percent = 100 - credit_percent;
    //  console.log("used ", used_percent);
    // console.log("credit_percent ", credit_percent);
    // used_percent = used_percent == 0 ? 0.1 : used_percent;
    const data = [credit_percent, used_percent];
    // const data = [remaining_percent, used_percent];
    if (used_percent == 0) var colors = ["#811AD7", "#811AD7"];
    else var colors = ["#811AD7", "#f3f3f3"];






    // const randomColor = index => {
    //   return colors[index];
    // };

    // const pieData = data
    //   .filter(value => value > 0)
    //   .map((value, index) => ({
    //     value,
    //     svg: {
    //       fill: randomColor(index),
    //       onPress: () => console.log("press", index)
    //     },
    //     key: `pie-${index}`
    //   }));

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = dummy_data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }))




    function changeNumberFormat(number, decimals, recursiveCall) {
      // console.log(number + "number");
      // console.log(decimals + "decimals");
      // console.log(recursiveCall + "recursiveCall");
      const decimalPoints = decimals || 2;
      //   console.log(decimalPoints + "decimalPoints");
      const noOfLakhs = number / 100000;
      const final = noOfLakhs.toFixed(2);

      //  console.log(final+"final")
      //   console.log(noOfLakhs + "noOfLakhs");
      let displayStr;
      let isPlural;

      // Rounds off digits to decimalPoints decimal places
      function roundOf(integer) {
        return +integer.toFixed(decimalPoints);
      }

      if (noOfLakhs >= 1 && noOfLakhs <= 99) {
        const lakhs = final;
        isPlural = lakhs > 1 && !recursiveCall;
        //displayStr = `${lakhs} L${isPlural ? 's' : ''}`;
        displayStr = `${lakhs} L${isPlural ? "" : ""}`;
      } else if (noOfLakhs >= 100) {
        const crores = roundOf(final / 100);
        const crorePrefix =
          crores >= 100000
            ? changeNumberFormat(crores, decimals, true)
            : crores;
        isPlural = crores > 1 && !recursiveCall;
        //displayStr = `${crorePrefix} Cr${isPlural ? 's' : ''}`;
        displayStr = `${crorePrefix} Cr${isPlural ? "" : ""}`;
      } else {
        displayStr = roundOf(+number);
      }
      //   console.log("Display str", displayStr);
      return displayStr;
    }







    return (
      <Container style={styles.Containers}>
        <View style={styles.GraphContainer}>
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
          <Card style={styles.GraphCard}>
            <PieChart
              style={{
                height: (3 * Dimensions.getScreenSize()["screenHeight"]) / 10
              }}
              // data={pieData}
              data={pieData}
            />
            {/* <Text style={styles.GraphSubText}>Balance</Text>
            <Text style={styles.GraphText}>
              {changeNumberFormat(this.state.pending_limit, 2)}
            </Text> */}
          </Card>
        </View>

        <View style={styles.MainButtonContainer}>
          <View style={styles.SubButtonContainer}>
            <View style={styles.SingleButtonContainer}>
              <Button
                style={styles.Button}
                onPress={() =>
                  this.navigation.navigate("Invoices", {
                    baseurl: this.baseurl
                  })
                }
              >
                <Icon
                  style={styles.IconStyle}
                  name="clipboard-list"
                  type="FontAwesome5"
                />
                <Text style={styles.BUttonMainText}>Invoices</Text>
                <Text style={styles.ButtonSubText}>
                  Invoices: {this.state.invoiceCount}
                </Text>
              </Button>
            </View>

            <View style={styles.SingleButtonContainer}>
              <Button
                style={styles.Button}
                onPress={() =>
                  this.navigation.navigate("Loans", {
                    baseurl: this.baseurl
                  })
                }
              >
                <Icon
                  style={styles.IconStyle}
                  name="coins"
                  type="FontAwesome5"
                />
                <Text style={styles.BUttonMainText}>Approved</Text>
                <Text style={styles.ButtonSubText}>
                  Active: {this.state.loanCount}
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.SubButtonContainer}>
            <View style={styles.SingleButtonContainer}>
              <Button
                style={styles.Button}
                onPress={() =>
                  this.navigation.navigate("Distributer", {
                    baseurl: this.baseurl
                  })
                }
              >
                <Icon style={styles.IconStyle} name="users" type="Entypo" />
                <Text style={styles.BUttonMainText}>Stockist</Text>
                <Text style={styles.ButtonSubText}>
                  {/* Total: {this.state.distributorCount} */}
                </Text>
              </Button>
            </View>
            <View style={styles.SingleButtonContainer}>
              <Button
                style={styles.Button}
                onPress={() =>
                  this.navigation.navigate("Loyalties", {
                    baseurl: this.baseurl
                  })
                }
              >
                <Icon
                  style={styles.IconStyle}
                  name="money-bill-wave"
                  type="FontAwesome5"
                />
                <Text style={styles.BUttonMainText}>Cashback</Text>
                <Text style={styles.ButtonSubText}>
                  Redeem: {this.state.loyaltyCount}
                </Text>
              </Button>
            </View>
          </View>
        </View>
        {/* <Button
          onPress={() => {
            this.navigation.navigate("Login");
          }}
        >
          <Text>Logout</Text>
        </Button> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#DFDFDF"
  },
  GraphContainer: {
    height: (2 * Dimensions.getScreenSize()["screenHeight"]) / 5,
    padding: "5%",
    backgroundColor: "#DFDFDF"
  },
  GraphCard: {
    paddingVertical: "5%",
    borderRadius: 8,
    elevation: 10
  },
  GraphText: {
    bottom: "50%",
    left: "42%",
    position: "absolute",
    fontSize: 20,
    color: "#606060",
    fontFamily: "OpenSans-BoldItalic"
  },
  GraphSubText: {
    bottom: "45%",
    left: "45%",
    position: "absolute",
    fontSize: 10,
    color: "#959595",
    fontFamily: "OpenSans-BoldItalic"
  },
  MainButtonContainer: {
    height: Dimensions.getScreenSize()["screenHeight"] / 2,
    padding: "5%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#DFDFDF"
  },
  SubButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  SingleButtonContainer: {
    flex: 1,
    marginVertical: "2%",
    justifyContent: "center",
    alignContent: "center"
  },
  IconStyle: {
    flex: 1,
    paddingTop: "8%",
    alignSelf: "flex-start"
  },
  Button: {
    flex: 1,
    flexDirection: "column",
    height: 150,
    borderRadius: 12,
    marginHorizontal: "4%",
    marginVertical: "3%",
    backgroundColor: "#0077b5",
    elevation: 9
  },
  BUttonMainText: {
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 22,
    fontFamily: "OpenSans-Light",
    paddingTop: "6%"
  },
  ButtonSubText: {
    flex: 1 / 2,
    alignSelf: "flex-start",
    color: "#D0D0D0",
    fontFamily: "OpenSans-Italic",
    paddingBottom: "2%"
  }
});


const dummy_data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]