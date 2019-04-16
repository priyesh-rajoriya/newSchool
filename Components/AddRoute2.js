import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  FlatList,
  BackHandler,
  Platform,
  ToastAndroid,
  ScrollView,
  Dimensions,
  AsyncStorage,
  AlertIOS
} from "react-native";
import Spinner from "./Spinner";

export default class AddRoute2 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      data: [],
      ID: "",
      id: "",
      route: "",
      element: [],
      refreshing: false,
      isLoading: false,
      dataSource: ds.cloneWithRows(["row 1", "row 2", "row 3"]),
      routeName: "",
      morningStartTime: "",
      morningEndTime: "",
      eveningStartTime: "",
      eveningEndTime: "",
      routeId: "",
      routeId_Array: [],
      root: ""
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
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
        for (let i = 0; i < res.responseObject.length; i++) {
          this.state.routeId_Array[i] = res.responseObject[i].routeId;
        }
        this.setState({
          data: res.responseObject
          // set array of routes
          //
        });
        for (let i = 0; i < this.state.routeId_Array.length; i++) {
          console.log(
            this.state.routeId_Array[i],
            "Route_Id_Array = " + i + " = "
          );
          AsyncStorage.setItem(
            "route_array",
            this.state.routeId_Array[i].toString()
          );
          console.log(this.state.route_array, "idroute");
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
  deleteRoute(routeId) {
    this.deleteRouted(routeId);
    var id = routeId;
    this.setState({
      id: routeId
    });
    console.log(id, "123");
  }

  async editRouted(routeId) {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        routeId: routeId
      })
    };

    await fetch("http://shieldcrypt.com:8091/svm-web/getRouteByRouteId", config)
      .then(res => res.json())
      .then(res => {
        console.log(res.responseObject.routeId);
        var route = res.responseObject.routeId;
        this.setState({
          route: route
        });
        AsyncStorage.setItem("route", this.state.route.toString());
        console.log(this.state.route, "route details");
        //navigation code missing here
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
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

  async deleteRouted(routeId) {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        routeId: routeId
      })
    };
    await fetch("http://shieldcrypt.com:8091/svm-web/deleteRoute", config)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.state.data.splice(routeId, 1);
        this.setState({
          data: res.responseObject
        });
        this.setState({ isLoading: true });
        this.getAllRoute();
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
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

  addChild(routeId, NewChild) {
    console.log(routeId, "route id =");
    var temp = routeId;
    var newChild = NewChild;
    console.log(temp);
    this.props.navigation.navigate("KidProfile", {
      itemId: temp,
      AddChild: newChild
    });
  }
  editChild(routeId, NewChild) {
    console.log(routeId, "route id =");
    var temp1 = routeId;
    var editChild = NewChild;
    console.log(temp1);
    this.props.navigation.navigate("AddRoute", {
      itemId: temp1,
      EditChild: editChild
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

  add() {
    this.props.navigation.navigate("AddRoute");
    this.setState({ isLoading: false });
  }

  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: "white"
        }}
      >
        <ScrollView>
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
              ROUTE MANAGEMENT
            </Text>
            <TouchableOpacity onPress={() => this.logout()}>
              <Image
                style={{ height: 35, width: 35, marginTop: 15, right: 20 }}
                source={require("../Image/shutdown.png")}
              />
            </TouchableOpacity>
          </View>
          <View style>
            <FlatList
              extraData={this.state.data}
              data={this.state.data}
              refreshing={true}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginLeft: 15
                  }}
                >
                  <TouchableOpacity onPress={() => this.exlist()}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "300",
                        color: "black",
                        marginTop: 10
                      }}
                    >
                      {item.routeName}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "grey"
                      }}
                    >
                      {item.morningStartTime}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "grey",
                        paddingLeft: 5
                      }}
                    >
                      TO
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "grey",
                        paddingLeft: 5
                      }}
                    >
                      {item.morningEndTime}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "grey"
                        }}
                      >
                        {item.eveningStartTime}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "grey",
                          paddingLeft: 5
                        }}
                      >
                        TO
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "grey",
                          paddingLeft: 5
                        }}
                      >
                        {item.eveningEndTime}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.editChild(item.routeId, 1)}
                    >
                      <Image
                        style={{
                          height: 35,
                          width: 35,
                          marginBottom: 20,
                          right: 30
                        }}
                        source={require("../Image/edit.png")}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.deleteRoute(item.routeId)}
                    >
                      <Image
                        style={{
                          height: 35,
                          width: 35,
                          marginBottom: 20,
                          right: 20
                        }}
                        source={require("../Image/delete.png")}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.addChild(item.routeId, 1)}
                    >
                      <Image
                        style={{
                          height: 35,
                          width: 35,
                          marginBottom: 20,
                          right: 10
                        }}
                        source={require("../Image/add_child.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "lightgrey",
                      borderBottomWidth: 1
                    }}
                  />
                </View>
              )}
            />

            <View
              style={{
                alignItems: "flex-end",
                marginTop: 20,
                height: height / 2,
                width: width
              }}
            >
              <TouchableOpacity onPress={() => this.add()}>
                <Image
                  style={{ height: 45, width: 45, right: 15 }}
                  source={require("../Image/add_route.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.isLoading && <Spinner />}
        </ScrollView>
      </View>
    );
  }
}
