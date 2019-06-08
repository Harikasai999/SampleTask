/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import AppNavigator from "./AppNavigator";
const store = configureStore();
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="grey" barStyle="light-content" />
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
