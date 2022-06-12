import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as CONTANT from "../Constant/constant.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroundId,
  setAddress,
  setGroundName,
  setEmail,
  setPhone,
  setOwnerName,
} from "../redux/slices/groundSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Login2 = ({ setGroundLogin }) => {
  const groundId = useSelector((state) => state?.groundSlice.groundId);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    window.localStorage.removeItem("dpUrl");
    window.localStorage.removeItem("coverUrl");
  }, []);

  const [user2, setUser2] = useState({
    email: "",
    password: "",
  });

  const inputEvent2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser2({ ...user2, [name]: value });
  };

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const { localStorage } = window;

  const setGroundData = (res) => {
    localStorage.setItem("groundId", res.data.ground._id);
    localStorage.setItem("groundname", res.data.ground.name);
    localStorage.setItem("ownername", res.data.ground.ownername);
    localStorage.setItem("email", res.data.ground.email);
    localStorage.setItem("phone", res.data.ground.phone);
    localStorage.setItem("address", res.data.ground.address);
    localStorage.setItem("from", "ground");
    setDpUrl(res.data.ground._id);
    setCoverUrl(res.data.ground._id);

    dispatch(setGroundId(res.data.ground._id));
    dispatch(setGroundName(res.data.ground.name));
    dispatch(setOwnerName(res.data.ground.ownername));
    dispatch(setEmail(res.data.ground.email));
    dispatch(setPhone(res.data.ground.phone));
    dispatch(setAddress(res.data.ground.address));
  };

  const setDpUrl = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `grounddp/${groundId}`))
      .then((url) => {
        console.log("DP URL: ", url);
        localStorage.setItem("dpUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const setCoverUrl = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `groundcover/${groundId}`))
      .then((url) => {
        console.log("Cover URL: ", url);
        localStorage.setItem("coverUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const login2 = () => {
    CONTANT.API.post("/ground/login2", user2).then((res) => {
      if (res.data.message == "Login Successsfully") {
        console.log(res.data.ground);
        setGroundData(res);
        alert(res.data.message);
        setGroundLogin(res.data.ground);
        history.push("/groundprofile");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <img id="teamformbg" src="./images/Loginpagepic.png" alt="futsal" />
      <div>
        <h1 id="loginid"> LOG IN </h1>
        <form id="teamform" onSubmit={onSubmits}>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            onChange={inputEvent2}
            value={user2.email}
            id="teamforminput"
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={inputEvent2}
            value={user2.password}
            id="teamforminput"
          />

          <br />
          <br />
          <p id="forgotpass"> Forgot Password? </p>
          <button type="submit" id="loginbutton" onClick={login2}>
            {" "}
            Log in{" "}
          </button>
        </form>
        <p id="createaccount">
          {" "}
          No account ?{" "}
          <span>
            {" "}
            <Link to="/groundform"> Create an Account</Link>{" "}
          </span>{" "}
        </p>
      </div>
    </>
  );
};
export default Login2;
