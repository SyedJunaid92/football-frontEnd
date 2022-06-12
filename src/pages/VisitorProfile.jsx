import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import * as CONTANT from "../Constant/constant.js";

import { useHistory } from "react-router-dom";
import { fontSize } from "@mui/system";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from ".//firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { useDispatch } from "react-redux";

import { getStorage, deleteObject } from "firebase/storage";

function Profile() {
  const { localStorage } = window;
  const userEmail = useSelector((state) => state?.utilitySlice?.userEmail);
  const teamId = useSelector((state) => state?.teamSlice?.teamId);
  const [id, setID] = useState(localStorage.getItem("visitorID"));
  const [team, setTeam] = useState(window.localStorage.getItem("visitiorName"));
  const imageListRef = ref(storage, `teamtimeline/${id}`);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    setCover();
    setDp();
  });

  useEffect(() => {
    setImageList([]);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          let AllURL = imageList;
          AllURL.push(url);
          setImageList([...AllURL]);
        });
      });
    });
  }, []);
  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("visitordpUrl"));

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("visitordpUrl"));
      getAllStatus();
    }, 1000);
  }, [dp_Url]);

  //Cover
  const [cover_Url, setCoverUrl] = useState(
    localStorage.getItem("visitorcoverUrl")
  );

  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("visitorcoverUrl"));
      getAllStatus();
    }, 1000);
  }, [cover_Url]);

  //Status
  const [statusArray, setStatusArray] = useState([]);

  const getAllStatus = async () => {
    const response = await CONTANT.API.get(`/team/getStatus/${id}`);
    if (response?.data) {
      setStatusArray(response.data.statusArray);
    }
  };
  const setDp = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamdp/${id}`))
      .then((url) => {
        // setDpUrl(url);
        localStorage.setItem("visitordpUrl", url);
      })
      .catch((err) => console.log(err));
  };
  const setCover = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `teamcover/${id}`))
      .then((url) => {
        // setCoverUrl(url);
        localStorage.setItem("visitorcoverUrl", url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="profilepage">
        <ToastContainer />
        <div className="profilecontainer">
          {/* Cover */}

          <div className="coverborder">
            <img src={cover_Url} className="coverimg" alt="" />
          </div>

          {/* Dp */}

          <div className="profileimgvisitor">
            <br></br>
            <br></br>
            <div id="dpborder">
              <img src={dp_Url} className="profilephoto" alt="" />
            </div>
          </div>

          <br></br>
          <br></br>
          <div className="detailsvisitor">
            <h1 className="Name">{team}</h1>
          </div>

          {/* About */}
          <form method="POST">
            {/* Timeline */}
            <div className="teamgalleryvisitor">
              <h2>Timeline</h2>

              <br></br>
              <br></br>

              {imageList.length > 0 &&
                imageList.map((url, index) => (
                  <Grid key={index} container>
                    <Grid item xs={12}>
                      <img src={url} className="timelinepics" alt="" />
                    </Grid>
                  </Grid>
                ))}
            </div>

            {/*Status*/}

            <div className="teamgalleryvisitor">
              <h2>Status</h2>
            </div>
          </form>

          <br></br>
          <br></br>
          {statusArray &&
            statusArray?.map((status, index) => {
              return (
                <div key={index} className="statusresult">
                  <div className="statusposted">
                    <h1>{status}</h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Profile;
