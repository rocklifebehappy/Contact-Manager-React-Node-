import { Axios } from "axios";
import React, { useEffect } from "react";
const UpdateContact = () => {
  useEffect(() => {
    Axios.get("http://localhost/contact/${id}").then((response) => {});
  });
  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form className="form ">
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
              ></input>
            </div>
            <div className="form-group">
              <label className="lead from-label">Select an image</label>
              <input type="file" placeholder="Image"></input>
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
export default UpdateContact;
