import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import dotenv from 'dotenv';
const Dashboard = () => {
    dotenv.config()
;    const REACT_APP_BACK_URL=process.env.REACT_APP_BACK_URL
    const [bookings, setBookings] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch user profile to get the username
        const fetchUsername = async () => {
            try {
                const userProfileResponse = await axios.post(`${REACT_APP_BACK_URL}/api/userprofile`, {
                    email: localStorage.getItem('userEmail'),
                });
                const userProfileData = userProfileResponse.data;
                const user = userProfileData.userData.name;
                setUsername(user);

                // Fetch bookings using the username
                fetchBookings(user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchBookings = async (user) => {
            try {
                const username = encodeURIComponent(user);
                console.log(username)
                const bookingsResponse = await axios.get(`${REACT_APP_BACK_URL}/api/Dash`, {
                    params: { username }
                });
                console.log(bookingsResponse.data)
                setBookings(bookingsResponse.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Your Bookings</h2>
            <div className="row">
                {bookings.map((booking, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Center: {booking.center}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Sport: {booking.sport}</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Time Slot:</strong> {booking.timeSlot}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Date:</strong> {new Date(booking.Date).toLocaleDateString()}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Court No:</strong> {booking.courtNo}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Booked:</strong> {booking.booked ? 'Yes' : 'No'}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;



