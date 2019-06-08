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
  TextInput,
  Image,
  Keyboard,
  Alert
} from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { connect } from "react-redux";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import FormikTextInput from "../Components/FormikTextInput";
import { updateUser } from "../Redux/actions/Actions";

let statesArray = [
  {
    value: "Andhra Pradesh"
  },
  {
    value: "Arunachal Pradesh"
  },
  {
    value: "Assam"
  },
  {
    value: "Bihar"
  },
  {
    value: "Chhattisgarh"
  },
  {
    value: "Goa"
  },
  {
    value: "Gujarat"
  },
  {
    value: "Haryana"
  },
  {
    value: "Himachal Pradesh"
  },
  {
    value: "Jammu and Kashmir"
  },
  {
    value: "Jharkhand"
  },
  {
    value: "Karnataka"
  },
  {
    value: "Kerala"
  },
  {
    value: "Madhya Pradesh"
  },
  {
    value: "Maharashtra"
  },
  {
    value: "Manipur"
  },
  {
    value: "Meghalaya"
  },
  {
    value: "Mizoram"
  },
  {
    value: "Nagaland"
  },
  {
    value: "Odisha"
  },
  {
    value: "Punjab"
  },
  {
    value: "Rajasthan"
  },
  {
    value: "Sikkim"
  },
  {
    value: "Tamil Nadu"
  },
  {
    value: "Telangana"
  },
  {
    value: "Tripura"
  },
  {
    value: "Uttar Pradesh"
  },
  {
    value: "Uttarakhand"
  },
  {
    value: "West Bengal"
  }
];
let qualification = [
  {
    value: "PG"
  },
  {
    value: "Bachelor"
  },
  {
    value: "+2"
  }
];
const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required field"),
  middleName: Yup.string().required("Middle Name is required field"),
  lastName: Yup.string().required("Last Name is required field"),
  hno: Yup.string().required("House number is required field"),
  lane: Yup.string().required("Lane is required field"),
  city: Yup.string().required("City is required field"),
  pincode: Yup.string()
    .required("Pin code is required field")
    .min(6, "Pin code contains 6 digits")
    .max(6, "Pin code contains 6 digits only"),
  specialized: Yup.string().required("Specialization is required field")
});
type Props = {};
class UpdateUser extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dob: this.props.item.dob,
      age: this.props.item.age,
      states: this.props.item.states,
      qualify: this.props.item.qualify,
      isDateTimePickerVisible: false,
      errorSpecialized: false
    };
    this.focusNextField = this.focusNextField.bind(this);
    this.onSubmitSpecialized = this.onSubmitSpecialized.bind(this);

    this.inputs = {};
  }

  componentWillMount() {
    console.log("sajdhkjhsdfjkhf", JSON.stringify(this.props.item));
  }
  focusNextField(id) {
    // this.lastName._root.focus();
    this.inputs[id].focus();
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    var getAge = moment().diff(moment(date, "YYYYMMDD"), "years");
    this.setState({
      dob: moment(date).format("MMM Do YYYY"),
      age: getAge + " years"
    });

    this.hideDateTimePicker();
  };
  onSubmitSpecialized(value) {
    // alert(value);
    if (value === "" || value.length === 0) {
      this.setState({
        errorSpecialized: true
      });
    } else {
      this.setState({
        errorSpecialized: false
      });
    }
  }
  selectedState(value) {
    console.log("jkdhfjkhsfjkhsdfjk", value);
    this.setState({
      states: value
    });
  }
  selectedQualify(value) {
    console.log("jkdhfjkhsfjkhsdfjk", value);
    this.setState({
      qualify: value
    });
  }
  onSubmit(values) {
    // alert(userId);
    const { navigation } = this.props;
    if (this.state.dob === "Date of Birth") {
      Alert.alert("Please select Date of Birth");
    } else if (this.state.states === "" || this.state.states.length === 0) {
      Alert.alert("Please select state");
    } else if (this.state.qualify === "" || this.state.qualify.length === 0) {
      Alert.alert("Please select the Qualification");
    } else {
      var userData = {
        id: this.props.item.id,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        hno: values.hno,
        lane: values.lane,
        city: values.city,
        pincode: values.pincode,
        states: this.state.states,
        dob: this.state.dob,
        age: this.state.age,
        specialized: values.specialized,
        qualify: this.state.qualify
      };
      // alert(JSON.stringify(userData));
      this.props.dispatchUpdateUser(userData);

      // navigation.push("UsersList");
    }

    //   states: this.state.states,
    // dob: this.state.dob,
    // qualified: this.state.qualify
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              height: 44,
              width: 300,
              justifyContent: "center",
              alignItems: "flex-end",
              alignSelf: "center"
            }}
          >
            <TouchableOpacity onPress={this.props.onClose}>
              <Image
                source={require("../Images/close.png")}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              firstName: this.props.item.firstName,
              middleName: this.props.item.middleName,
              lastName: this.props.item.lastName,
              hno: this.props.item.hno,
              lane: this.props.item.lane,
              city: this.props.item.city,
              pincode: this.props.item.pincode,

              specialized: this.props.item.specialized
            }}
            validationSchema={UpdateUserSchema}
            onSubmit={values => this.onSubmit(values)}
          >
            {props => {
              console.log("nbcnsdbfhdsfgf", props);
              return (
                <View style={styles.formContainer}>
                  <View style={[styles.headerContainer, { marginTop: 0 }]}>
                    <Text style={styles.headerText}>Name</Text>
                  </View>
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["firstName"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("firstName")}
                    onBlur={props.handleBlur("firstName")}
                    value={props.values.firstName}
                    touched={props.touched.firstName}
                    errors={props.errors.firstName}
                    placeholder="First Name"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("middleName")}
                  />
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["middleName"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("middleName")}
                    onBlur={props.handleBlur("middleName")}
                    value={props.values.middleName}
                    touched={props.touched.middleName}
                    errors={props.errors.middleName}
                    placeholder="Middle Name"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("lastName")}
                  />
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["lastName"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("lastName")}
                    onBlur={props.handleBlur("lastName")}
                    value={props.values.lastName}
                    touched={props.touched.lastName}
                    errors={props.errors.lastName}
                    placeholder="Last Name"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("hno")}
                  />
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Address</Text>
                  </View>
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["hno"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("hno")}
                    onBlur={props.handleBlur("hno")}
                    value={props.values.hno}
                    touched={props.touched.hno}
                    errors={props.errors.hno}
                    placeholder="House No"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("lane")}
                  />
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["lane"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("lane")}
                    onBlur={props.handleBlur("lane")}
                    value={props.values.lane}
                    touched={props.touched.lane}
                    errors={props.errors.lane}
                    placeholder="Lane"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("city")}
                  />
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["city"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("city")}
                    onBlur={props.handleBlur("city")}
                    value={props.values.city}
                    touched={props.touched.city}
                    errors={props.errors.city}
                    placeholder="City"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() => this.focusNextField("pincode")}
                  />
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["pincode"] = ref;
                    }}
                    style={styles.textInputContainer}
                    onChangeText={props.handleChange("pincode")}
                    onBlur={props.handleBlur("pincode")}
                    value={props.values.pincode}
                    touched={props.touched.pincode}
                    errors={props.errors.pincode}
                    placeholder="Pin Code"
                    multiline={false}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"number-pad"}
                    secureTextEntry={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  <Dropdown
                    label="Select State"
                    data={statesArray}
                    containerStyle={styles.dropdownContainer}
                    pickerStyle={styles.statesPickerContainer}
                    inputContainerStyle={styles.dropdownInputContainer}
                    value={this.state.states}
                    onChangeText={value => this.selectedState(value)}
                  />

                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Date of Birth</Text>
                  </View>
                  <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.dateOfBirthContainer}>
                      <Text
                        style={{
                          color:
                            this.state.dob === "Date of Birth"
                              ? "grey"
                              : "black",
                          marginLeft: 5
                        }}
                      >
                        {this.state.dob}
                      </Text>
                      {this.state.age === "" || this.state.age.length === 0 ? (
                        <Image
                          source={require("../Images/down.png")}
                          style={styles.downArrowStyle}
                        />
                      ) : (
                        <Text style={styles.ageText}>{this.state.age}</Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    maximumDate={new Date()}
                  />
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Specialization</Text>
                  </View>
                  <FormikTextInput
                    onRef={ref => {
                      this.inputs["specialized"] = ref;
                    }}
                    style={styles.specializedTextInput}
                    onChangeText={props.handleChange("specialized")}
                    onBlur={props.handleBlur("specialized")}
                    value={props.values.specialized}
                    touched={props.touched.specialized}
                    errors={props.errors.specialized}
                    placeholder="Specialization"
                    multiline={true}
                    returnKeyType={"next"}
                    placeholderTextColor={"grey"}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    onSubmitEditing={() =>
                      this.onSubmitSpecialized(props.values.specialized)
                    }
                  />
                  {/*this.state.errorSpecialized && (
                    <Text style={styles.textStyle}>
                      Specialization is a required field
                    </Text>
                  )*/}
                  <Dropdown
                    label="Select Qualification"
                    data={qualification}
                    containerStyle={styles.dropdownContainer}
                    pickerStyle={styles.qualifyPickerContainer}
                    inputContainerStyle={styles.dropdownInputContainer}
                    value={this.state.qualify}
                    onChangeText={value => this.selectedQualify(value)}
                  />

                  <TouchableOpacity
                    onPress={props.handleSubmit.bind(this)}
                    style={styles.buttonStyles}
                  >
                    <Text style={styles.buttonTextStyle}>Submit</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "violet"
  },
  textInputContainer: {
    height: "auto",
    width: 300,
    borderBottomWidth: 1,
    marginTop: 10
    // borderRadius: 5,
    // paddingLeft: 10
  },
  dateOfBirthContainer: {
    height: 45,
    width: 300,
    borderBottomWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "grey",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  specializedTextInput: {
    height: 80,
    width: 300,
    borderBottomWidth: 1
    // marginTop: 10
  },
  textStyle: { color: "red", marginTop: 5, marginLeft: 5 },
  buttonStyles: {
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "black"
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },
  formContainer: { flex: 1, alignItems: "center", marginTop: 20 },
  headerContainer: {
    height: 45,
    backgroundColor: "#F3F3F3",
    width: 300,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 2
  },
  headerText: { fontSize: 16, marginLeft: 5, fontWeight: "600" },
  downArrowStyle: {
    height: 10,
    width: 10,
    tintColor: "grey",
    marginRight: 5
  },
  ageText: { color: "black", marginRight: 5 },
  dropdownContainer: {
    height: "auto",
    width: 300
  },
  qualifyPickerContainer: {
    height: 150,
    backgroundColor: "#F3F3F3"
  },
  dropdownInputContainer: {
    borderColor: "grey",
    borderBottomWidth: 1
  },
  statesPickerContainer: {
    height: 300,
    backgroundColor: "#F3F3F3"
  },
  iconStyle: {
    height: 25,
    width: 25
    // marginRight: 10
  }
});
function mapStateToProps(state) {
  // alert("dsjkfhjdfhjkh" + JSON.stringify(state));
  return {
    users: state.users.users
  };
}
//
function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateUser: user => dispatch(updateUser(user))
    // dispatchDeleteUser: user => dispatch(deleteUser(user))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser);
