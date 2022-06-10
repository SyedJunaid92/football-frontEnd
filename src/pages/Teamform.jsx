import React, { useState } from "react";
import axios from "axios";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";
import Teamfrontpages from "./Teamfrontpages";
import { useDispatch } from "react-redux";
import { teamAction } from "../redux/actions/loadingAction";
import { setTeamData } from "../redux/slices/utilitySlice";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";

function Teamform() {
  const dispatch = useDispatch();
  const history = useHistory();

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

  //For Registraition List of Teams
  const [items, setItems] = useState([]);

  const [team, setTeam] = useState({
    teamName: "",
    captainName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const onSubmits = (event) => {
    event.preventDefault();
  };

  const inputEvent = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setTeam({
      ...team,
      [name]: value,
    });
  };

  const register = () => {
    const data = {
      name: team.teamName,
      captainName: team.captainName,
      email: team.email,
      password: team.password,
      phone: team.phone,
      address: team.address,
    };

    if (
      data.name &&
      data.captainName &&
      data.email &&
      data.password &&
      data.phone &&
      data.address
    ) {
      CONTANT.API.post("/team/register", data).then((res) => {
        if (res.data.message == "Successfully Registered, Please Login Now") {
          alert(res.data.message);
          setSnackBar({
            ...snackBarstate,
            type: "success",
            message: "Success: Team Added Successfully ",
            open: true,
          });
          history.push("/login");
        } else {
          console.log(res.data);
          alert(res.data.message);
        }
      });
    } else {
      alert("Not posted");
    }
  };

  const addItem = () => {
    // value.push(team);
    // console.log(value);
    // const temp = Object.freeze([]);
    // temp.push(team);

    let newArr = [...items];
    newArr.push(team);

    setItems(newArr);
    console.log(newArr);
    dispatch(setTeamData(newArr));
    //localStorage.setItem("teams", newArr);
    // history.push("/teams");
    // if(!team.teamname)
    // {

    // }
    // else
    // {
    //     setItems([...items, team.teamname]);
    // }
  };

  return (
    <>
      <img id="teamformbg" src="./images/teamspic.png" alt="futsal" />
      <div>
        <h1 id="teamformsignup"> SIGN UP AS TEAM </h1>
        <form id="teamform" onSubmit={onSubmits}>
          <input
            type="text"
            name="teamName"
            autoComplete="off"
            placeholder="Enter Yours Team's Name"
            onChange={(e) => {
              setTeam({
                ...team,
                teamName: e.target.value,
              });
            }}
            value={team.teamName}
            id="teamforminput"
          />
          <br />

          <input
            type="text"
            name="captainName"
            autoComplete="off"
            placeholder="Enter Captain's Name"
            onChange={(e) => {
              setTeam({
                ...team,
                captainName: e.target.value,
              });
            }}
            value={team.captainName}
            id="teamforminput"
          />
          <br />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setTeam({
                ...team,
                email: e.target.value,
              });
            }}
            value={team.email}
            id="teamforminput"
          />
          <br />

          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setTeam({
                ...team,
                password: e.target.value,
              });
            }}
            value={team.password}
            id="teamforminput"
          />
          <br />

          <input
            type="number"
            name="phone"
            autoComplete="off"
            placeholder="Enter Your Mobile Number"
            onChange={(e) => {
              setTeam({
                ...team,
                phone: e.target.value,
              });
            }}
            value={team.phone}
            id="teamforminput"
          />
          <br />

          <input
            type="text"
            name="address"
            autoComplete="off"
            placeholder="Enter Your Address"
            onChange={(e) => {
              setTeam({
                ...team,
                address: e.target.value,
              });
            }}
            value={team.address}
            id="teamforminput"
          />

          <br />
          <br />
          <button type="submit" id="teamformsubmit" onClick={register}>
            <h1 id="formsubmit"> Submit</h1>{" "}
          </button>
          <button onClick={addItem}>ADD</button>
        </form>
        {/* {items.map((elem, ind) => {
          return (
            <div key={ind}>
              <h1>{elem}</h1>
            </div>
          );
        })} */}
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
      </div>
    </>
  );
}
// function Teamfrontpage ()
// {
//     return (
//         <>

//         </>
//     );
// }

export default Teamform;
