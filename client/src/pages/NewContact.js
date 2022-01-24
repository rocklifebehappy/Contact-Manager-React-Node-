import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewContact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [uid, setuid] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUid = (uid) => {
    setuid(uid);
  };

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("email", email);
  formData.append("image", image);

  async function createContact(event) {
    console.log("here comes");
    event.preventDefault();
    axios
      .post(`http://localhost:3001/api/create/${uid}`, formData)
      .then((respone) => {
        console.log("ok done");
      })
      .catch((respone) => {
        console.log(respone);
      });

    // window.location.reload(true);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const user = jwt_decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate.replace("/login");
      }
      handleUid(user.uid);
    } else {
      window.location.href = "/login";
    }
  });

  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6 text-center">
          <h5 className="color color-green">Create a new Contact</h5>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form
            className="form "
            onSubmit={createContact}
            encType="multipart/from-data"
          >
            <div className="form-group">
              <label className="lead" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter the name of the contact"
                id="name"
                required="required"
                className="form-control"
                onChange={handleName}
              ></input>
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="number...">
                Phone:
              </label>
              <input
                type="number"
                placeholder="Enter the Mobile number..."
                id="number"
                required="required"
                className="form-control"
                onChange={handlePhone}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="lead">
                Address:
              </label>
              <input
                id="address"
                placeholder="Enter the address..."
                type="text"
                required="required"
                className="form-control"
                onChange={handleAddress}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="lead">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter the email of the contact..."
                className="form-control"
                required="required"
                onChange={handleEmail}
              ></input>
            </div>
            <div className="form-group">
              <label className="lead from-label">Select an image</label>
              <input
                type="file"
                placeholder="Image"
                accept="image/*"
                name="image"
                onChange={handleImage}
                className="from-control-file"
              ></input>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default NewContact;
