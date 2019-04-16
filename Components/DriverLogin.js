import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    Alert,
    Platform,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import AllApi from '../Apis/AllApi'
import { Base64 } from 'js-base64';
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            email: '',
            password: '',
            ID:''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Alert.alert(
          'School-Van',
          'Are you sure you want to exit from App?',
          [
            { text: 'cancel', onPress: () => console.log('Cancel Pressed') },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        )
        return true;
      }
    validate() {
        if (this.state.mobile == "") {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter mobile'); },
                android: () => { ToastAndroid.show('Please enter mobile', ToastAndroid.SHORT); }
            })();
            return false;
        }
        var val = this.state.mobile
        if (/^[0]?[789]\d{10}$/.test(val)) {
            // value is ok, use it
            Platform.select({
                ios: () => { AlertIOS.alert('mobile is Not Correct'); },
                android: () => { ToastAndroid.show('mobile is Not Correct', ToastAndroid.SHORT); }
            })();
            return false;
        }
        else {
            this.Login();
        }
    }
    async Login() {
        const config = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "mobile": this.state.mobile,
                "password": Base64.encode(this.state.password),
                "userType": "driver"
            })
        }

        await fetch(AllApi.login, config)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status == true) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Login Successfully'); },
                        android: () => { ToastAndroid.show('Login Successfully', ToastAndroid.SHORT); }
                    })();

                  
                console.log(res);
                console.log(res.responseObject.responseObject.driverId,'driver id');
                
                var driverid = res.responseObject.responseObject.driverId;
                console.log(driverid, '9999999');
                this.setState({
                    ID: driverid
                })
                console.log(this.state.ID, '999');
                AsyncStorage.setItem('ID', this.state.ID.toString());
                console.log(this.state.ID,'ID');
                Platform.select({
                    ios: () => { AlertIOS.alert('Login Successfully'); },
                    android: () => { ToastAndroid.show('Login Successfully', ToastAndroid.SHORT); }
                })();
                if (res.responseObject.responseObject.user.userStatus == 1) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Not reviewed'); },
                        android: () => { ToastAndroid.show('Not reviewed', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("MessagePage")

                }
                if (res.responseObject.responseObject.user.userStatus == 5) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Refer back'); },
                        android: () => { ToastAndroid.show('Refer back', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("DriverRegistration")
                }
                if (res.responseObject.responseObject.user.userStatus == 6) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Reject'); },
                        android: () => { ToastAndroid.show('Reject', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("Login")
                }
                if (res.responseObject.responseObject.user.userStatus == 2) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Approved but no route has been created'); },
                        android: () => { ToastAndroid.show('Approved but no route has been created', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("AddRoute")
                }
                if (res.responseObject.responseObject.user.userStatus == 3) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Approved but no child has been created'); },
                        android: () => { ToastAndroid.show('Approved but no child has been created', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("AddRoute2")
                }
                if (res.responseObject.userStatus == 4) {
                    Platform.select({
                        ios: () => { AlertIOS.alert('Approved & Child created'); },
                        android: () => { ToastAndroid.show('Approved & Child created', ToastAndroid.SHORT); }
                    })();
                    this.props.navigation.navigate("KidManagement")
                }
            } else {

                Alert.alert(
                    '',
                    "userName/password not matched..!!",
                    [
                        { text: 'ok', onPress: () => console.log('ok pressed') },
                    ])
            }
                
            })
            .catch((error) => {
                console.log(error)
                Platform.select({
                    ios: () => {
                        AlertIOS.alert('Error, please try again later.');
                    },
                    android: () => {
                        ToastAndroid.show('Error, please try again later.', ToastAndroid);
                    }
                })();
                console.log(error);
            })
    }
    render() {
        return (
            <View>
                <View style={{
                    height: 70, width: '100%', backgroundColor: '#ffcc00', justifyContent: 'space-between', flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: 'black',
                        marginTop: 20,
                        left: 50
                    }}>
                        DRIVER APPLICATION
           </Text>
                    <Image style={{ height: 40, width: 40, marginTop: 10, right: 30 }}
                        source={require('../Image/Logo.png')} />
                </View>

                <View style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'white'
                }}>

                    <View style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white'

                    }}>

                        <View style={{
                            marginTop: 30,
                            flexDirection: 'row',
                            marginLeft: 40

                        }}>
                            <Image style={{ height: 30, width: 30, marginTop: 5 }}
                                source={require('../Image/mobile.png')} />

                            <TextInput
                                style={{ fontSize: 18, marginLeft: 30 }}
                                placeholder='Mobile'
                                placeholderTextColor="grey"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ mobile: text })}
                                value={this.state.mobile}
                                maxLength={10}
                                keyboardType='number-pad'
                            />

                        </View>

                        <View
                            style={{
                                borderBottomColor: 'lightgrey',
                                borderBottomWidth: 1,
                                marginTop: 1,
                                marginLeft: 40,
                                marginRight: 20
                            }}
                        />
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            marginLeft: 40

                        }}>
                            <Image style={{ height: 30, width: 30, marginTop: 5 }}
                                source={require('../Image/password.png')} />

                            <TextInput
                                style={{ fontSize: 18, marginLeft: 30 }}
                                placeholder='Password'
                                placeholderTextColor="grey"
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                            />
                        </View>

                        <View
                            style={{
                                borderBottomColor: 'lightgrey',
                                borderBottomWidth: 1,
                                marginTop: 1,
                                marginLeft: 40,
                                marginRight: 20
                            }}
                        />
                        <View style={{
                            marginTop: 18,
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity>
                                <Text style={{
                                    color: '#009aff',
                                    fontSize: 15,
                                    right: 40
                                }}>
                                    Forgot Password?
                        </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 40,
                            borderRadius: 30,
                            marginLeft: 30,
                            marginRight: 30,
                            backgroundColor: '#ffcc00',
                            height: 40,
                            alignItems: 'center',
                        }}>

                            <TouchableOpacity onPress={() => this.Login()}>
                                <Text style={{
                                    fontSize: 20,
                                    color: 'black',
                                    marginTop: 7
                                }}>
                                    LOGIN
                        </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 25,
                            borderRadius: 30,
                            marginLeft: 30,
                            marginRight: 30,
                            backgroundColor: '#424242',
                            height: 40,
                            alignItems: 'center',
                        }}>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    marginTop: 7
                                }}>
                                    SIGNUP
                        </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image style={{ height: 70, width: 250, marginTop: 40 }}
                                source={require('../Image/register_arts.png')} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
