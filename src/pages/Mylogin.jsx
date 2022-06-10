import React from "react";
import { Link } from 'react-router-dom';
import Login2 from "./Login2";
import Login from "./Login";

function Mylogin ()
{

    const login1 = (e)=>{

        // e.preventDefault();
        window.location.replace('/Login')
      }

      const login2 = (e)=>{

        // e.preventDefault();
        window.location.replace('/Login2')
      } 
    return (
        <>  
        <img id="teamformbg" src='./images/grass3.jpg' alt="futsal" />
         <div className="myloginbutton">
            <button  className="buttonloginasteam" onClick={login1}>Login As Team</button><br></br>
            <button  className="buttonloginasground" onClick={login2}>Login As Ground</button>    
         </div>
        
           
            
        </>
    );
}
export default Mylogin;