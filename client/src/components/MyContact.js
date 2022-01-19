import React from "react";
const MyContact = (props) => {
  return (
    <div className="row justify-content-around border p-2 m-1">
      <div className="col-sm-8">
        <div className="row justify-content-around">
          <div className="col-sm-6">
            <h5>{props.contact.name}</h5>
          </div>
          <div className="col-sm-6">
            <p className="lead">{props.contact.phone}</p>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-sm-6">
            <p className="lead">{props.contact.email}</p>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-sm-6">
            <p className="lead">{props.contact.address}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = `/update/${props.contact._id}`;
          }}
        >
          update
        </button>
      </div>
      <div className="col-sm-2">
        <button className="btn btn-danger">delete</button>
      </div>
    </div>
  );
};

export default MyContact;
