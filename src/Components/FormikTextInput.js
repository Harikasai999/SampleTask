/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

type Props = {};

export default class FormikTextInput extends Component<Props> {
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }
  focus() {
    this.textInput.focus();
  }
  render() {
    const {
      placeholder,
      value,
      onChangeText,
      onBlur,
      errors,
      touched,
      onSubmitEditing,
      secureTextEntry,
      pointerEvents,
      style,
      multiline,
      returnKeyType,
      keyboardType,
      placeholderTextColor
    } = this.props;
    // alert(style);
    return (
      <View>
        <TextInput
          style={[
            style,
            {
              borderColor: errors && touched ? "red" : "black"
            }
          ]}
          ref={input => (this.textInput = input)}
          onChangeText={text => onChangeText(text)}
          onBlur={text => onBlur(text)}
          value={value}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          returnKeyType={returnKeyType}
          placeholderTextColor={errors && touched ? "red" : "grey"}
          keyboardType={keyboardType}
        />

        {errors && touched && <Text style={styles.textStyle}>{errors}</Text>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInputContainer: {
    height: "auto",
    width: 300,
    borderBottomWidth: 1,
    marginTop: 10
    // borderRadius: 5,
    // paddingLeft: 10
  },
  textStyle: { color: "red", marginTop: 5, marginLeft: 5 }
});
