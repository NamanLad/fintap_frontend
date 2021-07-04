import React, { Component } from "react";
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
import TermsAndCondition from "./TermsAndCondition";
import { NavigationEvents } from "react-navigation";
import Modal from "react-native-modal";
import CustomHeader from "../components/CustomHeader";
import HeaderButtons from "../components/HeaderButtons";
import OneSignal from "react-native-onesignal";
import Pdf from "react-native-pdf";
export default class TermsAndConditionScreen extends Component {
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
          user_id:0
        };
      }
    
      static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: () => <CustomHeader />,
        
        };
      };

      componentDidMount=async() =>{
     
    
    
     
     
      }
    
      render() {
  
    
        return (
          <Container>
           
         
          </Container>
        );
      }
    }
    
    const styles = StyleSheet.create({
    })