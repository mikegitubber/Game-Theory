import React from 'react';
import './Signupform.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Loginadmin() {
    let navigate = useNavigate();
    const [Credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/Loginadmin", {
                email: Credentials.email,
                password: Credentials.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = response.data; // Access data directly
            if (!json.success) {
                alert("Something went wrong");
            } else {
                // Assuming your API returns a boolean indicating admin status
                const isAdmin = json.isAdmin; // Adjust according to your API response
                localStorage.setItem("userEmail", Credentials.email);
                localStorage.setItem("authToken", json.authToken);
                localStorage.setItem("isAdmin", true); // Store admin status
                navigate('/Booking');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className='container' style={{ height: '650px', width: '1000px', alignItems: "center", justifyContent: "center", marginTop: '70px' }}>
            <form onSubmit={handleSubmit} className='formlogin' style={{ "width": "400px" }}>
                <h2 style={{ fontSize: '35px', textAlign: 'center', marginBottom: '30px', fontFamily: "Caveat,cursive" }}>Admin Login</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control requi" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control requi" id="exampleInputPassword1" name="password" value={Credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
