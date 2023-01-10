import axios from "axios";

export const GET_USERS = "GET_USERS";
// Va chercher tous les utilisateurs
export const getUsers = () => {
  // Store
  return (dispatch) => {
    // Back
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
