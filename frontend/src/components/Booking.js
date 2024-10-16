import {useState ,useEffect, useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from '../Constants/UserContext';

const REACT_APP_BACK_URL = process.env.BACK_URL;

const Booking = ()=>{
    const [centers,setCenters]=useState([]);
    const navigate=useNavigate();
    const {setPlace,}=useContext(UserContext);
    useEffect(() => {
        axios.get(`${BACK_URL}/api/View`)
        .then((res)=>{setCenters(res.data)
            // console.log(centers)
        })
        .catch((err)=>{console.log(err)});
    },[])
    const handleViewSports = (center) => {
        navigate('/Booking/Sports', { state: { sports: center.sport } });
    };
    return(
        <div className="container mt-5">
        <div className="row justify-content-center">
            {centers.length > 0 ? (
                centers.map((center, index) => (
                    <button 
                        className={`col-6 col-sm-6 col-md-6 mb-4 ${centers.length % 2 === 1 && centers.length - 1 === index ? 'mx-auto' : ''}`} 
                        key={index} onClick={()=>{handleViewSports(center)
                            setPlace(center.Name)
                        }}
                    >
                        <div
                            className="card text-white bg-dark"
                            style={{
                                height: '300px',
                                backgroundSize: 'cover',
                                backgroundImage: `url(${center.image})`, // Set the image as background
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="card-body d-flex align-items-end">
                                <h5 className="card-title bg-dark bg-opacity-75 p-2">
                                    {center.Name}
                                </h5>
                            </div>
                        </div>
                    </button>
                ))
            ) : (
                <p>Loading centers...</p>
            )}
        </div>
    </div>
    );
}
export default Booking;