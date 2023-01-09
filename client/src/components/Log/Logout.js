import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    // On retire le cookie en back
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
    // Puis on le retire en front
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
