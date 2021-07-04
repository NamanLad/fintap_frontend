import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Spinner,
  Tab,
  Tabs,
} from 'native-base';
import InvoiceCard from '../components/InvoiceCard';
import CustomHeader from '../components/CustomHeader';
import HeaderButtons from '../components/HeaderButtons';
import { NavigationEvents } from 'react-navigation';
export default class InvoiceCards extends Component {
  _isMounted = false;
  constructor({navigation}) {
    super();
    this.navigation = navigation;
    this.state = {
      invoices: [],
      loading: true,
      refreshing: false,
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('session_id');
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
    } catch (error) {
      console.log('cannot retrive session_id:', error);
    }
  };

  static navigationOptions = ({navigation}) => {
    return {
        headerTitle: () => <CustomHeader />,
        headerRight: () => <HeaderButtons navigation={navigation} />
    };
  };

  getInvoices = () => {

    fetch('http://localhost:3000/api/invoices', {method: 'GET'})
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      this.setState({invoices: data, loading: false})
    })


    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener('readystatechange', () => {
    //   if (xhr.readyState === 4) {
    //     console.log(xhr);
    //     this.setState({invoices: JSON.parse(xhr.responseText).records});
    //     this.setState({loading: false});
    //   }
    //   this.setState({loading: false})
    // });
    
    // xhr.open('GET', this.navigation.getParam('baseurl') + 'components/invoicelist/59');
    // xhr.setRequestHeader('Cookie', this._retrieveData());

    // xhr.send();
  };
  //`${this.state.invoices.retailer_id}`
  onRefresh() {
    //Clear old data of the list
    this.setState({invoices: []});
    //Call the Service to get the latest data
    this.getInvoices();
    
  }
  async componentDidMount() {
    // fetch('http://localhost:3000/api/invoices', {method: 'GET'})
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   // this.setState
    // })
    // const asdf = await fetch('http://localhost:3000/api/invoices/608986bb17cd3728d440371c');
    // const asdf = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // // console.log(asdf)
    // const result = await asdf;
    // console.log(result);
    this._isMounted = true;
    this.getInvoices();
    
  }
  componentWillUnmount = () => {
    this._isMounted = false;
  };

  getTimeDiff(createAt) {
    var date1 = new Date(createAt);
    var date2 = new Date();

    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if (hh > 23) {
      return hh + 'h:' + mm + 'm:' + ss + 's ago';
    } else {
      return createAt;
    }
    // alert(hh + ":" + mm + ":" + ss);
  }

  render() {
    console.log(JSON.stringify(this.state.invoices[0])+"1234567890987654321")
    if (this.state.loading) {
      return (
        <View>
          <Spinner color="blue" />
        </View>
      );
    }
    console.log('------------------------------')
    console.log(this.state.invoices)
    console.log(this.state.invoices.length)
    console.log('------------------------------')
    return (
      <Container style={styles.Container}>
       <NavigationEvents
                onDidFocus={() => this.componentDidMount()}
                />
        <Tabs>
          <Tab
            heading="Current"
            tabStyle={{backgroundColor: '#0077b5'}}
            activeTabStyle={{backgroundColor: '#0072AD'}}>
            <FlatList
              data={this.state.invoices}
              renderItem={({item}) => {
              
                if (item.status == 'pending') {
                  return (
                    <InvoiceCard
                      id={item.id}
                      amount={item.amount}
                      number={item.number}
                      date={item.bill_date}
                      details={item.details}
                      retailer_id={item.retailer_id}
                      distributor_id={item.distributor_id}
                      distributor_name={item.distributor_name}
                      product_id={item.prodcut_id}
                      status={item.status}
                      due_date={item.due_date}
                      created_date={item.created_date}
                      navigation={this.navigation}
                      baseurl={this.navigation.getParam('baseurl')}
                     
                    />
                  );
                }
              }}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              keyExtractor={item => item.id}
            />
          </Tab>
          <Tab
            heading="History"
            tabStyle={{backgroundColor: '#0077b5'}}
            activeTabStyle={{backgroundColor: '#0072AD'}}>
            <FlatList
              data={this.state.invoices}
              renderItem={({item}) => {
                if (item.status == 'accepted' || item.status == 'rejected' || item.status == null) {
                  return (
                    <InvoiceCard
                      id={item.id}
                      amount={item.amount}
                      number={item.number}
                      date={item.date}
                      details={item.details}
                      retailer_id={item.retailer_id}
                      distributor_name={item.distributor_name}
                      distributor_id={item.distributor_id}
                      product_id={item.product_id}
                      status={item.status}
                      navigation={this.navigation}
                      due_date={item.due_date}
                      created_date={item.created_date}
                      baseurl={this.navigation.getParam('baseurl')}
                    />
                  );
                }
              }}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              keyExtractor={item => item.id}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});
