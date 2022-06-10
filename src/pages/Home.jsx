import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Booking from "./Booking";

function Home() {
  const Bookingg = (e) => {
    // e.preventDefault();
    window.location.replace("/Booking");
  };

  return (
    <>
      <section className="hero_section">
        <div className="background-img">
          <img src="./images/home2.jpg" className="bg" />
          <div className="outer">
            <a className="booking" href="#">
              <button className="booking" onClick={Bookingg}>
                Book Now
              </button>
            </a>
            <a className="matchup" href="#">
              <button className="matchup">Message</button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
