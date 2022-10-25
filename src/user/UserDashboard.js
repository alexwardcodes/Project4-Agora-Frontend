import React, { useEffect, useState } from "react";
import Axios from "axios";
import Profile from "./Profile";

import "./User.css";
import Favourite from "./Favourite";
import Reviews from "./Reviews";
import Transaction from "./Transaction";

export default function UserDashboard(props) {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  // useEffect() - ComponentDidMount
  // React Hooks - Allows to hook the functionality into React

  console.log(props)
  useEffect(() => {
    // Axios function
    loadDashboard(props.user.user.id);
  }, []);

  

    console.log()

  const loadDashboard = (id) => {
    Axios.get(`/user/dashboard?userId=${id}`)
      .then((response) => {
        let user = response.data.user
        console.log("hi");
        console.log(response.data.user);
        console.log(user)
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
        console.log("error retrieving user line 40");
      });
  };
  

  return (
    <div className="container">
        <Profile {...currentUser}></Profile>

        <div className="row mt-5 mb-5 d-flex justify-content-between">
        <Favourite {...currentUser}></Favourite>
        <Reviews {...currentUser}></Reviews>
        </div>
      
        <Transaction {...currentUser}></Transaction>       
      </div>
  
  );}