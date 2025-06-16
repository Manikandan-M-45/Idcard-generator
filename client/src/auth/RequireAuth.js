import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = (props) => {


  const Navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn == null) {
      checkAuth();
      console.log('in useeffect:')
    }
  });

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/check-auth");
console.log('res in checkauth: ', res)
      if (res) {
        props.setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error in checkauth: ', error)
      props.setIsLoggedIn(false);
    }
  };

  if(props.isLoggedIn == null){
    return <div>Loading...</div>
  }

  if(!props.isLoggedIn){
    return Navigate('/login');
  }
  return <div>{props.children}</div>;
};

export default RequireAuth;
