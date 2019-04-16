import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
  Platform,
  AlertIOS,
  Alert,
  Dimensions
} from "react-native";
import DatePicker from "react-native-datepicker";
import Spinner from "./Spinner";

export default class AddRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: "",
      isLoading: false,
      morningStartTime: "",
      morningEndTime: "",
      eveningStartTime: "",
      eveningEndTime: "",
      ID: "",
      mst_hour: "",
      mst_min: "",
      mst_am_pm_: "",
      met_hour: "",
      met_min: "",
      met_am_pm: "",
      est_hour: "",
      est_min: "",
      est_am_pm: "",
      eet_hour: "",
      eet_min: "",
      eet_am_pm: "",
      EditChildTrue: "",
      routeId: ""
    };
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
    this.routeCount();
  }

  async routeCount() {
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

    await fetch("http://shieldcrypt.com:8091/svm-web//getCountRoute", config)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        console.log(res.responseObject);
        var count = res.responseObject;
        this.setState({
          count: count + 1
        });
        AsyncStorage.setItem("count", this.state.count.toString());
        console.log(this.state.count, "count");
        this.setState({ isLoading: false });
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

  async addRoute() {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        routeName: this.state.routeName,
        morningStartTime: this.state.morningStartTime,
        morningEndTime: this.state.morningEndTime,
        eveningStartTime: this.state.eveningStartTime,
        eveningEndTime: this.state.eveningEndTime,
        routeId: this.state.routeId,
        driver: {
          driverId: this.state.ID
        }
      })
    };

    await fetch("http://shieldcrypt.com:8091/svm-web//addRoute", config)
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.props.navigation.navigate("AddRoute2");
          this.setState({ isLoading: false });
        }
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
  async Validation() {
    if (
      this.state.mst_hour <= this.state.met_hour &&
      this.state.mst_min < this.state.met_min &&
      this.state.est_hour <= this.state.eet_hour &&
      this.state.est_hour > this.state.mst_hour &&
      this.state.est_hour > this.state.met_hour &&
      this.state.eet_min > this.state.est_min
    ) {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter driver name");
        },
        android: () => {
          ToastAndroid.show("Please enter driver name", ToastAndroid.SHORT);
        }
      })();
    } else this.addRoute();
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const { navigation } = this.props;
    this.state.itemId = navigation.getParam("itemId1", "NO-ID");
    console.log(this.state.itemId, "000000");
    this.state.EditChildTrue = navigation.getParam("EDITCHILD", "Edit-CHILD");
    if (this.state.EditChildTrue == 1) {
      this.state.routeId = null;
      console.log(this.state.routeId, " when 1");
    }
    if (this.state.EditChildTrue == 2) {
      this.state.routeId = navigation.getParam("ChildID", "child-ID");
      console.log(this.state.EditChildTrue, " when not 1");
    }
    return (
      <ScrollView>
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
              onPress={() => this.props.navigation.navigate("AddRoute2")}
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

          <View
            style={{
              height: height,
              width: width,
              backgroundColor: "white"
            }}
          >
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 17
                }}
              >
                ROUTE {this.state.count}
              </Text>
            </View>
            <View
              style={{
                marginTop: 30
              }}
            >
              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Route Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ routeName: text })}
                value={this.state.routeName}
              />
              <View
                style={{
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                  marginTop: 1,
                  marginLeft: 10,
                  marginRight: 30
                }}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                marginLeft: 30,
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 15
                }}
              >
                Morning Start Time
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: 30,
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between"
              }}
            >
              <DatePicker
                style={{
                  width: "69%",
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#FFFFFF"
                }}
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    marginLeft: 20,
                    borderWidth: 0
                  }
                }}
                date={this.state.morningStartTime}
                mode="time"
                showTime={{ use12Hours: false, format: "h:mm a" }}
                format="h:mm a"
                is24Hour={false}
                placeholder="10:10 AM"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={morningStartTime => {
                  var mst_hour_array = morningStartTime.split(":");
                  var mst_min_array = mst_hour_array[
                    mst_hour_array.length - 1
                  ].split(" ");
                  this.state.mst_hour = parseInt(mst_hour_array[0]);
                  this.state.mst_min = parseInt(mst_min_array[0]);
                  this.state.mst_am_pm =
                    mst_min_array[mst_min_array.length - 1];
                  this.setState({ morningStartTime: morningStartTime });
                  console.log(this.state.mst_hour, "morning start time hour");
                  console.log(this.state.mst_min, "morning start time min");
                  console.log(this.state.mst_am_pm, "morning start time am_pm");
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 30
              }}
            />
            <View
              style={{
                marginTop: 10,
                marginLeft: 30
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 15
                }}
              >
                Morning End Time
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: 30,
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between"
              }}
            >
              <DatePicker
                style={{
                  width: "69%",
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#FFFFFF"
                }}
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    marginLeft: 20,
                    borderWidth: 0
                  }
                }}
                date={this.state.morningEndTime}
                mode="time"
                showTime={{ use12Hours: false, format: "h:mm a" }}
                format="h:mm a"
                is24Hour={false}
                placeholder="10:10 AM"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={morningEndTime => {
                  var met_hour_array = morningEndTime.split(":");
                  var met_min_array = met_hour_array[
                    met_hour_array.length - 1
                  ].split(" ");
                  this.state.met_hour = parseInt(met_hour_array[0]);
                  this.state.met_min = parseInt(met_min_array[0]);
                  this.state.met_am_pm =
                    met_min_array[met_min_array.length - 1];
                  console.log(this.state.met_hour, "morning end time hour");
                  console.log(this.state.met_min, "morning end time min");
                  console.log(this.state.met_am_pm, "morning end time am_pm");
                  this.setState({ morningEndTime: morningEndTime });
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 30
              }}
            />
            <View
              style={{
                marginTop: 20,
                marginLeft: 30
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 15
                }}
              >
                Evening Start Time
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: 30,
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between"
              }}
            >
              <DatePicker
                style={{
                  width: "69%",
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#FFFFFF"
                }}
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    marginLeft: 20,
                    borderWidth: 0
                  }
                }}
                date={this.state.eveningStartTime}
                mode="time"
                showTime={{ use12Hours: false, format: "h:mm a" }}
                format="h:mm a"
                is24Hour={false}
                placeholder="10:10 PM"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={eveningStartTime => {
                  var est_hour_array = eveningStartTime.split(":");
                  var est_min_array = est_hour_array[
                    est_hour_array.length - 1
                  ].split(" ");
                  this.state.est_hour = parseInt(est_hour_array[0]);
                  this.state.est_min = parseInt(est_min_array[0]);
                  this.state.est_am_pm =
                    est_min_array[est_min_array.length - 1];
                  console.log(this.state.est_hour, "evening start time hour");
                  console.log(this.state.est_min, "evening end time min");
                  console.log(this.state.est_am_pm, "evening start time am_pm");
                  this.setState({ eveningStartTime: eveningStartTime });
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 30
              }}
            />
            <View
              style={{
                marginTop: 20,
                marginLeft: 30
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 15
                }}
              >
                Evening End Time
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: 30,
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between"
              }}
            >
              <DatePicker
                style={{
                  width: "69%",
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#FFFFFF"
                }}
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    marginLeft: 20,
                    borderWidth: 0
                  }
                }}
                date={this.state.eveningEndTime}
                showTime={{ use12Hours: false, format: "h:mm a" }}
                format="h:mm a"
                is24Hour={false}
                mode="time"
                placeholder="10:10 PM"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={eveningEndTime => {
                  var eet_hour_array = eveningEndTime.split(":");
                  var eet_min_array = eet_hour_array[
                    eet_hour_array.length - 1
                  ].split(" ");
                  this.state.eet_hour = parseInt(eet_hour_array[0]);
                  this.state.eet_min = parseInt(eet_min_array[0]);
                  this.state.eet_am_pm =
                    eet_min_array[eet_min_array.length - 1];
                  console.log(this.state.eet_hour, "evening start time hour");
                  console.log(this.state.eet_min, "evening end time min");
                  console.log(this.state.eet_am_pm, "evening end time am_pm");
                  this.setState({ eveningEndTime: eveningEndTime });
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 2,
                marginLeft: 10,
                marginRight: 30
              }}
            />
            <View
              style={{
                marginTop: 25,
                borderRadius: 30,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: "#ffcc00",
                height: 40,
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={() => this.Validation()}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    marginTop: 7
                  }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.isLoading && <Spinner />}
        </View>
      </ScrollView>
    );
  }
}
