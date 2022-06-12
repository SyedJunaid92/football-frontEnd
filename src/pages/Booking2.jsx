import React, { useEffect, useState } from "react";
import abc from "../images/abc.jpg";
import abc3 from "../images/abc3.jpg";
import ground4 from "../images/ground4.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as CONSTANT from "../Constant/constant";
import { Grid } from "@mui/material";
import { async } from "@firebase/util";

const Booking2 = () => {
  const [Slots, setSlots] = useState([]);
  const [_id, set_ID] = useState(null);
  const [name, setName] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [inde, setinde] = useState([]);
  const [bookedBy, setBookedBy] = useState([]);
  const times = [
    "7-8:30 am",
    "9-9:30 am",
    "10-11:30 am",
    "12-1:30 pm",
    "2-2:30 pm",
    "3-3:30 pm",
    "4-4:30 pm",
    "5-5:30 pm",
    "6-6:30 pm",
    "7-8:30 pm",
    "9-10:30 pm",
    "11-12:30 pm",
  ];
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    set_ID(window.localStorage.getItem("groundID"));
    setName(window.localStorage.getItem("groundName"));
    setTeamName(window.localStorage.getItem("teamname"));
  });
  useEffect(() => {
    set_ID(window.localStorage.getItem("groundID"));
    setTimeout(() => {
      getSlots();
    }, 1000);
  }, []);

  const getSlots = async () => {
    let today = new Date();
    let curent_date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let id;
    let k;
    if (_id == null) {
      id = window.localStorage.getItem("groundID");
    }
    if (_id == null) {
      k = id;
    } else {
      k = _id;
    }

    await CONSTANT.API.post(`/ground/getSlot`, {
      _id: k,
      date: curent_date,
    }).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        setSlots(res.data);
        console.log(res.data);
        setData(res.data);
      }
    });
  };
  const getSlotsFromDateChange = async (year, month, date) => {
    let curent_date = year + "-" + month + "-" + date;

    await CONSTANT.API.post(`/ground/getSlot`, { _id, date: curent_date }).then(
      (res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setSlots(res.data);
          setData(res.data);
        }
      }
    );
  };
  const bookSlot = async (index) => {
    let curent_date =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    await CONSTANT.API.post("/ground/bookSlot", {
      index,
      _id,
      date: curent_date,
      name: teamName,
    }).then((res) => {
      alert(res.data.message);
      getSlotsFromDateChange(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate()
      );
    });
  };
  const undoSlot = async (index) => {
    let curent_date =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    await CONSTANT.API.post("/ground/undoSlot", {
      index,
      _id,
      date: curent_date,
    }).then((res) => {
      alert(res.data.message);
      getSlotsFromDateChange(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate()
      );
    });
  };
  const setData = (time) => {
    if (time.length == 0) {
      setinde([]);
    }
    let ij = [];
    let k = [];
    time.map((item, index) => {
      ij[item.in] = item.in;
      setinde([...ij]);
      k[item.in] = item.bookedby;
      setBookedBy([...k]);
    });
  };
  return (
    <>
      <div style={{ backgroundImage: `url(${abc}` }}>
        <h1 className="groundname">{name != null ? name : null}</h1>

        <h2 className="dateheading">Select Date You Want To Select</h2>
        <form className="formdate">
          <div>
            <DatePicker
              id="datestart"
              minDate={new Date()}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setinde([]);
                getSlotsFromDateChange(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                );
              }}
            />
          </div>
        </form>
        {/* 
        <button className="allslots"> All Slots</button>
        <button className="avaslots"> Available Slots</button> */}

        <div className="row  ">
          {times.map((item, index) => (
            <div className="center3" key={index}>
              <div className="bookingcard">
                <img
                  src={abc3}
                  width="230px"
                  height="150px"
                  style={{ marginTop: 10, marginBottom: 10 }}
                />
                <div className="container1">
                  <h4 style={{ paddingLeft: 3 }}>Time: {item}</h4>

                  {inde.length > 0 && inde[index] == index ? (
                    <div>
                      <h4
                        style={{ paddingLeft: 3, marginBottom: 20 }}
                        onClick={() => {
                          if (teamName == bookedBy[index]) {
                            undoSlot(index);
                          }
                        }}
                      >
                        Booked By: <b>{bookedBy[index]}</b>
                      </h4>
                    </div>
                  ) : (
                    <button
                      style={{ paddingLeft: 3 }}
                      className="btnn2"
                      onClick={() => {
                        bookSlot(index);
                      }}
                    >
                      Book now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking2;
