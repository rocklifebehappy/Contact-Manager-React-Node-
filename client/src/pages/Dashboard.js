import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MyContact from "../components/MyContact";

function Dashboard() {
  const [contactList, setContactList] = useState([]);
  const getContacts = (uid) => {
    Axios.get(`http://localhost:3001/api/contacts/${uid}`)
      .then((response) => {
        console.log(response.data);
        setContactList(response.data);
        console.log("barrier");
      })
      .catch(() => {
        console.log("error");
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("This also should be logged");
      console.log(token);
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        console.log("not valid user");
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        console.log("Login with jwt is okay");
        console.log(user.uid);
        getContacts(user.uid);
      }
    } else {
      console.log("not authenticated!");
      window.location.href = "/login";
    }
  }, []);
  return (
    <React.Fragment>
      <div className="row justify-content-around mb-2 p-1">
        <div className="col-sm-6 text-center">
          <h6>Your Contact Manager!</h6>
        </div>
        <div className="col-sm-2 text-center">
          <button
            className="btn btn-outline-success"
            onClick={() => {
              window.location.href = "/new";
            }}
          >
            Add Contact
          </button>
        </div>
        <div className="col-sm-2 text-center">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      {contactList.map((item) => {
        return <MyContact key={item._id} contact={item}></MyContact>;
      })}
    </React.Fragment>
  );
}

export default Dashboard;
