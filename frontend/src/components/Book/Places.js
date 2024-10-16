import {useState ,useEffect}from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sports from './Sports';
import { Link } from 'react-router-dom';
const Places = ()=>{
    const [centers,setCenters]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/api/View")
        .then((res)=>{setCenters(res.data)
            // console.log(centers)
        })
        .catch((err)=>{console.log(err)});
    },[])
    return(
        <div className="container mt-5">
        <div className="row justify-content-center">
            {centers.length > 0 ? (
                centers.map((center, index) => (
                    <button 
                        className={`col-6 col-sm-6 col-md-6 mb-4 ${centers.length % 2 === 1 && centers.length - 1 === index ? 'mx-auto' : ''}`} 
                        key={index} onClick={()=>{<Link to='/Booking/Sport'/>}}
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
export default Places;