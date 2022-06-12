import React, { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Teamform from "./Teamform";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from ".//firebase";

import * as CONSTANT from "../Constant/constant";

function Teamfrontpages() {
  //getting teams from redux
  //const team = useSelector((state) => state?.utilitySlice?.teamData);
  const history = useHistory();
  const [team, setTeams] = useState([]);
  const [OnlineUser, setOnlineUser] = useState(null);
  const [from, setFrom] = useState(null);

  useEffect(() => {
    window.localStorage.removeItem("visitorID");
    window.localStorage.removeItem("visitordpUrl");
    window.localStorage.removeItem("visitorcoverUrl");
    window.localStorage.removeItem("visitiorName");

    setOnlineUser(window.localStorage.getItem("email"));
    setFrom(window.localStorage.getItem("from"));
    getAllTeams();
  });

  const getAllTeams = () => {
    CONSTANT.API.get("/team/test").then((res) => {
      setTeams(res.data);
    });
  };

  const ProfileView = (email, id, teamName) => {
    if (OnlineUser == email && from == "team") {
      history.push("/profile");
    } else {
      window.localStorage.setItem("visitorID", id);
      window.localStorage.setItem("visitiorName", teamName);
      history.push("/visitorprofile");
    }
  };

  return (
    <>
      <img
        id="teamgroundfrontpagemainpic"
        src="./images/teampicfrontmain.jpg"
        alt="futsal"
      />
      <div id="teamgroundfrontpagebox">
        <input
          type="text"
          placeholder="Search Team by Name"
          id="teamgroundsearch"
        />
        <li id="teamgroundpageli">
          {team &&
            team.map((item, index) => {
              return (
                <ul
                  id="teamgroundpageul"
                  key={index}
                  onClick={() => ProfileView(item.email, item._id, item.name)}
                >
                  <h1 id="groupsportspic">
                    <GroupsIcon />
                  </h1>
                  <span key={index} id="teamgroundpageulname">
                    {item.name}
                  </span>
                  <h1 id="dropicon">
                    <ArrowDropDownIcon />
                  </h1>
                </ul>
              );
            })}
        </li>
      </div>
    </>
  );
}

export default Teamfrontpages;
