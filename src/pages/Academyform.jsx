import React, { useState, useEffect } from "react";

import * as CONSTANT from '../Constant/constant.js'

const Academyform = () => {
    const [ground, setGround] = useState([])
    const [academy, setAcademy] = useState({
        studentname: "",
        fathername: "",
        email: "",
        age: "",
        contact: "",
        address: "",
        myacademy: "",
    });
    useEffect(() => {
        getGrounds()
    })
    const getGrounds = async () => {
        await CONSTANT.API.get('/ground/test')
            .then(res => {
                if (res.data.message) {
                    alert("Something Went Wrong")

                } else {
                    setGround(res.data)
                }
            })
    }
    const onSubmits = (event) => {
        event.preventDefault();
    }
    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);

        setAcademy({ ...academy, [name]: value });
    }
    const academyformregister = () => {
        const { studentname, fathername, email, age, contact, address, myacademy } = academy

        if (studentname && fathername && email && age && contact && address && myacademy) {
            CONSTANT.API.post("/academy/academyformregister", academy)
                .then(res => {
                    alert(res.data.message)

                })
        }
        else {
            alert("Not posted")
        }
    }
    return (
        <>

            <body className="academyformbody">

                <div className="login-box">
                    <h1>REGISTRATION FORM</h1>

                    <form onSubmit={onSubmits}>
                        <div className="user-box">
                            <input
                                type="text"
                                name="studentname"
                                onChange={inputEvent}
                                value={academy.studentname}
                            />
                            <label>Student Name:</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="fathername"
                                onChange={inputEvent}
                                value={academy.fathername}
                            />
                            <label>Father Name:</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="email"
                                name="email"
                                onChange={inputEvent}
                                value={academy.email}
                            />
                            <label>Email:</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="number"
                                name="age"
                                onChange={inputEvent}
                                value={academy.age}
                            />
                            <label>Age:</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="number"
                                name="contact"
                                onChange={inputEvent}
                                value={academy.contact}
                            />
                            <label>Contact Number:</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="address"
                                onChange={inputEvent}
                                value={academy.address}
                            />
                            <label>Address:</label>
                        </div>

                        <div className="user-box">
                            <select
                                name="myacademy"
                                onChange={inputEvent}
                                value={academy.myacademy}
                            >
                                <option value="">--Choose--</option>
                                {ground.map((item, index) => (
                                    <option value={item.name}>{item.name}</option>

                                ))}
                                {/* <option value="kings"> Kings Football Academy</option>
                                <option value="uppermidfield"> Upper Midfield Ayub Park</option>
                                <option value="lowermidfield"> Lower Midfield Ayub Park</option>
                                <option value="kickoff1"> Kick off Jinnah Park Field 1</option>
                                <option value="kickoff2"> Kick off Jinnah Park Field 2</option>
                                 */}
                            </select>
                            <label>Select Academy:</label>
                        </div>


                        <a href="#">
                            <button id="sub" onClick={academyformregister}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Submit
                        </button>
                        </a>

                    </form>
                </div>
            </body>

        </>
    );
}

export default Academyform;


// function Academyform ()
// {   
//     const [studentname, setstudentname] = useState("")
//     const [fathername, setfathername] = useState("")
//     const [contactnum, setcontactnum] = useState("")
//     const [age, setage] = useState("")
//     const [gender, setgender] = useState("")
//     const [academy, setacademy] = useState("")
//     const [date, setdate] = useState("")
//     const [addresss, setaddresss] = useState("")

//     // const useEffect = ()=>{
//     //     setstudentname("Hammad")
//     // },[]

//     const onSubmits = (event) =>
//     {
//         event.preventDefault();
//     }

//     const inputEvent = (event) =>
//     {
//         console.log(event.target.value);
//         setstudentname(event.target.value);
//     }

//     const inputEvent2 = (event) =>
//     {
//         console.log(event.target.value);
//         setfathername(event.target.value);
//     }

//     const inputEvent3 = (event) =>
//     {
//         console.log(event.target.value);
//         setcontactnum(event.target.value);
//     }

//     const inputEvent4 = (event) =>
//     {
//         console.log(event.target.value);
//         setage(event.target.value);
//     }

//     const inputEvent5 = (event) =>
//     {
//         console.log(event.target.value);
//         setgender(event.target.value);
//     }

//     const inputEvent6 = (event) =>
//     {
//         console.log(event.target.value);
//         setacademy(event.target.value);
//     }

//     const inputEvent7 = (event) =>
//     {
//         console.log(event.target.value);
//         setdate(event.target.value);
//     }

//     const inputEvent8 = (event) =>
//     {
//         console.log(event.target.value);
//         setaddresss(event.target.value);
//     }
//     return ( 
//         <>  
//         <img id="teamformbg" src='./images/demy.png' alt="futsal" />
//             <div >
//                  <h1 id="academyformsignup"> SIGN UP </h1>
//                 <form id="academyform" onSubmit={onSubmits} >

//                         <input type ="text" 
//                          placeholder="Enter Student Name" 
//                          onChange={inputEvent} 
//                          value={studentname}
//                          id="academyforminput" />
//                          <br/>

//                          <input type ="text" 
//                          placeholder="Enter Father Name" 
//                          onChange={inputEvent2} 
//                          value={fathername} 
//                          id="academyforminput"
//                          />
//                          <br/>

//                          <input type ="email" 
//                          placeholder="Contact Number" 
//                          onChange={inputEvent3} 
//                          value={contactnum} 
//                          id="academyforminput"
//                          />
//                          <br/>

//                          <input type ="number" 
//                          placeholder="Age" 
//                          onChange={inputEvent4} 
//                          value={age} 
//                          id="academyforminput"
//                          />
//                         <br/>
//                         <br/>
//                         <label id="genderp"> Gender: </label> <nobr/>
//                         <input  type="radio" value="Male" name="gender"  onChange={inputEvent5} /> <label id="genderid">Male </label>
//                         <input  type="radio" value="Female" name="gender"  onChange={inputEvent5} /> <label id="genderid"> Female </label>
//                         <input  type="radio" value="Other" name="gender"  onChange={inputEvent5} />  <label id="genderid">Other </label>
//                         <br/>
//                         <br/>


//                         <label id="academyname"> Academy:</label>
//                         <nobr/>
//                         <nobr/>
//                          <select value={academy} 
//                          onChange={inputEvent6}
//                          id="academyselect">
//                         <option value="kings">Kings Football Academy</option>
//                         <option value="uppermidfield">Upper Midfield Ayub Park</option>
//                         <option value="lowermidfield">Lower Midfield Ayub Park</option>
//                         <option value="kickoff1">Kick off Jinnah Park Field 1</option>
//                         <option value="kickoff2">Kick off Jinnah Park Field 2</option>
//                         </select>
//                         <br/>

//                         <input type ="date" 
//                          onChange={inputEvent7} 
//                          value={date} 
//                          id="dateaddressinput"

//                          />

//                          <br/>
//                          <br/>
//                          <input type ="text" 
//                          placeholder="Address" 
//                          onChange={inputEvent8} 
//                          value={addresss} 
//                          id="dateaddressinput"
//                          />


//                         <br/>
//                         <br/>
//                         <button type="submit" id="academysubmit"> Submit </button>
//                 </form> 
//             </div>

//         </>
//      );
// };

