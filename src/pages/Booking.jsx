import React, { useState, useEffect } from "react";
import abc from "../images/abc.jpg";

import * as CONSTANT from "../Constant/constant";

const Booking = () => {
  const [Grounds, setGrounds] = useState([]);
  useEffect(() => {
    window.localStorage.removeItem("groundID");
    window.localStorage.removeItem("groundName");
    getAllGround();
  });
  const getAllGround = async () => {
    await CONSTANT.API.get("/ground/test").then((res) => {
      setGrounds(res.data);
    });
  };
  const Bookingg2 = (e) => {
    // e.preventDefault();
    window.location.replace("/Booking2");
  };

  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setFilter(event.target.value);
  };

  return (
    <section className="p-4 container">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">
          <h3>Search</h3>
          <div>
            <input
              placeholder="Search a Ground for Booking"
              type="search"
              id="searchh"
              onChange={searchText.bind(this)}
            />
          </div>
        </div>

        {Grounds.map((item, index) => {
          return (
            <div
              className="centerr3"
              key={index}
              onClick={() => {
                window.localStorage.setItem("groundID", item._id);
                window.localStorage.setItem("groundName", item.name);
              }}
            >
              <div className="card">
                <img
                  src={item.imgURL ? item.imgURL : abc}
                  width="242px"
                  height="190px"
                />
                <div className="containerr">
                  <h4>{item.name}</h4>
                  <h4> Location </h4>
                  <p className="innerdata">{item.address}</p>
                  <button className="btnn" onClick={Bookingg2}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Booking;
