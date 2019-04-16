import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  ToastAndroid,
  AlertIOS
} from "react-native";
import ImagePicker from "react-native-image-picker";
import AllApi from "../Apis/AllApi";
export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      driverName: "",
      vehicleName: "",
      ownerName: "",
      ownerContact: "",
      driverAddress: "",
      rc: "",
      HouseNu: "",
      street: "",
      localArea: "",
      city: "",
      states: ""
    };
  }
  async componentWillMount() {
    console.log("home");
    try {
      var userid = await AsyncStorage.getItem("userid");
      this.setState({
        userid: userid
      });
      console.log(this.state.userid, "userid");
    } catch (error) {
      console.log(error);
    }
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
        console.log("hsdjyafsduya");
        this.Registration();
      }
    });
  }
  // selectPhotoTapped1() {
  //     const options = {
  //         quality: 1.0,
  //         maxWidth: 500,
  //         maxHeight: 500,
  //         storageOptions: {
  //             skipBackup: true
  //         }
  //     };
  //     ImagePicker.showImagePicker(options, (response) => {
  //         console.log('Response = ', response);

  //         if (response.didCancel) {
  //             console.log('User cancelled photo picker');
  //         }
  //         else if (response.error) {
  //             console.log('ImagePicker Error: ', response.error);
  //         }
  //         else if (response.customButton) {
  //             console.log('User tapped custom button: ', response.customButton);
  //         }
  //         else {
  //             let source = { uri: response.uri };
  //             this.setState({
  //                 avatarSource1: source
  //             });
  //             console.log("Image2")
  //             this.Registration()
  //         }
  //     });
  // }
  // selectPhotoTapped2() {
  //     const options = {
  //         quality: 1.0,
  //         maxWidth: 500,
  //         maxHeight: 500,
  //         storageOptions: {
  //             skipBackup: true
  //         }
  //     };

  //     ImagePicker.showImagePicker(options, (response) => {
  //         console.log('Response = ', response);

  //         if (response.didCancel) {
  //             console.log('User cancelled photo picker');
  //         }
  //         else if (response.error) {
  //             console.log('ImagePicker Error: ', response.error);
  //         }
  //         else if (response.customButton) {
  //             console.log('User tapped custom button: ', response.customButton);
  //         }
  //         else {
  //             let source2 = { uri: response.uri };

  //             // You can also display the image using data:
  //             //let source = { uri: 'data:image/jpeg;base64,' + response.data };
  //             this.setState({
  //                 avatarSource2: source2,
  //                 data: response.data
  //             });
  //         }
  //     });
  // }

  async Registration() {
    if (this.state.driverName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter driver name");
        },
        android: () => {
          ToastAndroid.show("Please enter driver name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.vehicleName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter vehicle name");
        },
        android: () => {
          ToastAndroid.show("Please enter vehicle name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.ownerName == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter owner name");
        },
        android: () => {
          ToastAndroid.show("Please enter owner name", ToastAndroid.SHORT);
        }
      })();
      return false;
    }
    if (this.state.ownerNumber == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter owner contact number");
        },
        android: () => {
          ToastAndroid.show(
            "Please enter owner contact number",
            ToastAndroid.SHORT
          );
        }
      })();
      return false;
    }
    if (this.state.HouseNu == "") {
      Platform.select({
        ios: () => {
          AlertIOS.alert("Please enter address");
        },
        android: () => {
          ToastAndroid.show("Please enter address", ToastAndroid.SHORT);
        }
      })();
      return false;
    } else this.Login();
  }

  // Image() {
  //     this.setState({
  //         isLoading: true
  //     })
  //     const files = { uri: this.state.avatarSource.uri, name: 'file.jpg', type: 'image/jpeg' };
  //     const formData = new FormData();
  //     formData.append('files', files);
  //     formData.append('userId', 1)

  //     const config1 = {
  //         headers: {
  //             'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
  //         }
  //     };

  //     axios.put(AllApi.userDetail, formData, config1).then((resp) => {
  //         console.log(resp);
  //         if (resp.status == true) {
  //             this.props.navigation.navigate("MessagePage")
  //         }

  //         this.setState({
  //             isLoading: false
  //         })
  //     }).catch(err => {
  //         alert("Please Try Again")
  //         console.log(err);
  //     });

  async Login() {
    // var data = new FormData();
    // data.append('user', this.state.userid);
    // data.append('driverName', this.state.driverName);
    // data.append('vehicleName', this.state.vehicleName);
    // data.append('ownerName', this.state.ownerName);
    // data.append('ownerNumber', this.state.ownerNumber);
    // data.append('driverAddress', this.state.driverAddress);

    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        driverName: this.state.driverName,
        vehicleName: this.state.vehicleName,
        ownerName: this.state.ownerName,
        ownerContact: this.state.ownerContact,
        HouseNu: this.state.HouseNu,
        street: this.state.street,
        localArea: this.state.localArea,
        city: this.state.city,
        states: this.state.states,
        rc: this.state.rc,
        dl: this.state.dl,
        driverPhoto: "driverPhoto",
        user: {
          userId: this.state.userid
        }
      })
    };

    await fetch(AllApi.userDetail, config)
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.props.navigation.navigate("MessagePage");
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
  let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
      resolve('Success')
    } else {
      reject('Failed')
    }
  })

  p.then((message) => {
    console.log('This is in the Then' +message);
  }).catch((message) => {
    console.log('This is in the Catch' +message);
  })
