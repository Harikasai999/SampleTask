const userState = {
  users: []
};
const compareUser = (user, action) => {
  return user.id === action.user.id;
};
export default function contactsReducer(state = userState, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        users: [...state.users, action.user]
      };
    case "DELETE_USER":
      return {
        users: state.users.filter(p => p.id !== action.user.id)
      };
    case "UPDATE_USER":
      let updatedUsers = state.users;

      const isExisted = state.users.some(user => compareUser(user, action));
      if (isExisted) {
        updatedUsers.map((res, key) => {
          if (res.id === action.user.id) {
            // res = action.user;
            updatedUsers = state.users.filter(p => p.id !== action.user.id);
          }
          updatedUsers = [...state.users, action.user];
          console.log(
            "dgfgdfgDfksdssssssssssdsdjkg" + JSON.stringify(updatedUsers)
          );
        });
      }
      return Object.assign({}, state, {
        users: state.users
      });

    default:
      return state;
  }
}
