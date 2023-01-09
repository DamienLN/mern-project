import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

// Props permet un affichage conditionnel sois singup / sois signin
const Log = ( props ) => {

  // Affiche la page pour s'inscrire
  const [signUpModal, setSignUpModal] = useState(props.signup);
  // Affiche la page pour se connecter
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  // Renvoie le rendu visuel du code ci-dessus
  // active btn pour montrer la couleur du bouton de la page active
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>

          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
