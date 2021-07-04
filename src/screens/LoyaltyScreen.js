import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl,
} from "react-native";
import {
  Container,
  Spinner,
  Text,
  Icon,
  Footer,
  FooterTab,
  Button,
  Badge,
} from "native-base";
import LoyaltyCard from "../components/LoyaltyCard";
import CustomHeader from "../components/CustomHeader";
import HeaderButtons from "../components/HeaderButtons";
import { NavigationEvents } from "react-navigation";

export default class DistributerScreen extends Component {
  _isMounted = false;

  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.baseurl = navigation.getParam("baseurl");
    this.state = {
      loyalties: [],
      loans: [],
      loading: true,
      totalamt: null,
      refreshing: false,
      newarr: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getLoans();
    this.getLoyalties()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("session_id");
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      Alert.alert("Cannot fetch");
      console.log("cannot retrive session info of user");
    }
  };

  getLoyalties() {

    fetch('http://localhost:3000/api/loyalties')
    .then((res) => res.json())
    .then((data) => {
      this.setState({loyalties: data, loading: false})
    }).catch((err) => console.log(err))

  }
  
  getLoans() {
    fetch('http://localhost:3000/api/loans')
    .then((res) => res.json())
    .then((data) => {
      console.log('||||||||||||||||||||||||||||||||||||')
      console.log(data);
      this.setState({loans: data})
      console.log('||||||||||||||||||||||||||||||||||||')
    }).catch((err) => console.log(err))
  }
  // getLoyalties() {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", () => {
  //     if (xhr.readyState === 4) {
  //       //console.log(xhr.responseText);
  //       this.setState(
  //         { loyalties: JSON.parse(xhr.responseText).records },
  //         this.getTotalAmount
  //       );
  //       this.setState({ loading: false });
  //     }
  //   });

  //   xhr.open("GET", this.baseurl + "loyalty/list?limit_start=1&limit_count=20");
  //   xhr.setRequestHeader("Cookie", this._retrieveData);

  //   xhr.send();
  // }

  // getLoans() {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", async () => {
  //     if (xhr.readyState === 4) {
  //       //console.log(xhr.responseText)
  //       await this.setState(
  //         { loans: JSON.parse(xhr.responseText).records },
  //         async () => {
  //           await this.getLoyalties();
  //           await this.forceUpdate();
  //         }
  //       );
  //     }
  //   });

  //   xhr.open("GET", this.baseurl + "loan/list?limit_start=1&limit_count=20");
  //   xhr.setRequestHeader("Cookie", this._retrieveData);

  //   xhr.send();
  // }

  onRefresh() {
    //Clear old data of the list
    this.setState({ loans: [], loyalties: [] });
    //Call the Service to get the latest data
    this.getLoans();
  }

  getTotalAmount = () => {
    let ttlAmount = 0;
    this.state.loyalties.forEach((loyalty) => {
    
      ttlAmount += parseFloat(loyalty.amount);
    });
    let ttlamount = ttlAmount.toFixed(2);
    this.setState({ totalamt: ttlamount });
  };

  getTextSize = () => {
    if (this.state.totalamt) {
      let list = this.state.totalamt.toString().split("");
      if (list.length >= 6) {
        return 45;
      } else {
        return 65;
      }
    } else {
      return 50;
    }
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <CustomHeader />,
      headerRight: () => <HeaderButtons navigation={navigation} />,
    };
  };
  
  render() {
    if (this.state.loading) {
      return (
        <View>
          <Spinner color="blue" />
        </View>
      );
    }
    // console.log(JSON.stringify(this.state.loyalties) + " loyalite");
    // console.log(JSON.stringify(this.state.loans) + " loan");
    return (
      <Container style={styles.Container}>
        <View style={styles.HeaderStyle}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <NavigationEvents onDidFocus={() => this.componentDidMount()} />
              <Icon
                active
                style={{ alignSelf: "center", color: "orange" }}
                name="coins"
                type="FontAwesome5"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text style={styles.GraphSubText}>your total cashback is </Text>
              <Text
                last
                style={{
                  position: "absolute",
                  left: "-30%",
                  fontSize: this.getTextSize(),
                  fontFamily: "OpenSans-BoldItalic",
                  color: "white",
                }}
              >
                {this.state.totalamt}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.ListContainer}>
          <FlatList
            data={this.state.loans}
            renderItem={({ item }) => {
              // const loyalty = this.state.loyalties.filter(
              //   (loyalties) => loyalties.loan_id == item.id
              // );
              const loyalty = this.state.loyalties
               console.log(JSON.stringify(loyalty) + "this is loyalty array");
              // if (item.status == 2 && loyalty[0]) {
                return (
                  <LoyaltyCard
                    // id={loyalty[0].loan_id}
                    id={loyalty[0].id}
                    amount={item.amount}
                    number={item.number}
                    camount={parseFloat(loyalty[0].amount).toFixed(2)}
                    baseurl={this.baseurl}
                    navigation={this.navigation}
                  />
                );
              // }
            }}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f0f0f0",
  },
  ListContainer: {
    flex: 2,
    padding: "2%",
  },
  HeaderStyle: {
    backgroundColor: "#0077b5",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: "2%",
  },
  GraphSubText: {
    position: "absolute",
    top: "20%",
    left: "-60%",
    fontSize: 10,
    color: "#D6D6D6",
    fontFamily: "OpenSans-BoldItalic",
  },
});

