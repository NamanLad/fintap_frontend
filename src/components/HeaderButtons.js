import React, { Component } from "react";
import { Button, Icon, View } from "native-base";

const HeaderButtons = ({ navigation }) => {
  if (navigation.state.routeName == "Dashboard") {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* <Button
          transparent
          light
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Icon name="notifications" type="MaterialIcons" />
        </Button> */}
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Button
          transparent
          light
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <Icon name="home" style={{color:"white"}} />
        </Button>
        {/* <Button
          transparent
          light
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Icon name="notifications" type="MaterialIcons" />
        </Button> */}
      </View>
    );
  }
};

export default HeaderButtons;
