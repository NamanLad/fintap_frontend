import React, {Component, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {
  Container,
  Spinner,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
} from 'native-base';
import DistributerCard from '../components/DistributerCard';
import CustomHeader from '../components/CustomHeader';
import HeaderButtons from '../components/HeaderButtons';
import { NavigationEvents } from 'react-navigation';

export default class DistributerScreen extends Component {
  _isMounted = false;
  constructor({navigation}) {
    super();
    this.navigation = navigation;
    this.state = {
      distributors: [],
      loading: true,
      isVisible: false,
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
        headerTitle: () => <CustomHeader />,
        headerRight: () => <HeaderButtons navigation={navigation}/>
    };
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({distributors: []});
    //Call the Service to get the latest data
    this.getDistributors();
  }

  getDistributors=() =>{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange',async () => {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      await  this.setState({distributors: JSON.parse(xhr.responseText).records});
        this.setState({loading: false});
      }
    });

    xhr.open(
      'GET',
      this.navigation.getParam('baseurl') +
        'distributors/list?limit_start=1&limit_count=20',
    );
    xhr.setRequestHeader('Cookie', this._retrieveData);

    xhr.send();
  }

  async componentDidMount() {
    this.getDistributors();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Spinner color="rebluesd" />
        </View>
      );
    }
    return (
      <Container style={styles.Container}>
        <View style={styles.ListContainer}>
        <NavigationEvents
                onDidFocus={() => this.componentDidMount()}
                />
          <FlatList
            data={this.state.distributors}
            renderItem={({item}) => (
              <DistributerCard
                id={item.id}
                name={item.name}
                phone={item.phone}
                navigation={this.navigation}
              />
            )}
            keyExtractor={item => item.id}
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
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  ListContainer: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,
  },
});