render() {
  return (
    <ScrollView>
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
            DRIVER DETAILS
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
                marginTop: 20,
                flexDirection: "row",
                marginLeft: 40,
                justifyContent: "space-between"
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Driver.png")}
              />

              <TextInput
                style={{ fontSize: 18, right: 55 }}
                placeholder="Driver Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ driverName: text })}
                value={this.state.driverName}
              />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Image
                  style={{ height: 30, width: 30, marginTop: 5, right: 30 }}
                  source={
                    this.state.avatarSource != null
                      ? this.state.avatarSource
                      : require("../Image/upload.png")
                  }
                />
              </TouchableOpacity>
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Vehicle.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Vehicle Model"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ vehicleName: text })}
                value={this.state.vehicleName}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Owner.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Owner Name"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ ownerName: text })}
                value={this.state.ownerName}
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
                marginTop: 15,
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
                placeholder="Owner Contact Number"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ ownerContact: text })}
                value={this.state.ownerContact}
                keyboardType="number-pad"
                maxLength={10}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="House No."
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ HouseNu: text })}
                value={this.state.HouseNu}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Address Line 1"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ street: text })}
                value={this.state.street}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="Address Line 2"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ localArea: text })}
                value={this.state.localArea}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="City"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="State"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ states: text })}
                value={this.state.states}
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
                marginTop: 15,
                flexDirection: "row",
                marginLeft: 40
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/Address.png")}
              />

              <TextInput
                style={{ fontSize: 18, marginLeft: 30 }}
                placeholder="PIN Code"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                maxLength={6}
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
                marginTop: 20,
                flexDirection: "row",
                marginLeft: 40,
                justifyContent: "space-between"
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/RC.png")}
              />

              <TextInput
                style={{ fontSize: 18, right: 35 }}
                placeholder="Registration Card"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ rc: text })}
                value={this.state.rc}
              />
              <TouchableOpacity>
                <Image
                  style={{ height: 30, width: 30, marginTop: 5, right: 30 }}
                  source={
                    this.state.avatarSource1 != null
                      ? this.state.avatarSource1
                      : require("../Image/upload.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                marginLeft: 40,
                justifyContent: "space-between"
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginTop: 5 }}
                source={require("../Image/DL.png")}
              />

              <TextInput
                style={{ fontSize: 18, right: 35 }}
                placeholder="DL"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ dl: text })}
                value={this.state.dl}
              />
              <TouchableOpacity>
                <Image
                  style={{ height: 30, width: 30, marginTop: 5, right: 30 }}
                  source={
                    this.state.avatarSource1 != null
                      ? this.state.avatarSource1
                      : require("../Image/upload.png")
                  }
                />
              </TouchableOpacity>
            </View>
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
              <TouchableOpacity onPress={() => this.Registration()}>
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
      </View>
    </ScrollView>
  );
}
}
