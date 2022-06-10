import React, { useState, useEffect } from "react";
import Teamform from "./Teamform";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTANT from "../Constant/constant.js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from "../redux/slices/teamSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setTeamLogin }) => {
  const teamId = useSelector((state) => state?.teamSlice.teamId);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    window.sessionStorage.removeItem("dpUrl");
    window.sessionStorage.removeItem("coverUrl");
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Snackbar
  const [snackBarstate, setSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    type: "success",
    message: "",
  });
  const { vertical, horizontal, open } = snackBarstate;
  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBarstate, open: false });
  };

  const inputEvent2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const { sessionStorage } = window;

  const setTeamData = (res) => {
    sessionStorage.setItem("teamId", res.data.team._id);
    sessionStorage.setItem("teamname", res.data.team.name);
    sessionStorage.setItem("captainname", res.data.team.captainName);
    sessionStorage.setItem("email", res.data.team.email);
    sessionStorage.setItem("phone", res.data.team.phone);
    sessionStorage.setItem("address", res.data.team.address);
    sessionStorage.setItem("from", "team");
    setDpUrl(res.data.team._id);
    setCoverUrl(res.data.team._id);

    dispatch(setTeamId(res.data.team._id));
    dispatch(setTeamName(res.data.team.name));
    dispatch(setCaptainName(res.data.team.captainName));
    dispatch(setEmail(res.data.team.email));
    dispatch(setPhone(res.data.team.phone));
    dispatch(setAddress(res.data.team.address));
  };

  const setDpUrl = (teamId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamdp/${teamId}`))
      .then((url) => {
        console.log("DP URL: ", url);
        sessionStorage.setItem("dpUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const setCoverUrl = (teamId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamcover/${teamId}`))
      .then((url) => {
        console.log("Cover URL: ", url);
        sessionStorage.setItem("coverUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    CONSTANT.API.post("/team/login", user).then((res) => {
      //localStorage.setItem("id",res.data.team._id)
      if (res.data.message == "Login Successsfully") {
        console.log(res.data);
        setTeamData(res);

        setTeamLogin(res.data.team);

        setSnackBar({
          ...snackBarstate,
          type: "success",
          message: "Success: Login Successfully ",
          open: true,
        });
        toast.success("Login Successfully");
        history.push("/profile");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <img id="teamformbg" src="./images/loginpic.png" alt="futsal" />
      <div>
        <h1 id="loginid"> LOG IN </h1>
        <form id="teamform" onSubmit={onSubmits}>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            onChange={inputEvent2}
            value={user.email}
            id="teamforminput"
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={inputEvent2}
            value={user.password}
            id="teamforminput"
          />

          <br />
          <br />
          <p id="forgotpass"> Forgot Password? </p>
          <button type="submit" id="loginbutton" onClick={login}>
            {" "}
            Log in{" "}
          </button>
        </form>
        <p id="createaccount">
          {" "}
          No account ?{" "}
          <span>
            {" "}
            <Link to="/teamform">Create an Account</Link>{" "}
          </span>{" "}
        </p>
      </div>
      <div>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={5000}
          onClose={handleCloseSnackBar}
          key={vertical + horizontal}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackBar}
            severity={snackBarstate.type}
          >
            <Typography style={{ color: "#fff" }}>
              {snackBarstate.message}
            </Typography>
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
};
export default Login;
