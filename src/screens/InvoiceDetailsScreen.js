import React, {Component} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {
  Container,
  Thumbnail,
  Text,
  Icon,
  Card,
} from 'native-base';
import VerticleDivider from '../components/VerticleDivider';
import ActionButtons from '../components/AcceptRejectButton';
import CustomHeader from '../components/CustomHeader';
import HeaderButtons from '../components/HeaderButtons';
import { NavigationEvents } from 'react-navigation';

export default class DetailsScreen extends Component {
  constructor({navigation}) {
    super();
    this.navigation = navigation;
  }

  static navigationOptions = ({navigation}) => {
    return {
        headerTitle: () => <CustomHeader />,
        headerRight: () => <HeaderButtons navigation={navigation}/>
    };
  };

  render() {
    return (
      <Container style={styles.Container}>
        <View style={styles.HeaderStyle}>
      
          <Thumbnail
            source={require('../../assets/logo-sample.png')}
            style={styles.ThumbnailStyle}
          />
          <Text style={styles.HeaderTextStyle}>
            {this.navigation.getParam('distributor_name')}
          </Text>
        </View>
        <View style={styles.BodyStyle}>
          <Card style={styles.DetailsStyle}>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: '1%'}}>
              <Text style={styles.DetailsContextText}>Invoice No.</Text>
              <Text style={styles.DetailsText}>
                {(JSON.stringify(this.navigation.getParam('number')).replace(/['"]+/g, ''))}
              </Text>
            </View>
            <VerticleDivider height="100" />
            <View style={{flex: 1, flexDirection: 'column', marginRight: '1%'}}>
              <Text style={styles.DetailsContextText}>Amount</Text>
              <Text style={styles.DetailsText}>
                <Icon name="rupee" type="FontAwesome" />
                {(parseFloat(JSON.stringify(" "+this.navigation.getParam('amount')).replace(/['"]+/g, ''))).toFixed(2)}
              </Text>
            </View>
          
          </Card>
          <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{}}>Created Date</Text>
            <Text style={{}}>{JSON.stringify(this.navigation.getParam('created_date')).replace(/['"]+/g, '')}</Text>
          </View>

          {/* <Card style={styles.ButtonsStyle}>
            <CardItem
              style={styles.CustomButton}
              button
              onPress={() => alert('Some Invoice')}>
              <Thumbnail
                small
                square
                source={require('../../assets/view.png')}
              />
              <Text>View</Text>
            </CardItem>
            <VerticleDivider height="100" />
            <CardItem
              style={styles.CustomButton}
              button
              onPress={() => alert('downloading Invoice')}>
              <Thumbnail
                small
                square
                source={require('../../assets/download.png')}
              />
              <Text>Download</Text>
            </CardItem>
          </Card> */}

          <ActionButtons
            status={this.navigation.getParam('status')}
            navigation={this.navigation}
          /> 
          
        </View>
        

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  HeaderStyle: {
    backgroundColor: '#0077b5',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  HeaderTextStyle: {
    fontSize: 24,
    color: '#fff',
    paddingTop: '2%',
    fontFamily: 'OpenSans-Semibold',
  },
  BodyStyle: {
    flex: 3,
    padding: '1%',
  },
  DetailsStyle: {
    flex: 1 / 3,
    flexDirection: 'row',
    paddingTop: '5%',
    borderRadius: 8,
    bottom: '10%',
  },
  DetailsContextText: {
    flex: 1,
    fontSize: 14,
    alignSelf: 'center',
    textShadowOffset: {width: 20, height: 20},
    fontWeight: '100',
    color: '#696969',
  },
  DetailsText: {
    flex: 2,
    fontSize: 28,
    alignSelf: 'center',
    fontFamily: 'OpenSans-Semibold',
    paddingTop: '5%',
    color: '#2f2f2f',
  },
  StatusText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  ActionsStyle: {
    flex: 1 / 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
    //backgroundColor: 'blue',
  },
  ButtonsStyle: {
    flex: 1 / 3,
    flexDirection: 'row',
    paddingTop: '5%',
    borderRadius: 8,
    bottom: '10%',
  },
  CustomButton: {
    flex: 1,
    flexDirection: 'column',
  },
  Button: {
    margin: '3%',
    flex: 1,
  },
});
