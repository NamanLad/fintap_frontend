import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Container, Text, Right } from "native-base";

const CustomHeader = () => {
  return (
    <View>
      <Right>
        <View style={styles.HeaderView}>
          <Text style={styles.HeaderText}>FinTap</Text>
          <Text info style={styles.TagStyle}>
            Empowered You
          </Text>
        </View>
      </Right>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  HeaderView: {
    backgroundColor: "#0077b5"
  },
  HeaderText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#ECECEC"
  },
  TagStyle: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#ECECEC"
  }
});
