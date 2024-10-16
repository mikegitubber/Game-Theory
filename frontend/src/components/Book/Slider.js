import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import UserContext from "../../Constants/UserContext";

const BookingSchedule = ({ bookings, courts, timeslots, handleBooking }) => {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-100">
      <div className="col-span-1"></div>
      {courts.map((court, idx) => (
        <div key={idx} className="font-semibold text-center">
          Court {court}
        </div>
      ))}

      {timeslots.map((time, timeIdx) => (
        <div key={timeIdx} className="col-span-7 grid grid-cols-7 gap-4">
        
          <div className="font-semibold">{time}</div>

          {courts.map((court, courtIdx) => (
            <div key={courtIdx} className="text-center">
              <button
                className={`w-full h-10 ${
                  bookings[court] && bookings[court][time]
                    ? "bg-red-300 cursor-not-allowed" 
                    : "bg-green-100 hover:bg-green-300" 
                } border p-2`}
                onClick={() => handleBooking(court, time)}
                disabled={bookings[court] && bookings[court][time]}
              >
                {bookings[court] && bookings[court][time]
                  ? bookings[court][time] 
                  : "Available"} 
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Slider = () => {
  const [date, setDate] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState("Badminton"); 
  const [courts, setCourts] = useState([]);
  const [bookings, setBookings] = useState({});
  const timeslots = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
    const {center,sport}=useContext(UserContext);
  
    useEffect(() => {
      // Ensure this effect runs when selectedSport or center changes
      if (selectedSport && center) {
        axios
          .get(`http://localhost:5000/api/View?center=${center}&sport=${selectedSport}`)
          .then((res) => {
            const { courts, bookings } = res.data; // Make sure your API sends this structure
            setCourts(Array.from({ length: courts }, (_, i) => i + 1)); 
            setBookings(bookings); 
          })
          .catch((err) => {
            console.error("Error fetching court data:", err);
          });
      }
    }, [selectedSport, center]);
    

  const handleBooking = (court, time) => {
    const bookingData = {
      username: "CurrentUser", 
      center,
      sport: selectedSport,
      time: new Date(`${format(date, "yyyy-MM-dd")} ${time}`), 
      courtNo: court,
      booked: true,
    };

    axios
      .post("http://localhost:5000/api/book", bookingData)
      .then((res) => {
        setBookings((prev) => ({
          ...prev,
          [court]: { ...prev[court], [time]: "Booked by You" },
        }));
      })
      .catch((err) => {
        console.error("Error booking slot:", err);
      });
  };

  return (
    <div>
   
      <div className="mb-4">
        <label htmlFor="sport" className="font-semibold">
          Select Sport:
        </label>
        <select
          id="sport"
          className="ml-2 p-2 border"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="Badminton">Badminton</option>
          <option value="Swimming">Swimming</option>
  
        </select>
      </div>

      <BookingSchedule
        bookings={bookings}
        courts={courts}
        timeslots={timeslots}
        handleBooking={handleBooking}
      />
    </div>
  );
};

export default Slider;
