import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
  Platform,
  AlertIOS,
  Alert
} from "react-native";
import ExpandableList from "react-native-expandable-section-list";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2", "row 3"])
    };
  }
  async componentWillMount() {
    console.log("home");
    try {
      var ID = await AsyncStorage.getItem("ID");
      this.setState({
        ID: ID
      });
      console.log(this.state.ID, "ID");
    } catch (error) {
      console.log(error);
    }
    this.getAllRoute();
  }
  async getAllRoute() {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        driver: {
          driverId: this.state.ID
        }
      })
    };

    await fetch("http://shieldcrypt.com:8091/svm-web/getAllRoutes", config)
      .then(res => res.json())
      .then(res => {
        console.log(res.responseObject);
        this.setState({
          data: res.responseObject
        });
        console.log(this.state.data, "data");
        for (let index = 0; index < res.responseObject.length; index++) {
          const element = res.responseObject[index];
          console.log(element);

          this.setState({
            data1: res.responseObject[index]
          });
          console.log(this.state.data1);
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
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
  getRouteSubscription(routeId) {
    console.log(routeId, "subscription route id");
    var temp1 = routeId;
    console.log(temp1);
    this.props.navigation.navigate("RouteSubscription", {
      root: temp1
    });
  }
  getChildID(childId) {
    console.log(childId, "232323232323232");
    var temp = childId;
    var CHILD_EDIT = 2;
    console.log(childId);
    this.props.navigation.navigate("KidProfile", {
      ChildID: temp,
      AddChild: CHILD_EDIT
    });
  }
  _renderRow = (rowItem, rowId, sectionId) => (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        justifyContent: "space-around",
        marginTop: 10,
        backgroundColor: "lightgrey"
      }}
    >
      <Text style={{ fontSize: 15, color: "black", marginTop: 5 }}>
        {rowItem.childName}
      </Text>
      <TouchableOpacity>
        <Image
          style={{ height: 30, width: 30, marginTop: 5 }}
          source={require("../Image/call.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.getChildID(rowItem.childId)}>
        <Image
          style={{ height: 30, width: 30, marginTop: 5 }}
          source={require("../Image/edit.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.deleteChild(rowItem.childId)}>
        <Image
          style={{ height: 30, width: 30, marginTop: 5 }}
          source={require("../Image/delete.png")}
        />
      </TouchableOpacity>
    </View>
  );
  _renderSection = (section, rowItem, sectionId) => {
    return (
      <View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 15
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "300",
              color: "black",
              marginTop: 10
            }}
          >
            {section}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 25
          }}
        >
          <TouchableOpacity>
            <Image
              style={{ height: 35, width: 35, right: 30 }}
              source={require("../Image/add_child.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getRouteSubscription(section)}>
            <Image
              style={{ height: 32, width: 32, right: 15 }}
              source={require("../Image/rupee.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderBottomColor: "lightgrey",
            borderBottomWidth: 1,
            marginTop: 5
          }}
        />
      </View>
    );
  };
  async deleteChild(childId) {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        childId: childId
      })
    };

    await fetch("http://shieldcrypt.com:8091/svm-web/deleteChild", config)
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
    return (
      <View>
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
            onPress={() => this.props.navigation.navigate("AddRoute")}
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
            KID MANAGEMENT
          </Text>
          <TouchableOpacity onPress={() => this.logout()}>
            <Image
              style={{ height: 35, width: 35, marginTop: 10, right: 20 }}
              source={require("../Image/shutdown.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white"
          }}
        >
          <ExpandableList
            dataSource={this.state.data}
            headerKey="routeName"
            memberKey="child"
            renderRow={this._renderRow}
            renderSectionHeaderX={this._renderSection}
            openOptions={[1, 2]}
          />

          <View
            style={{
              alignItems: "flex-end",
              marginTop: 40
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ height: 50, width: 50, right: 15 }}
                source={require("../Image/add_route.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row"
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  }
});
