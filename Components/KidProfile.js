import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  ToastAndroid,
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
      childName: "",
      schoolName: "",
      fatherName: "",
      fatherMobile: "",
      dataSource: ds.cloneWithRows(["row 1", "row 2", "row 3"]),
      itemId: "",
      child: "",
      AddChildTrue: ""
    };
  }

  validate() {
    if (this.state.childName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("enter child name");
        },
        android: () => {
          ToastAndroid.show("enter child name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.schoolName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("enter school name");
        },
        android: () => {
          ToastAndroid.show("enter school name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.fatherName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("enter father name");
        },
        android: () => {
          ToastAndroid.show("enter father name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.Mobile == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("enter father mobile number");
        },
        android: () => {
          ToastAndroid.show("enter father mobile number", ToastAndroid.SHORT);
        }
      })();
      return false;
    } else {
      this.addChild();
    }
  }
  async addChild() {
    this.setState({ isLoading: true });
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        childName: this.state.childName,
        schoolName: this.state.schoolName,
        fatherName: this.state.fatherName,
        fatherMobile: this.state.fatherMobile,
        routeId: this.state.itemId,
        childId: this.state.child
      })
    };

    await fetch("http://shieldcrypt.com:8091/svm-web/addChild", config)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    this.props.navigation.navigate("KidManagement")
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

  render() {
    const { navigation } = this.props;
    this.state.itemId = navigation.getParam("itemId", "NO-ID");
    console.log(this.state.itemId, "000000");
    this.state.AddChildTrue = navigation.getParam("AddChild", "ADD-CHILD");
    if (this.state.AddChildTrue == 1) {
      this.state.child = null;
      console.log(this.state.child, " when 1");
    }
    if (this.state.AddChildTrue == 2) {
      this.state.child = navigation.getParam("ChildID", "child-ID");
      console.log(this.state.child, " when not 1");
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
              onPress={() => this.props.navigation.goBack(null)}
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
              KID PROFILE
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
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  fontSize: 17,
                  fontWeight: "bold"
                }}
              >
                *
              </Text>
              <TextInput
                style={{ fontSize: 13 }}
                placeholder=" Child's Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ childName: text })}
                value={this.state.childName}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  fontSize: 17,
                  fontWeight: "bold"
                }}
              >
                *
              </Text>
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="School Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ schoolName: text })}
                value={this.state.schoolName}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Morning Pickup Address"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="School Address"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Afternoon Drop Address"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  fontSize: 17,
                  fontWeight: "bold"
                }}
              >
                *
              </Text>
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Father's Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ fatherName: text })}
                value={this.state.fatherName}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  fontSize: 17,
                  fontWeight: "bold"
                }}
              >
                *
              </Text>
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Father's Mobile"
                placeholderTextColor="grey"
                maxLength={10}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ fatherMobile: text })}
                value={this.state.fatherMobile}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Father's Email"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Mother's Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Mother's Mobile"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Mother's Email"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Guardian Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Guardian Mobile"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 20
              }}
            >
              <TextInput
                style={{ fontSize: 13 }}
                placeholder="Guardian Email"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                marginLeft: 40,
                justifyContent: "space-between"
              }}
            >
              <TextInput
                style={{ fontSize: 13, right: 20 }}
                placeholder="School ID"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity>
                <Image
                  style={{ height: 25, width: 25, marginTop: 10, right: 30 }}
                  source={require("../Image/upload.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 10,
                borderRadius: 30,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: "#ffcc00",
                height: 40,
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={() => this.validate()}>
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
        </View>
      </ScrollView>
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
