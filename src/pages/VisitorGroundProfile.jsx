import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storage } from ".//firebase";
import { getStorage, deleteObject } from "firebase/storage";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setGroundId,
  setAddress,
  setOwnerName,
  setEmail,
  setPhone,
  setGroundName,
} from "../redux/slices/groundSlice";

function VisitorGroundprofile() {
  const { sessionStorage } = window;
  const [id, setID] = useState(sessionStorage.getItem("visitorID"));
  const [groundName, setGroundName] = useState(
    window.sessionStorage.getItem("visitiorName")
  );

  useEffect(() => {
    setDp();
    setCover();
  });
  //Dp
  const [dp_Url, setDpUrl] = useState(sessionStorage.getItem("visitordpUrl"));

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(sessionStorage.getItem("visitordpUrl"));
    }, 1000);
  }, [dp_Url]);

  //Cover
  const [cover_Url, setCoverUrl] = useState(
    sessionStorage.getItem("visitorcoverUrl")
  );

  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(sessionStorage.getItem("visitorcoverUrl"));
    }, 1000);
  }, [cover_Url]);

  //Timeline
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `groundtimeline/${id}`);

  useEffect(() => {
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

  const setDp = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `grounddp/${id}`))
      .then((url) => {
        sessionStorage.setItem("visitordpUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const setCover = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `groundcover/${id}`))
      .then((url) => {
        console.log("Cover URL: ", url);
        sessionStorage.setItem("visitorcoverUrl", url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <body className="body">
        <section className="containerr1" />

        {/* Cover */}

        <div className="cover-photo">
          <img src={cover_Url} className="coverpicc" alt="" />
        </div>

        {/* Dp */}
        <div className="">
          <div className="dpborderr">
            <img src={dp_Url} className="dpphoto" alt="" />
          </div>
        </div>

        <div className="profilename">
          {groundName ? groundName : "Kings Football Game"}
        </div>

        <p className="about2">
          Best Ground in Twin Cities
          <br />
          Here to achieve your dreams
        </p>
        <button className="msg-btn">Message</button>
        <button className="follow-btn">Bookings</button>

        <button className="follow-btn">Tournaments</button>
        <button className="follow-btn">Location</button>
        <div>
          {/* Timeline */}
          <div className="groundgallery">
            <h2>Timeline</h2>

            <br></br>
            <br></br>
            <div></div>

            <br></br>
            <br></br>

            {imageList &&
              imageList?.map((url, index) => {
                return (
                  <Grid key={index} container>
                    <Grid item xs={12}>
                      <img src={url} className="timelinepics" alt="" />
                    </Grid>
                  </Grid>
                );
              })}
          </div>
        </div>
      </body>
    </>
  );
}

export default VisitorGroundprofile;
