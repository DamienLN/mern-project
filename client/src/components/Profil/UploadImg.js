import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  //  Va nous permettre d'envoyer l'img
  const dispatch = useDispatch();
  // Donnée de l'utilisateur
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    //  FormData permet de mettre dans un package notre img + des informations
    const data = new FormData();
    // Le pseudo servira pour le nom du fichier
    data.append("name", userData.pseudo);
    // l'id servira à identifier l'utilisateur
    data.append("userId", userData._id);
    // Dans notre const plus haut, il contient l'img
    data.append("file", file);
    // Puis on déclenche l'action uploadPicture
    dispatch(uploadPicture(data, userData._id));
  };

  return (
    // Quand le formulaire est soumis, handlePitcher se lance
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        // on stocke la valeur de l'img dans une variable
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
