import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  // Nombre de post qu'il va falloir lire
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  //  Avant 1 > c'est la ou on se trouve dans le scroll, et apres c'est la taille complete du scroll
  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      // Une fois qu'on touche le bas on charge d'autre post
      setLoadPost(true);
      
    }
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
    //   false permet de ne pas tourner a l'infini
      setLoadPost(false);
      // On ajoute 5 post de plus pour le prochain count
      setCount(count + 5);
    }

    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            // la clé unique est celle du post
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
