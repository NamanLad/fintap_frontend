import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  BackHandler,
  RefreshControl,
  Alert,
} from "react-native";

import {
  Container,
  Spinner,
  Tab,
  Tabs,
  Button,
  Text,
  FooterTab,
  Footer,
  Icon,
} from "native-base";
import LoanCard from "../components/LoanCard";
import CustomHeader from "../components/CustomHeader";
import HeaderButtons from "../components/HeaderButtons";
import LoanPaidCard from "../components/LoanPaidCard";
import { NavigationEvents } from "react-navigation";
//amt due date
export default class DistributerScreen extends Component {
  _isMounted = false;
  
  constructor({ navigation }) {
    super();
    this.componentDidMount();
    this.navigation = navigation;
    this.state = {
      paidLoans: [],
      clearingLoans: [
        {id: 1, amount: 600, number: 104, days: 5, due_date: '2021-07-01', date: '2021-04-06', progress: 80},
        {id: 2, amount: 200, number: 105, days: 5, due_date: '2021-07-07', date: '2021-04-07', progress: 60},
        {id: 3, amount: 300, number: 106, days: 5, due_date: '2021-06-08', date: '2021-04-08', progress: 55},
      ],
      // newLoans: [],
      newLoans: [
        {id: 1, amount: 600, number: 101, days: 5, due_date: '2021-07-08', date: '2021-07-01', progress: 80},
        {id: 2, amount: 200, number: 102, days: 5, due_date: '2021-07-08', date: '2021-07-01', progress: 60},
        {id: 3, amount: 300, number: 103, days: 5, due_date: '2021-07-08', date: '2021-07-01', progress: 55},
        // {id: 4, amount: 400, number: 104, days: 5, due_date: '2021-05-09', date: '2021-04-09', progress: 27}
      ],
      loading: true,
      refreshing: false,
      checkcondition: 0, //this is for condition of checkboxes
      checkedinvoices: [], //this shows array of id's of selected invoices
      totalamount: 0, //this show total amount for selected checkboxes
      showfooter: true,
      showfinalpayment: false,
    };
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <CustomHeader />,
      headerRight: () => <HeaderButtons navigation={navigation} />,
    };
  };

  _setData = async (data) => {
    this.baseurl = data[1][1];
    this.user_id = data[0][1];
    this.session_id = data[2][1];
    //  console.log(data);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonPressAndroid
    );
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    this.navigation.navigate("Dashboard");
    return true;
  };

  // getPaidLoans = () => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //   xhr.addEventListener("readystatechange", () => {
  //     if (xhr.readyState === 4) {
  //       // console.log(JSON.parse(xhr.responseText));
  //       // this.setState({ paidLoans: JSON.parse(xhr.responseText) });
  //       // this.setState({ loading: false });
  //     }
  //   });
  //   // xhr.open("GET", this.baseurl + "components/paidLoan/" + this.user_id);
  //   // xhr.setRequestHeader("Cookie", this.session_id);

  //   xhr.send();
  // };

  // getClearingLoans = () => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", () => {
  //     if (xhr.readyState === 4) {
  //       //  console.log(typeof xhr.responseText);
  //       this.setState({ clearingLoans: JSON.parse(xhr.responseText) });
  //       this.setState({ loading: false });
  //     }
  //   });
  //   xhr.open("GET", this.baseurl + "components/clearingLoan/" + this.user_id);
  //   xhr.setRequestHeader("Cookie", this.session_id);

  //   xhr.send();
  // };
  // getNewLoans = () => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", () => {
  //     if (xhr.readyState === 4) {
  //       //   console.log(xhr.responseText);
  //       this.setState({ newLoans: JSON.parse(xhr.responseText) });
  //       this.setState({ loading: false });
  //     }
  //   });
  //   xhr.open("GET", this.baseurl + "components/newloan/" + this.user_id);
  //   xhr.setRequestHeader("Cookie", this.session_id);

  //   xhr.send();
  // };

  async componentDidMount() {
    this._isMounted = true;

    AsyncStorage.multiGet(["user_id", "base_url", "session_id"])
      .then((data) => this._setData(data))
      .then(() => {
        // this.getPaidLoans();
        // this.getClearingLoans();
        // this.getNewLoans();
      });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonPressAndroid
    );
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ loans: [] });
    // this.getPaidLoans();
    // this.getClearingLoans();
    // this.getNewLoans();
  }

  getElapsed(due_date) {
    let today = new Date();
    let dueDate = new Date(due_date);
    let remaining = dueDate - today;
    return remaining;
  }

  getRemainingDays(due_date) {
    let remaining = this.getElapsed(due_date);
    
    if (remaining < 0) {
      return -1;
    }
    let days = Math.floor(remaining / (24 * 60 * 60000));

    return days;
  }

  getPercentage(start_date, due_date) {
    let remaining = this.getElapsed(due_date);
    let startDate = new Date(start_date);
    let dueDate = new Date(due_date);
    let total = dueDate - startDate;
    
    if (remaining >= 0) {
      return Math.floor((remaining / total) * 100).toString();
    } else {
      return "100";
    }
  }
  checkedinvoiceId = (checked, id, amount) => {
    // console.log(JSON.parse(JSON.stringify(amount)).amount+" amount in rupees");
    if (!checked) {
      //push id here
      this.setState({
        totalamount:
          this.state.totalamount +
          parseInt(JSON.parse(JSON.stringify(amount)).amount),
      });
      this.setState({ checkedinvoices: [...this.state.checkedinvoices, id] });

      // console.log(
      //   JSON.stringify(this.state.checkedinvoices) +
      //     "this.state.checkedinvoicesif"
      // );

      return 0;
    } else {
      const itemIndex = this.state.checkedinvoices.findIndex((x) => {
        // console.log(x.id + "kuch bhi");
        //console.log(JSON.parse(JSON.stringify(id)).id);
        return x.id === JSON.parse(JSON.stringify(id)).id;
      });
      // console.log(itemIndex + " itemindex");
      const items = [...this.state.checkedinvoices];
      // console.log(JSON.stringify(items) + "items");
      items.splice(itemIndex, 1);
      // console.log(JSON.stringify(items) + "items");

      this.setState({
        checkedinvoices: items,
        totalamount:
          this.state.totalamount -
          parseInt(JSON.parse(JSON.stringify(amount)).amount),
      });

      // console.log(
      //   JSON.stringify(this.state.checkedinvoices) + "checkedinvoiceselse"
      // );
      return 0;
    }
  };
  render() {
    // if (this.state.loading) {
    //   return (
    //     <View>
    //       <Spinner color="blue" />
    //     </View>
    //   );
    // }
    return (
      <Container style={styles.Container}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        <Tabs>
          <Tab
            heading="O/S"
            tabStyle={{ backgroundColor: "#0077b5" }}
            activeTabStyle={{ backgroundColor: "#0072AD" }}
          >
            <View style={styles.ListContainer}>
              <FlatList
                data={this.state.newLoans}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.cardview}>
                      <LoanCard
                        style={{ flex: 1 }}
                        id={item.id}
                        amount={item.amount}
                        number={item.number}
                        days={this.getRemainingDays(
                          item.due_date.split(" ")[0]
                        )}
                        due_date={item.due_date.split(" ")[0]}
                        progress={this.getPercentage(
                          item.date.split(" ")[0],
                          item.due_date.split(" ")[0]
                        )}
                        // progress={30}
                        baseurl={this.baseurl}
                        checkcondition={this.state.checkcondition % 2}
                        navigation={this.navigation}
                        checkedinvoiceId={this.checkedinvoiceId}
                      />
                    </View>
                  );
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
                keyExtractor={(item) => item.id}
              />
              {this.state.showfooter && (
                <Footer style={{ backgroundColor: "transparent" }}>
                  <FooterTab style={{ backgroundColor: "transparent" }}>
                    <Button
                      light
                      rounded
                      onPress={() => {
                        this.setState({
                          checkcondition: this.state.checkcondition + 1,
                          showfooter: false,
                          showfinalpayment: true,
                        });
                      }}
                      style={styles.makepaymentbutton}
                    >
                      <Text style={{ fontSize: 15, color: "white" }}>
                        Make Payments
                      </Text>
                    </Button>
                  </FooterTab>
                </Footer>
              )}
              {this.state.showfinalpayment && (
                <Footer style={{ backgroundColor: "transparent" }}>
                  <FooterTab style={{ backgroundColor: "transparent" }}>
                    <Button
                      disabled={this.state.totalamount > 0 ? false : true}
                      iconLeft
                      light
                      onPress={() => {
                        Alert.alert(
                          "Pay for",
                          `${JSON.stringify(
                            this.state.checkedinvoices
                          )} \nTotal amount is  ${
                            this.state.totalamount
                          } rupees`
                        );
                        console.log('the array is: ')
                        console.log(this.state.checkedinvoices)
                      }}
                      style={{
                        backgroundColor:
                          this.state.totalamount > 0 ? "green" : "grey",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    >
                      <Icon name="checkbox" />
                      <Text>Confirm Payment</Text>
                    </Button>
                    <Button
                      iconLeft
                      light
                      onPress={async () => {
                        await this.setState({
                          checkcondition: this.state.checkcondition + 1,
                          showfooter: true,
                          showfinalpayment: false,
                          checkedinvoices: [],
                          totalamount: 0,
                        });
                      }}
                      style={styles.cancelpaymentbutton}
                    >
                      <Icon>
                        <Text>X</Text>
                      </Icon>
                      <Text>Cancel</Text>
                    </Button>
                  </FooterTab>
                </Footer>
              )}
            </View>
          </Tab>
          <Tab
            heading="Pending"
            tabStyle={{ backgroundColor: "#0077b5" }}
            activeTabStyle={{ backgroundColor: "#0072AD" }}
          >
            <View style={styles.ListContainer}>
              <FlatList
                data={this.state.clearingLoans}
                renderItem={({ item }) => {
                  return (
                    // <LoanPaidCard
                    //   id={item.id}
                    //   amount={item.amount}
                    //   number={item.number}
                    //   days={this.getRemainingDays(item.due_date.split(" ")[0])}
                    //   due_date={item.due_date.split(" ")[0]}
                    //   // progress={this.getPercentage(
                    //   //   item.date.split(" ")[0],
                    //   //   item.due_date.split(" ")[0]
                    //   // )}
                    //   progress={30}
                    //   baseurl={this.baseurl}
                    //   navigation={this.navigation}
                    // />
                    <LoanCard
                        style={{ flex: 1 }}
                        id={item.id}
                        amount={item.amount}
                        number={item.number}
                        days={this.getRemainingDays(
                          item.due_date.split(" ")[0]
                        )}
                        due_date={item.due_date.split(" ")[0]}
                        // progress={this.getPercentage(
                        //   item.date.split(" ")[0],
                        //   item.due_date.split(" ")[0]
                        // )}
                        progress={0}
                        // progress={30}
                        baseurl={this.baseurl}
                        checkcondition={this.state.checkcondition % 2}
                        navigation={this.navigation}
                        checkedinvoiceId={this.checkedinvoiceId}
                      />
                  );
                }}
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
                keyExtractor={(item) => item.id}
              />
            </View>
          </Tab>
          <Tab
            heading="Paid"
            tabStyle={{ backgroundColor: "#0077b5" }}
            activeTabStyle={{ backgroundColor: "#0072AD" }}
          >
            <View style={styles.ListContainer}>
              <FlatList
                data={this.state.paidLoans}
                renderItem={({ item }) => {
                  return (
                    <LoanPaidCard
                      id={item.id}
                      amount={item.amount}
                      number={item.number}
                      days={this.getRemainingDays(item.due_date.split(" ")[0])}
                      due_date={item.due_date.split(" ")[0]}
                      // progress={this.getPercentage(
                      //   item.date.split(" ")[0],
                      //   item.due_date.split(" ")[0]
                      // )}
                      progress={30}
                      baseurl={this.baseurl}
                      navigation={this.navigation}
                    />
                  );
                }}
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
                keyExtractor={(item) => item.id}
              />
            </View>
          </Tab>
        </Tabs>
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
    flex: 1,
    padding: "2%",
  },
  cardview: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "space-evenly",
  },
  makepaymentbutton: {
    backgroundColor: "#0077b5",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelpaymentbutton: {
    backgroundColor: "red",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
