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
  FlatList,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { deleteUser, updateUser } from "../Redux/actions/Actions";
import UpdateUser from "../Components/UpdateUser";
type Props = {};
var userList = [
  {
    id: "1",
    firstName: "harika",
    middleName: "sai",
    lastName: "n",
    hno: "19-3-1-1/2",
    lane: "3rd Lane",
    city: "Vja",
    pincode: "520001",
    states: "AP",
    dob: "Aug 06 1994",
    specialized: "MCA",
    qualify: "PG"
  },
  {
    id: "2",
    firstName: "roopa",
    middleName: "rani",
    lastName: "i",
    hno: "19-3-1-1/2",
    lane: "3rd Lane",
    city: "Vsp",
    pincode: "520003",
    states: "AP",
    dob: "May 15 1994",
    specialized: "Btech",
    qualify: "Bachalors"
  }
];
class UsersList extends Component<Props> {
  static navigationOptions = {
    // headerTitleStyle: { flex: 1, textAlign: "center" },
    title: "Students List"
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      users: userList,
      modalVisible: false
    };
  }
  setModalVisible(item) {
    this.setState({ selectedItem: item }, () => {
      this.setState({ modalVisible: true });
    });
  }
  onClose() {
    // this.setState({ selectedItem: item }, () => {
    this.setState({ modalVisible: false });
    // });
  }

  onEdit(item) {
    // this.props.dispatchUpdateUser(item);
  }
  onDelete(item) {
    this.props.dispatchDeleteUser(item);
  }
  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={{ flex: 0.2, alignItems: "center" }}>
          {/*<View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "violet",
              borderRadius: 20,
              marginLeft: 10
            }}
          />*/}
          <Image
            source={require("../Images/user.png")}
            style={styles.userIconStyle}
          />
        </View>
        <View style={{ flex: 0.5, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.firstName} {item.middleName} {item.lastName}
          </Text>
          <Text>{item.dob}</Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            // backgroundColor: "pink",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity onPress={this.setModalVisible.bind(this, item)}>
            <Image
              source={require("../Images/edit.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDelete.bind(this, item)}>
            <Image
              source={require("../Images/delete.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  _keyExtractor = (item, index) => item.id;
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.users}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.buttonStyles}
        >
          <Text style={styles.buttonTextStyle}>Add Student</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <UpdateUser
            item={this.state.selectedItem}
            onClose={this.onClose.bind(this)}
          />
        </Modal>
      </View>
    );
  }
}
function mapStateToProps(state) {
  // alert("dsjkfhjdfhjkh" + JSON.stringify(state.users.users));
  return {
    users: state.users.users
  };
}
//
function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteUser: user => dispatch(deleteUser(user))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAD9D9"
  },
  cardContainer: {
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 5,
    height: 70,
    // borderBottomWidth: 1,
    // backgroundColor: "pink",
    marginHorizontal: 15,

    marginTop: 10,
    backgroundColor: "white",
    // alignItems: "center",
    // height: 300,
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row"
    // width: 340
  },
  iconStyle: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  userIconStyle: {
    height: 40,
    width: 40
  },
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
    backgroundColor: "black",
    alignSelf: "center"
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20
  }
});
