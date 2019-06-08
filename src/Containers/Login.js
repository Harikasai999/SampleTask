/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DateTimePicker from "react-native-modal-datetime-picker";
import FormikTextInput from "../Components/FormikTextInput";
const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required field")
    .email("Email must be a valid email"),
  password: Yup.string()
    .required("Password is required field")
    .min(6, "Too short")
    .max(15, "Too long")
});
type Props = {};
export default class Registration extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this.focusNextField = this.focusNextField.bind(this);

    this.inputs = {};
  }
  static navigationOptions = {
    header: null
  };
  focusNextField(id) {
    // this.lastName._root.focus();
    this.inputs[id].focus();
  }
  onSubmit(values) {
    console.log("adkjfhjdfghdf", values);
    const { navigation } = this.props;
    navigation.push("Registration");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome back!</Text>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={RegistrationSchema}
          onSubmit={values => this.onSubmit(values)}
        >
          {props => {
            console.log("nbcnsdbfhdsfgf", props);
            return (
              <View style={styles.cardContainer}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.headerText}>LOGIN</Text>
                </View>
                <FormikTextInput
                  onRef={ref => {
                    this.inputs["email"] = ref;
                  }}
                  secureTextEntry={false}
                  style={styles.textInputContainer}
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                  touched={props.touched.email}
                  errors={props.errors.email}
                  placeholder="Email"
                  multiline={false}
                  returnKeyType={"next"}
                  placeholderTextColor={"grey"}
                  keyboardType={"email-address"}
                  onSubmitEditing={() => this.focusNextField("password")}
                />
                <FormikTextInput
                  onRef={ref => {
                    this.inputs["password"] = ref;
                  }}
                  secureTextEntry={true}
                  style={styles.textInputContainer}
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
                  touched={props.touched.password}
                  errors={props.errors.password}
                  placeholder="Password"
                  multiline={false}
                  returnKeyType={"next"}
                  placeholderTextColor={"grey"}
                  keyboardType={"default"}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TouchableOpacity
                  style={styles.buttonStyles}
                  onPress={() => props.handleSubmit()}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: "white"
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DAD9D9" //"#F3F3F3"
  },
  cardContainer: {
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 5,
    // borderBottomWidth: 0,
    // backgroundColor: "pink",
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    // height: 300,
    justifyContent: "center",
    borderRadius: 10,
    width: 340
  },
  textInputContainer: {
    height: "auto",
    width: 300,
    borderBottomWidth: 1,
    marginTop: 10
    // borderRadius: 5,
    // paddingLeft: 10
  },
  buttonStyles: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    backgroundColor: "black",
    borderRadius: 5,
    width: 300,
    marginBottom: 20
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "black"
  }
});
