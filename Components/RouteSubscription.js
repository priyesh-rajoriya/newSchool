import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
  Alert
} from "react-native";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2", "row 3"]),
      root1: "",
      selectedStartDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date
    });
  }
  componentDidMount() {
    this.addSubscription();
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
  async addSubscription() {
   // this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        routeName: this.state.root1
      })
    };

    await fetch(
      "http://shieldcrypt.com:8091/svm-web/getRouteByRouteName",
      config
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res.responseObject.child
        });
        console.log(this.state.data, "data found");
      })
      .catch(error => {
        console.log(error);
        Platform.select({
          ios: () => {
            AlertIOS.alert("Error, please try again later.");
          },
          android: () => {
            ToastAndroid.show("Error, please try again later.", ToastAndroid);
          }
        })();
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;
    this.state.root1 = navigation.getParam("root", "NO-ID");
    console.log(this.state.root1, "route number");
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "#ffcc00",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("KidManagement")}
          >
            <Image
              style={{ height: 30, width: 30, marginTop: 15, left: 15 }}
              source={require("../Image/back.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "black",
              marginTop: 20
            }}
          >
            ROUTE-1 SUBSCRIPTION
          </Text>
          <TouchableOpacity onPress={() => this.logout()}>
            <Image
              style={{ height: 35, width: 35, marginTop: 10, right: 20 }}
              source={require("../Image/shutdown.png")}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          extraData={this.state.data}
          data={this.state.data}
          refreshing={true}
          renderItem={({ item }) => (
            <View
              style={{
                height: 60,
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-between"
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5, left: 15 }}
                source={require("../Image/Owner.png")}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "300",
                  color: "black",
                  marginTop: 10,
                  left: 15
                }}
              >
                {item.childName}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MonthSelector")}
              >
                <Image
                  style={{ height: 30, width: 30, left: 15 }}
                  source={require("../Image/calender1.png")}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                  marginTop: 1,
                  marginLeft: 40,
                  marginRight: 20
                }}
              />
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100
  }
});
