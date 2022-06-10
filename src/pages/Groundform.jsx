import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";

function Groundform() {
  const history = useHistory();
  useEffect(() => {
    window.sessionStorage.removeItem("dpUrl");
    window.sessionStorage.removeItem("coverUrl");
  }, []);

  const [ground, setGround] = useState({
    groundname: "",
    ownername: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // // const [teamname, setteamname] = useState("")
  // // const [captainname, setcaptainname] = useState("")
  // // const [youremail, setyouremail] = useState("")
  // // const [yourpassword, setyourpassword] = useState("")
  // // const [mobileno, setmobileno] = useState("")
  // // const [address, setaddress] = useState("")

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setGround({ ...ground, [name]: value });
  };

  const register = () => {
    const data = {
      name: ground.groundname,
      ownername: ground.ownername,
      email: ground.email,
      password: ground.password,
      phone: ground.phone,
      address: ground.address,
    };

    if (
      data.name &&
      data.ownername &&
      data.email &&
      data.password &&
      data.phone &&
      data.address
    ) {
      CONTANT.API.post("/ground/register", data).then((res) => {
        if (res.data.message == "Successfully Registered, Please Login Now") {
          alert(res.data.message);
          history.push("/login2");
        } else {
          alert(res.data.message);
        }
      });
    } else {
      alert("Not posted");
    }
  };

  return (
    <>
      <img id="teamformbg" src="./images/groundspic.png" alt="futsal" />
      <div>
        <h1 id="groundformsignup"> SIGN UP AS GROUND'S OWNER </h1>
        <form id="teamform" onSubmit={onSubmits}>
          <input
            type="text"
            name="groundname"
            autoComplete="off"
            placeholder="Enter Ground's Name"
            onChange={inputEvent}
            value={ground.groundname}
            id="teamforminput"
          />
          <br />

          <input
            type="text"
            name="ownername"
            autoComplete="off"
            placeholder="Enter Ground's Owner Name"
            onChange={inputEvent}
            value={ground.ownername}
            id="teamforminput"
          />
          <br />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Your Email"
            onChange={inputEvent}
            value={ground.email}
            id="teamforminput"
          />
          <br />

          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Your Password"
            onChange={inputEvent}
            value={ground.password}
            id="teamforminput"
          />
          <br />

          <input
            type="number"
            name="phone"
            autoComplete="off"
            placeholder="Enter Your Mobile Number"
            onChange={inputEvent}
            value={ground.phone}
            id="teamforminput"
          />
          <br />

          <input
            type="text"
            name="address"
            autoComplete="off"
            placeholder="Enter Ground's Address"
            onChange={inputEvent}
            value={ground.address}
            id="teamforminput"
          />

          <br />
          <br />
          <button type="submit" id="teamformsubmit" onClick={register}>
            <h1 id="formsubmit"> Submit </h1>{" "}
          </button>
          <button>ADD</button>
        </form>
      </div>
    </>
  );
}

export default Groundform;
