import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { storage } from ".//firebase";
import * as CONSTANT from "../Constant/constant";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import {
  setGroundId,
  setAddress,
  setOwnerName,
  setEmail,
  setPhone,
  setGroundName,
} from "../redux/slices/groundSlice";

function Groundprofile() {
  const dispatch = useDispatch();
  const { localStorage } = window;
  const groundId = useSelector((state) => state?.groundSlice?.groundId);
  const groundName = useSelector((state) => state?.groundSlice?.groundname);

  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("dpUrl"));
  const [dpUpload, setDpUpload] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("dpUrl"));
    }, 1000);
  }, [dp_Url]);

  const uploadDp = () => {
    if (dpUpload == null) return;
    // const dpRef = ref(storage, `teamdp/${dpUpload.name + v4()}`)
    const dpRef = ref(storage, `grounddp/${groundId}`);
    // const dpRef = ref(storage, `teamdp/${}`)
    uploadBytes(dpRef, dpUpload)
      .then(() => {
        getDownloadURL(dpRef)
          .then((url3) => {
            setDpUrl(url3);
            CONSTANT.API.post("/ground/dp", { _id: groundId, imgURL: url3 });
            window.localStorage.setItem("dpUrl", url3);
          })
          .catch((error) => {
            console.log(error.message, "error getting while uploading");
          });
        setDpUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Cover
  const [cover_Url, setCoverUrl] = useState(localStorage.getItem("coverUrl"));
  const [coverUpload, setCoverUpload] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("coverUrl"));
    }, 1000);
  }, [cover_Url]);

  const uploadCover = () => {
    if (coverUpload == null) return;
    const coverRef = ref(storage, `groundcover/${groundId}`);
    uploadBytes(coverRef, coverUpload)
      .then(() => {
        getDownloadURL(coverRef)
          .then((url2) => {
            setCoverUrl(url2);
            window.localStorage.setItem("coverUrl", url2);
          })
          .catch((error) => {
            console.log(error.message, "error getting while uploading");
          });
        setCoverUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Timeline
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `groundtimeline/${groundId}`);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `groundtimeline/${groundId}/${imageUpload.name + v4()}`
    );

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            const list = [...imageList];
            list.unshift(url);
            setImageList(list);
            localStorage.setItem("imageList", list);
          })
          .catch((error) => console.log("Error: ", error));
      })
      .catch((error) => console.log("Error: ", error));
  };

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

  const deletePicture = (e, index) => {
    e.preventDefault();
    const list = [...imageList];
    const url = list[index];
    list.splice(index, 1);
    setImageList(list);

    let imageRef = storage.refFromURL(url);
    imageRef.delete();
    window.localStorage.setItem("imageList", list);
  };

  const logout = () => {
    const { localStorage } = window;
    localStorage.clear();

    dispatch(setGroundId(""));
    dispatch(setGroundName(""));
    dispatch(setOwnerName(""));
    dispatch(setEmail(""));
    dispatch(setPhone(""));
    dispatch(setAddress(""));
  };

  return (
    <>
      <div className="body">
        <button className="logoutt" onClick={() => logout()}>
          Logout
        </button>

        {/* Cover */}
        <input
          type="file"
          className="covergroundinput"
          id="select-image2"
          onChange={(event) => {
            setCoverUpload(event.target.files[0]);
          }}
        />
        <label htmlFor="select-image2">
          <Button
            onClick={uploadCover}
            variant="contained"
            color="primary"
            id="covergroundbtn"
          >
            Upload
          </Button>
        </label>
        <div className="cover-photo">
          {cover_Url && <img src={cover_Url} className="coverpicc" alt="" />}
        </div>

        {/* Dp */}
        <div>
          <input
            type="file"
            className="dpinputt"
            id="select-image"
            onChange={(event) => {
              setDpUpload(event.target.files[0]);
            }}
          />
          <label htmlFor="select-image">
            <Button
              onClick={uploadDp}
              variant="contained"
              color="primary"
              id="dpbuttonn"
            >
              Upload Dp
            </Button>
          </label>

          <div className="dpborderr">
            {dp_Url && <img src={dp_Url} className="dpphoto" alt="" />}
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
        <button
          className="msg-btn"
          onClick={() => {
            window.open("https://football-messenger.herokuapp.com/", "_blank");
          }}
        >
          Message
        </button>
        <button className="follow-btn">Bookings</button>

        <button
          className="follow-btn"
          onClick={() => window.location.replace("/academyuser")}
        >
          Academy
        </button>
        <button className="follow-btn">Location</button>
        <div>
          {/* Timeline */}
          <div className="groundgallery">
            <h2>Timeline</h2>
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <br></br>
            <br></br>

            <Button onClick={uploadImage} variant="contained" color="primary">
              Upload Image
            </Button>
            <br></br>
            <br></br>

            {imageList.length > 0 &&
              imageList?.map((url, index) => {
                return (
                  <Grid key={index} container>
                    <Grid item xs={12}>
                      <img src={url} className="timelinepics" alt="" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        style={{}}
                        onClick={(e) => deletePicture(e, index)}
                        variant="contained"
                        color="secondary"
                      >
                        Delete Picture
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Groundprofile;
