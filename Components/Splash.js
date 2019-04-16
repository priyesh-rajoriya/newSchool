import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var mobileId = await AsyncStorage.getItem("mobile");
    console.log(mobileId, "mobile");
    try {
      setTimeout(() => {
        if (mobileId != null && mobileId != "" && mobileId != undefined) {
          this.props.navigation.navigate("Login");
        } else {
          this.props.navigation.navigate("DriverLogin");
        }
      }, 1500);
    } catch (error) {
      console.log("error" + error);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#ffcc00" }}
      >
        <View style={{ alignItems: "center", marginTop: 70 }}>
          <Image
            style={{ height: 350, width: 260 }}
            source={require("../Image/splash_logo.png")}
          />
        </View>
        <View
          style={{
            marginTop: 70,
            alignItems: "center"
          }}
        >
          <Image
            style={{ height: 70, width: 250 }}
            source={require("../Image/register_arts.png")}
          />
        </View>
      </View>
    );
  }
}
