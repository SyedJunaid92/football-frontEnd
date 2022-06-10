import react from "react";
import { Link } from 'react-router-dom';
import Academyform from "./Academyform";

function Academyfrontpage ()

{

    const Academyform1 = (e)=>{

        // e.preventDefault();
        window.location.replace('/Academyform')
      }
    return (
        <>       
                <section  className="colorbg">
                <div className="img">
                <img src='./Images/academy.png' alt="image" width="640" height="675"/>
            <div >
            <h1 className="headertext">Join The Academy</h1>
            <p1 className="paragraphtext">Today every ground has it's academy with professional training staff.<br></br> Train with the best coaches to improve your skills & play on higher level.<br></br> Get register with any of academy in twin cities through our website.</p1>
            
            
            <button className="register" onClick={Academyform1}>Register Now</button>
    


      </div>
               </div>
        </section>
        
        </>
        );
    }
    
    export default Academyfrontpage;

// import React from "react";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import GroupsIcon from '@mui/icons-material/Groups';

// function Academyfrontpage ()
// {
//     return (
//         <>
//             <img id="academyfrontpagemainpic" src='./images/19.jpg' alt="futsal" /> 
//             <div id = "academyfrontpagebox">
//             <input type="text" placeholder="Search Academy by Name" id= "academysearch" />
//                     <li id="academypageli">
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Kings Football Academy </span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Midfield Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Greenfield Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Strikers Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Vibrant Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Zaraj Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Raad Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                         <ul id="academypageul"><h1 id="groupsportspic"><GroupsIcon/></h1><span id="academypageulname">Raad Football Academy</span><h1 id="dropicon"><ArrowDropDownIcon/></h1></ul>
//                     </li>
//             </div> 
//         </>
//     );
// }
// export default Academyfrontpage;

