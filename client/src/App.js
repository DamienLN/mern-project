import React, { useEffect, useState } from "react";
// Juste avec Routes il ira chercher dans l'index.js
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  // useEffect va contrôller le token de l'utilisateur
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        // Pas de  data à prendre car c'est un get, on veut juste les informations ici c'est l'id de lu'tilisateur
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        // id renvoyer sur une 200
        .then((res) => {
          setUid(res.data);
        })
        // Sinon erreur
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
    //  [] permettent que la page ne tourne pas à l'infini
  }, [uid, dispatch]);

  return (
    // Permet d'avoir tout le temps l'id
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App;
