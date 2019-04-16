import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AlertAndroid,
  AlertIOS,
  AsyncStorage,
  Alert,
  Platform
} from "react-native";
export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout() {
    try {
      Platform.select({
        ios: () => {
          AlertIOS.alert("", "Are you sure you want to logout.", [
            {
              text: "CANCEL",
              onPress: () => console.log("CANCEL Pressed"),
              style: "cancel"
            },
            {
              text: "LOGOUT",
              onPress: () => {
                this.props.navigation.navigate("DriverLogin");
              }
            }
          ]);
        },
        android: () => {
          Alert.alert("", "Are you sure you want to logout.", [
            {
              text: "CANCEL",
              onPress: () => console.log("CANCEL Pressed"),
              style: "cancel"
            },
            {
              text: "LOGOUT",
              onPress: () => {
                this.props.navigation.navigate("DriverLogin");
              }
            }
          ]);
        }
      })();
    } catch (e) {
      console.log(e);
    }
  }
  async componentWillMount() {
    console.log("home");
    try {
      var ID = await AsyncStorage.getItem("ID");
      var route = await AsyncStorage.getItem("route");
      this.setState({
        ID: ID,
        route: route
      });
      console.log(this.state.ID, "ID");
      console.log(this.state.route, "route details");
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
        <View
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "#ffcc00",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Image
            style={{ height: 40, width: 40, marginTop: 10, left: 20 }}
            source={require("../Image/Logo.png")}
          />
          <TouchableOpacity onPress={() => this.logout()}>
            <Image
              style={{ height: 35, width: 35, marginTop: 10, right: 20 }}
              source={require("../Image/shutdown.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 30,
            marginLeft: 30,
            marginRight: 30
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 15
            }}
          >
            Your profile is under consideration.Thank you for your patience!
          </Text>
          <Image
            style={{ height: 70, width: 250, marginTop: 60, left: 30 }}
            source={require("../Image/register_arts.png")}
          />
        </View>
      </View>
    );
  }
}
