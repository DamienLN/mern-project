import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    // Apres le formulaire disparait 
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      {/* On récupère le nom du user dans le store */}
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {/* On récupère la photo de profil dans le store */}
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          {/* erreur lier à l'image format ou taille */}
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                {/* au clic sur le bouton ou le texte met a jour la bio */}
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                {/* Permet de modifier la bio tout en gardant le texte de l'ancienne que l'on souhaite changer  */}
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          {/* Date depuis la création du comtpe */}
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          {/* onClick on passe en true eton suit le following popup */}
          <h5 onClick={() => setFollowingPopup(true)}>
            {/* On fait une permier demande, et si il n'y a pas d'abonnement ce sera 0 */}
            Abonnements : {userData.following ? userData.following.length : ""}
          </h5>
          {/* onClick on passe en true eton suit le followers popup */}
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>

      {/* Abonnements  */}
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            {/* Crée la croix pour faire disparaitre la popup */}
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {/* Liste des user auxquelles on est abonné */}
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  } 
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Abonnés */}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {/* Liste des user qui sont abonné a notre profil */}
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
