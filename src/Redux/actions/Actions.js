export function addUser(user) {
  return {
    type: "ADD_USER",
    user
  };
}

export function deleteUser(user) {
  return {
    type: "DELETE_USER",
    user
  };
}
export function updateUser(user) {
  return {
    type: "UPDATE_USER",
    user
  };
}
