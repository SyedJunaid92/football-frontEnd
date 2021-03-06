import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import axios from "axios";
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
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from "../redux/slices/teamSlice";
import { getStorage, deleteObject } from "firebase/storage";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

function Profile() {
  const storagee = getStorage();
  const dispatch = useDispatch();
  const { localStorage } = window;
  const userEmail = useSelector((state) => state?.utilitySlice?.userEmail);
  const teamId = useSelector((state) => state?.teamSlice?.teamId);
  const team = useSelector((state) => state?.teamSlice?.teamname);

  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("dpUrl"));
  const [dpUpload, setDpUpload] = useState(null);
  const [url3, setUrl3] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("dpUrl"));
      getAllStatus();
    }, 1000);
  }, [dp_Url]);

  //   setHsCodeList([
  //     ...hsCodeList,
  //     {
  //       hsCode: "",
  //       description: "",
  //       parentDescription: "",
  //       customDutyPercentage: "",

  //       rebatePercentage: "",
  //       currency: "",
  //       country: "",
  //       unitAmount: "",
  //       quantity: "",
  //       uomId: "",
  //       hsUnitPrice: "",
  //       freeOfCost: "",
  //     },
  //   ]);

  //Remove elements from array

  // const errorList = [...HsCodeError];
  // errorList.splice(index, 1);
  // setHsCodeError(errorList);

  //   const url = require("url");
  //   const urlObj = url.parse(document.location.href, true);

  const uploadDp = () => {
    if (dpUpload == null) return;
    // const dpRef = ref(storage, `teamdp/${dpUpload.name + v4()}`)
    const dpRef = ref(storage, `teamdp/${teamId}`);
    // const dpRef = ref(storage, `teamdp/${}`)
    uploadBytes(dpRef, dpUpload)
      .then(() => {
        getDownloadURL(dpRef)
          .then((url3) => {
            setDpUrl(url3);
            window.localStorage.setItem("dpUrl", url3);
            CONTANT.API.post("/team/dp", { _id: teamId, imgURL: url3 });
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
  const [url2, setUrl2] = useState(null);
  useEffect(() => {
    getAllStatus();
  });
  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("coverUrl"));

      getAllStatus();
    }, 1000);
  }, [cover_Url]);

  const uploadCover = () => {
    if (coverUpload == null) return;
    const coverRef = ref(storage, `teamcover/${teamId}`);
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

  //Delete Cover
  const Deletecover = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `teamcover/${teamId}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        window.localStorage.removeItem("coverUrl");
        setCoverUrl();
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  //Delete Dp
  const Deletedp = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `teamdp/${teamId}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        window.localStorage.removeItem("dpUrl");
        setDpUrl();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    // window.location.reload(false);
  };

  //Status
  const [status, setStatus] = useState("");
  const [statusArray, setStatusArray] = useState([]);
  const getAllStatus = async () => {
    const response = await CONTANT.API.get(`/team/getStatus/${teamId}`);

    if (response?.data) {
      setStatusArray(response.data.statusArray.reverse());
    }
  };

  // const imageURL = () => {

  //     if (userEmail?.includes("Hammad")) {
  //         return "https://e7.pngegg.com/pngimages/640/937/png-clipart-legends-fc-football-sports-association-coach-football-text-logo.png"
  //     }
  //     if (userEmail?.includes("Huzayfah")) {
  //         return "https://i1.sndcdn.com/avatars-000314718335-tnyil9-t500x500.jpg"
  //     }
  //     if (userEmail?.includes("Ayesha")) {
  //         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZ3YEQiwKnFqsyRW-NtXrXL22Tt6j6bxj18mhao4sh-C1arVVUnuzsa5Xk9RGneKJxQQ&usqp=CAU"
  //     }
  //     if (userEmail?.includes("Beenish")) {
  //         return "https://wallpaperaccess.com/full/721202.jpg"
  //     }
  //     if (userEmail?.includes("Ali")) {
  //         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCD5uDHgKD0FEtXEEiZvNWrRgmS0VLf_YHUQ&usqp=CAU"
  //     }
  // }

  // const imageURL2 = () => {

  //     if (userEmail?.includes("Hammad")) {
  //         return "https://timelinecovers.pro/facebook-cover/download/soccer-goal8-facebook-cover.jpg"
  //     }
  //     if (userEmail?.includes("Huzayfah")) {
  //         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xy9BZAB9lYswwmJ5WjMvZL-2uxvB2apqYnNo7-3StSK-xRRxh2z7DstZ1NwJIt1tym8&usqp=CAU"
  //     }
  //     if (userEmail?.includes("Ayesha")) {
  //         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiPSwLLGbtgpho7ffBIZtKwh8l3tbvbcOblAtcIRutqctk5B1MOEz-U3yvuiMCGzmpa4&usqp=CAU"
  //     }
  //     if (userEmail?.includes("Beenish")) {
  //         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55B7q6E97w_sOcZcBQ6r7e-oHMTKixmr2Ef6NUXv1CyVkBmRANjIJRMQZ1tqnK8EHHlE&usqp=CAU"
  //     }
  //     if (userEmail?.includes("Ali")) {
  //         return "https://goravens.ca/wp-content/uploads/banner-soccer-2.jpg"
  //     }
  // }

  //Timeline

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const imageListRef = ref(storage, `teamtimeline/${teamId}`);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `teamtimeline/${teamId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const list = [...imageList];
        list.unshift(url);
        setImageList(list);
        window.localStorage.setItem("imageList", list);
      });
    });
  };

  const deletePicture = async (e, index) => {
    e.preventDefault();

    const list = [...imageList];
    const paths = [...imagePath];
    const deletePath = paths[index];
    paths.splice(index, 1);
    setImagePath(paths);
    list.splice(index, 1);
    setImageList(list);

    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, deletePath);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("Deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    window.localStorage.setItem("imageList", list);
  };
  const deleteStatus = (e, index) => {
    e.preventDefault();
    const list = [...statusArray];
    list.splice(index, 1);
    setStatusArray(list);
    const url = list[index];
    console.log(url);
    // let imageRef = storagee.refFromURL(url);
    // imageRef.delete();
    window.localStorage.setItem("statusArray", list);
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        let path = imagePath;
        path.push(item.fullPath);
        setImagePath([...path]);

        getDownloadURL(item).then((url) => {
          let AllURL = imageList;
          AllURL.push(url);
          setImageList([...AllURL]);
        });
      });
    });
  }, []);

  const logout = () => {
    const { localStorage } = window;
    localStorage.clear();
    dispatch(setTeamId(""));
    dispatch(setTeamName(""));
    dispatch(setCaptainName(""));
    dispatch(setEmail(""));
    dispatch(setPhone(""));
    dispatch(setAddress(""));
  };

  const addStatus = async () => {
    const list = [...statusArray];
    list.unshift(status);
    setStatusArray(list);
    window.localStorage.setItem("statusArray", list);
    const response = await CONTANT.API.post(`/team/setStatus/${teamId}`, {
      status,
    });
    setStatus("");
    console.log(response);
  };

  // const addAbout = async () => {
  //     const response = await axios.post(`http://localhost:8080/team/setAbout/${teamId}`, {
  //         about
  //     })
  //     setAbout("")
  //     console.log(response)
  // }

  return (
    <>
      <div className="profilepage">
        <ToastContainer />
        {/* <ImageUpload center id="file" name="file" onInput={setSelectedImage} rounded={true} errorText="Please provide an image." /> */}
        <div className="profilecontainer">
          <button className="logoutt" onClick={() => logout()}>
            Logout
          </button>

          {/* Cover */}
          <input
            type="file"
            className="coverinputt"
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
              id="coverimginput"
            >
              Upload Cover
            </Button>
          </label>
          <div className="coverborder">
            {cover_Url && <img src={cover_Url} className="coverimg" alt="" />}
          </div>

          {/* Dp */}
          <div className="profiledetails">
            <div className="profileimg">
              <input
                type="file"
                className="dpinputtt"
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
                  id="profilephotoinputt"
                >
                  Upload Dp
                </Button>
              </label>

              <div id="dpborder">
                {dp_Url && <img src={dp_Url} className="profilephoto" alt="" />}
              </div>
            </div>

            <button
              className="message"
              onClick={() => {
                window.open(
                  "https://football-messenger.herokuapp.com/",
                  "_blank"
                );
              }}
            >
              Message
            </button>
            <button className="matchup2">Match Up</button>
          </div>
          <Button onClick={Deletecover}> Delete Cover </Button>
          <Button onClick={Deletedp}> Delete Dp </Button>
          <br></br>
          <br></br>
          <div className="details">
            <h1 className="Name">{team}</h1>
          </div>

          {/* About */}
          <form method="POST">
            <div className="about">
              <h2>About</h2>

              <textarea
                type="text"
                autoComplete="off"
                name="about"
                className="abouttext"
                // onChange={(event) => setAbout(event.target.value)}
                // value={about}
              ></textarea>
              <button id="aboutbutton">
                <p
                  style={{
                    marginLeft: "-16px",
                    marginTop: "-3px",
                    fontSize: "14px",
                  }}
                >
                  Publish
                </p>
              </button>
            </div>

            {/* Timeline */}
            <div className="teamgallery">
              <h2>Timeline</h2>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <br></br>
              <br></br>
              <div></div>
              <Button onClick={uploadImage} variant="contained" color="primary">
                Upload Image
              </Button>
              <br></br>
              <br></br>

              {imageList &&
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

            {/*Status*/}

            <div className="teamgallery">
              <h2>Status</h2>
              <div>
                <textarea
                  type="text"
                  name="status"
                  autoComplete="off"
                  placeholder="What's on Your Mind ......"
                  onChange={(event) => setStatus(event.target.value)}
                  value={status}
                  id="status"
                ></textarea>
              </div>
              <button id="statusbutton" onClick={addStatus} type="button">
                <p
                  style={{
                    marginLeft: "-11px",
                    marginTop: "-3px",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  Share{" "}
                </p>
              </button>
            </div>
          </form>

          <br></br>
          <br></br>
          {statusArray &&
            statusArray?.map((status, index) => {
              return (
                <div key={index} className="statusresult">
                  <div style={{ marginTop: "2vh", float: "right" }}>
                    <Button
                      style={{}}
                      onClick={(e) => deleteStatus(e, index)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete Status
                    </Button>
                  </div>
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
