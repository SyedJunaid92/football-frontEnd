import React, { useState, useEffect } from "react";
import * as CONSTANT from "../Constant/constant";

const AcademyUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    let name = window.sessionStorage.getItem("visitiorName");
    await CONSTANT.API.get(`/academy/users/${name}`).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  };
  return (
    <section className="p-4 container">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">
          <br></br>
          <br></br>
        </div>
        {users.map((item, index) => (
          <div className="centerr3" key={index}>
            <div className="card">
              <div className="containerr">
                <h4> Name: </h4>
                <h4>{item.studentname}</h4>
                <h4> Email </h4>
                <p className="innerdata">{item.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AcademyUsers;
