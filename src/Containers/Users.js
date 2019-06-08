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
  TextInput,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";
import { addUser, deleteUser } from "../Redux/actions/Actions";

var list = [
  {
    id: "1",
    name: "Harika"
  }
];

type Props = {};
class Users extends Component<Props> {
  constructor() {
    super();
    this.state = {
      name: "" //Input value
    };
  }

  onChangeName(text) {
    this.setState({
      name: text
    });
  }
  onSubmit() {
    if (this.state.name === "") {
    } else {
      var list = {
        name: this.state.name
      };
      this.props.dispatchAddUser(list);
      // this.props.dispatchAddCart(item);
      this.setState({ name: "" });
    }
  }
  onRemove(user) {
    // this.props.dispatchDeleteUser(user);
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onRemove.bind(this, item)}>
        <View style={styles.rowStyle}>
          <Text style={styles.rowText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="enter name"
          value={this.state.name}
          onChangeText={this.onChangeName.bind(this)}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onSubmit.bind(this)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.users}
          style={styles.flatListStyle}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  // alert("dsjkfhjdfhjkh" + JSON.stringify(state));
  return {
    users: state.users.users
  };
}
//
function mapDispatchToProps(dispatch) {
  return {
    dispatchAddUser: user => dispatch(addUser(user)),
    dispatchDeleteUser: user => dispatch(deleteUser(user))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
// export default Users;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "black"
  },
  buttonStyle: {
    backgroundColor: "lightgreen",
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  buttonText: {
    color: "black"
  },
  rowStyle: {
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  flatListStyle: {
    marginTop: 50
  }
});
