/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Registration from "./src/Containers/Registration";
import Login from "./src/Containers/Login";
import UsersList from "./src/Containers/UsersList";
import Users from "./src/Containers/Users";

const RootNavigator = createStackNavigator(
  {
    Registration: { screen: Registration },
    Login: { screen: Login },
    UsersList: { screen: UsersList },
    Users: { screen: Users }
  },
  {
    initialRouteName: "Registration"
  }
);

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator;
