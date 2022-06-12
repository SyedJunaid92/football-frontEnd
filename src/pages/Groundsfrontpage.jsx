import React, { useState, useEffect } from "react";
import SportsIcon from "@mui/icons-material/Sports";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as CONSTANT from "../Constant/constant.js";
import { useHistory } from "react-router-dom";

function Groundsfrontpage() {
  const [ground, setGround] = useState([]);
  const [OnlineUser, setOnlineUser] = useState(null);
  const [from, setFrom] = useState(null);
  const history = useHistory();

  useEffect(() => {
    window.sessionStorage.removeItem("visitorID");
    window.sessionStorage.removeItem("visitordpUrl");
    window.sessionStorage.removeItem("visitorcoverUrl");
    window.sessionStorage.removeItem("visitiorName");
    setOnlineUser(window.sessionStorage.getItem("email"));
    setFrom(window.sessionStorage.getItem("from"));
    getAllGrounds();
  });
  const getAllGrounds = () => {
    CONSTANT.API.get("/ground/test").then((res) => {
      setGround(res.data);
    });
  };
  const ProfileView = (email, id, groundName) => {
    if (OnlineUser == email && from == "ground") {
      window.sessionStorage.setItem("visitiorName", groundName);
      history.push("/Groundprofile");
    } else {
      window.sessionStorage.setItem("visitorID", id);
      window.sessionStorage.setItem("visitiorName", groundName);
      history.push("/visitorgroundprofile");
    }
  };
  return (
    <>
      <img
        id="teamgroundfrontpagemainpic"
        src="./images/groundpicfrontmain.jpg"
        alt="futsal"
      />
      <div id="teamgroundfrontpagebox">
        <input
          type="text"
          placeholder="Search ground by Name"
          id="teamgroundsearch"
        />
        <li id="teamgroundpageli">
          {ground &&
            ground.map((item, index) => {
              return (
                <ul
                  id="teamgroundpageul"
                  key={index}
                  onClick={() => ProfileView(item.email, item._id, item.name)}
                >
                  <h1 id="groupsportspic">
                    <SportsIcon />
                  </h1>
                  <span id="teamgroundpageulname">{item.name}</span>
                  <h1 id="dropicon">
                    <ArrowDropDownIcon />
                  </h1>
                </ul>
              );
            })}

          {/* <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Upper Midfield </span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Greenfield</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Strikers</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Vibrant</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Zaraj</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Raad</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Palm</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
                        <ul id="teamgroundpageul"><h1 id="groupsportspic"><SportsIcon/></h1><span id="teamgroundpageulname">Total Ayub park</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul> */}
        </li>
      </div>
    </>
  );
}
export default Groundsfrontpage;
