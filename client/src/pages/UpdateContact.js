import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateContact = () => {
  const location = useLocation();
  const id = location.pathname.slice(8);
  const [contact, setContact] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handlename = (event) => {
    setName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("email", email);
  formData.append("image", image);

  const updateContact = (event) => {
    event.preventDefault();
    Axios.post(`http://localhost:3001/api/update/${id}`, {
      name: name,
      phone: phone,
      address: address,
      email: email,
      image: image,
    })
      .then((response) => {
        console.log("update good");
        console.log(response.data);
        window.location.href = "/";
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  };

  useEffect(() => {
    const fillId = location.pathname.slice(8);
    console.log("The fill id is " + fillId);
    Axios.get(`http://localhost:3001/api/contact/${fillId}`)
      .then((response) => {
        console.log(response.data);
        setContact(response.data);
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddress(contact.Address);
        setImage(contact.photograph);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form
            className="form"
            onSubmit={updateContact}
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
                defaultValue={contact.name}
                onChange={handlename}
                onLoad={handlename}
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
                defaultValue={contact.phone}
                onChange={handlePhone}
                onLoad={handlePhone}
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
                defaultValue={contact.address}
                onChange={handleAddress}
                onLoad={handleAddress}
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
                defaultValue={contact.email}
                onChange={handleEmail}
                onLoad={handleEmail}
              ></input>
            </div>
            <div className="form-group">
              <label className="lead from-label">Select an image</label>
              <input
                type="file"
                placeholder="Image"
                accept="image/*"
                defaultValue={contact.photograph}
                onChange={handleImage}
                onLoad={handleImage}
              ></input>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                update
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UpdateContact;
