import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
} from 'native-base';
export default class FooterTabsBadge extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button badge vertical>
            {/* <Badge><Text>2</Text></Badge> */}
            <Icon name="apps" />
            <Text>Invoices</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Approved</Text>
          </Button>
          <Button active badge vertical>
            {/* <Badge ><Text>51</Text></Badge> */}
            <Icon active name="navigate" />
            <Text>Stockists</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Cash Back</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
