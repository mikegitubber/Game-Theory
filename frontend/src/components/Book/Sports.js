import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {useState ,useEffect, useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../Constants/UserContext';
const Sports = () => {
    const [sports,setSports]=useState([]);
    const navigate=useNavigate();
    const {setGame,center}=useContext(UserContext);
    console.log(center)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/View?center=${center}`)
        .then((res)=>{
            // console.log(res.data[0].sports)
            setSports(res.data[0].sports)
            // console.log(centers)
        })
        .catch((err)=>{console.log(err)});
    },[])
    const handleViewSports = () => {
        navigate('/Booking/Calender');
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {sports.length > 0 ? (
                    sports.map((sport, index) => (
                        <button 
                            className={`col-6 col-sm-6 col-md-6 mb-4 ${sports.length % 2 === 1 && sports.length - 1 === index ? 'mx-auto' : ''}`} 
                            key={index} onClick={()=>{
                                setGame(sport.sportname)
                                handleViewSports(); 
                            }}
                        >
                            <div
                                className="card text-white bg-dark"
                                style={{
                                    height: '300px',
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${sport.sportimage})`,
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="card-body d-flex align-items-end">
                                    <h5 className="card-title bg-dark bg-opacity-75 p-2">
                                        {sport.sportname} - Courts: {sport.courts}
                                    </h5>
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    <p>No sports available for this center.</p>
                )}
            </div>
        </div>
    );
};

export default Sports;
