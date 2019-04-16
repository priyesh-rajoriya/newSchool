import React, { Component } from "react";
import Login from './Components/Login';
import DriverRegistration from './Components/DriverRegistration'
import Splash from './Components/Splash'
import DriverLogin from './Components/DriverLogin'
import MessagePage from './Components/MessagePage'
import AddRoute from './Components/AddRoute'
import OTP from './Components/OTP'
import AddRoute2 from './Components/AddRoute2'
import KidManagement from './Components/KidManagement'
import KidProfile from './Components/KidProfile'
import Spinner from './Components/Spinner'
import SideMenu from './Components/SideMenu'
import OpenList from './Components/OpenList'
import RouteSubscription from './Components/RouteSubscription'
import MonthSelector from './Components/MonthSelector'


import { StackNavigator,DrawerNavigator } from "react-navigation";
const HomeDrawer = DrawerNavigator({
    Main: {
        screen: AddRoute,
        screenProps: {
            name: 'AddRoute',
        }
    },
},
    {
        Name: 'Main',
        contentComponent: props => <SideMenu {...props} />,
        header: null,
        headerMode: 'none'
    }
);

const SVMNEW = StackNavigator({
    Login: {
        screen: Login,
    },
    DriverRegistration: {
        screen: DriverRegistration
    },
    Splash: {
        screen: Splash
    },
    DriverLogin: {
        screen: DriverLogin
    },
    MessagePage: {
        screen: MessagePage
    },
    AddRoute: {
        screen: AddRoute,
        screen:HomeDrawer
    },
    OTP: {
        screen: OTP
    },
    AddRoute2: {
        screen: AddRoute2
    },
    KidManagement: {
        screen: KidManagement
    },
    KidProfile: {
        screen: KidProfile
    },
    Spinner: {
        screen: Spinner
    },
    SideMenu: {
        screen: SideMenu
    },
    OpenList: {
        screen: OpenList
    },
    RouteSubscription: {
        screen: RouteSubscription
    },
    MonthSelector: {
        screen: MonthSelector
    },
    
},
    {
        initialRouteName: 'OTP',
        headerMode: 'none'
    });
export default SVMNEW
console.disableYellowBox = true;
