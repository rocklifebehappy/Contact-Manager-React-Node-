import React from "react";
import { Link } from "react-router-dom";
const MyContact = (props) => {
  console.log(props.contact.photograph);
  const image = "...." + props.contact.photograph;
  return (
    <div className="row justify-content-around border p-2 m-1">
      <div className="col-sm-8">
        <div className="row justify-content-around">
          <div className="col-sm-6">
            <h5>{props.contact.name}</h5>
          </div>
          <div className="col-sm-6 text-right">
            <p className="lead">{props.contact.phone}</p>
          </div>
          <div className="col-sm-6"></div>
        </div>
        <div className="row justify-content-around">
          <div className="col-sm-6">
            <Link to="">
              <img
                className="img border-1 w-200"
                width="100px"
                src={"uploads/" + props.contact.photograph}
                alt="image loading.."
              ></img>
            </Link>
          </div>
          <div className="col-sm-6 text-right">
            <p className="lead">{props.contact.email}</p>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-sm-12 text-right">
            <p className="lead">{props.contact.address}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-2">
        <Link
          to={{
            pathname: `/update/${props.contact._id}`,
          }}
        >
          <button className="btn btn-primary">update</button>
        </Link>
      </div>
      <div className="col-sm-2">
        <button
          className="btn btn-danger"
          onClick={() => props.deleteFriend(props.contact._id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default MyContact;
