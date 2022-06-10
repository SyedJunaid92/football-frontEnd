import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Mylogin from './Mylogin';
import Teamform from './Teamform';

function Menu ()
{

  const Login1 = (e)=>{

    // e.preventDefault();
    window.location.replace('/Mylogin')
  }

  const Teamform1 = (e)=>{

    // e.preventDefault();
    window.location.replace('/Teamform')
  }
    return (
        <>
          <nav className="main-nav">
            <div className="logo">
            <Link to="/"><img src='./images/bms.png' alt="Logo"/></Link>
             </div>
                <div className="menu-link">
                  <ul>
                    <li><Link to="/teams"> TEAMS </Link> </li>
                    <li><Link to="/grounds"> GROUNDS  </Link></li>
                    <li><Link to="/academies"> ACADEMY  </Link></li>
                    <li><Link to="/donation"> DONATION </Link></li>
                    <li><Link to="/booking"> BOOKINGS  </Link></li>
                  </ul>
             </div>
             
            
             {/*login button*/}
             <div className="login">
             <a className="cta" ><button className="button1" onClick={Login1}>Login</button></a>
             </div>
        </nav>
        </>
    );
}

export default Menu;