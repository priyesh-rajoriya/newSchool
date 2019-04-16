import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  BackHandler,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  AlertIOS,
  AsyncStorage
} from "react-native";
import { Base64 } from "js-base64";
export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      email: "",
      password: "",
      Conpassword: "",
      user: ""
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
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
  validate() {
    if (this.state.mobile == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter mobile");
        },
        android: () => {
          ToastAndroid.show("Please enter mobile", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    var val = this.state.mobile;
    if (/^[0]?[789]\d{10}$/.test(val)) {
      // value is ok, use it
      Platform.select({
        ios: () => {
          AlertIOS.alert("Mobile is Not Correct");
        },
        android: () => {
          ToastAndroid.show("Mobile is Not Correct", ToastAndroid.SHORT);
        }
      })();
      return false;
    } else {
      this.Registration();
    }
  }

  async Registration() {
    var val = this.state.mobile;
    if (/^\d{10}$/.test(val)) {
      // value is ok, use it
    } else {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter correct number");
        },
        android: () => {
          ToastAndroid.show("Please enter correct number", ToastAndroid.SHORT);
        }
      })();
      number.focus();
      return false;
    }

    if (this.state.password == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter password");
        },
        android: () => {
          ToastAndroid.show("Please enter password", ToastAndroid.SHORT);
        }
      })();
      return false;
    }

    if (this.state.password.length >= 8) {
      if (this.state.Conpassword != "") {
        if (this.state.password == this.state.Conpassword) {
          this.setState({ LoadingDialog: true });
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              mobile: this.state.mobile,
              email: this.state.email,
              password: Base64.encode(this.state.password),
              Conpassword: Base64.encode(this.state.Conpassword),
              userType: "driver",
              userStatus: "1"
            })
          };
          console.log(config);
          await fetch(
            "http://shieldcrypt.com:8091/svm-web/userRegistration",
            config
          )
            .then(res => res.json())
            .then(res => {
              console.log(res);
              console.log(res.responseObject.userId);
              var userid = res.responseObject.userId;
              console.log(userid, "userID");
              this.setState({
                user: userid
              });
              console.log(this.state.user, "userID");

              if (res.status == true) {
                Platform.select({
                  ios: () => {
                    AlertIOS.alert("Login Successfully");
                  },
                  android: () => {
                    ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
                  }
                })();
                AsyncStorage.setItem("userid", this.state.user.toString());
                console.log(this.state.user, "mobile number");
                this.props.navigation.navigate("DriverRegistration");
              }
            })
            .catch(error => {
              console.log(error);
              Platform.select({
                ios: () => {
                  AlertIOS.alert("Error, please try again later.");
                },
                android: () => {
                  ToastAndroid.show(
                    "Error, please try again later.",
                    ToastAndroid.SHORT
                  );
                }
              })();
            });
        } else {
          Platform.select({
            ios: () => {
              AlertIOS.alert("Password and confirm password is not same");
            },
            android: () => {
              ToastAndroid.show(
                "Password and confirm password is not same",
                ToastAndroid.SHORT
              );
            }
          })();
        }
      } else {
        Platform.select({
          ios: () => {
            AlertIOS.alert("Password should 8 digits long");
          },
          android: () => {
            ToastAndroid.show(
              "Password should 8 digits long",
              ToastAndroid.SHORT
            );
          }
        })();
      }
    }
  }

  render() {
    return (
      <View>
        <View
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "#ffcc00",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "black",
              marginTop: 20,
              left: 50
            }}
          >
            DRIVER APPLICATION
          </Text>
          <Image
            style={{ height: 40, width: 40, marginTop: 10, right: 30 }}
            source={require("../Image/Logo.png")}
          />
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
              height: "100%",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/mobile.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Enter Mobile"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ mobile: text })}
                value={this.state.mobile}
                maxLength={10}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 1,
                marginLeft: 40,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/mail.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Enter Email (optional)"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 1,
                marginLeft: 40,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/password.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Set Password"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 1,
                marginLeft: 40,
                marginRight: 20
              }}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/password.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Confirm Password"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={text => this.setState({ Conpassword: text })}
                value={this.state.Conpassword}
              />
            </View>
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginTop: 1,
                marginLeft: 40,
                marginRight: 20
              }}
            />

            <View
              style={{
                marginTop: 40,
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
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                style={{ height: 70, width: 250, marginTop: 40 }}
                source={require("../Image/register_arts.png")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
