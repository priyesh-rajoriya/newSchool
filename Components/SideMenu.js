import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Alert
} from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      id: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View onPress={() => this.props.navigation.navigate("userProfile")} />
          <View>
            <Text style={{ fontSize: 16, color: "white" }}>
              {" "}
              {this.state.firstName} {this.state.lastName}
            </Text>
            <Text style={{ fontSize: 14, color: "white", marginTop: 6 }}>
              {" "}
              {this.state.email}{" "}
            </Text>
            <Text style={{ fontSize: 14, color: "white", marginTop: 3 }}>
              {" "}
              {this.state.mobile}{" "}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("KidManagement")}
        >
          <View style={{ marginTop: 30, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Kid Management
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("KidProfile")}
        >
          <View style={{ marginTop: 15, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Pick and Drop
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WalletManagement")}
        >
          <View style={{ marginTop: 15, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Wallet Management
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("PaymentManagement")}
        >
          <View style={{ marginTop: 15, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Payment Management
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ReferDriver")}
        >
          <View style={{ marginTop: 15, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Refer a Driver
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WithdrawWallet")}
        >
          <View style={{ marginTop: 15, flexDirection: "row", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginLeft: 20,
                color: "white"
              }}
            >
              Withdraw from Wallet{" "}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#424242"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
