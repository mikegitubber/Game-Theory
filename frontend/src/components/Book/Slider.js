import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { format } from "date-fns";
import UserContext from "../../Constants/UserContext";
const BookingSchedule = ({ bookings, courts, timeslots, handleBooking }) => {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-100">
      {/* Render the court names as columns */}
      <div className="col-span-1"></div> {/* Empty space for times */}
      {courts.map((court, idx) => (
        <div key={idx} className="font-semibold text-center">
          Court {court}
        </div>
      ))}

      {/* Render the time slots and the bookings */}
      {timeslots.map((time, timeIdx) => (
        <div key={timeIdx} className="col-span-7 grid grid-cols-7 gap-4">
          {/* Render the time on the first column */}
          <div className="font-semibold">{time}</div>

          {/* Render booking data for each court */}
          {courts.map((court, courtIdx) => (
            <div key={courtIdx} className="text-center">
              <button
                className={`w-full h-10 ${
                  bookings[court] && bookings[court][time]
                    ? "bg-red-300 cursor-not-allowed" // Booked slots
                    : "bg-green-100 hover:bg-green-300" // Available slots
                } border p-2`}
                onClick={() => handleBooking(court, time)}
                disabled={bookings[court] && bookings[court][time]}
              >
                {bookings[court] && bookings[court][time]
                  ? bookings[court][time] // Show who booked if it's taken
                  : "Available"} {/* Show "Available" if not booked */}
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
  const [sports, setSports] = useState([]); 
  const [courts, setCourts] = useState([]);
  const [bookings, setBookings] = useState({});
  const timeslots = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
  const {center,sport,setGame}=useContext(UserContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/View?center=${center}`)
      .then((res) => {
        console.log(res);
        const centerSports = res.data[0].sports;
        setSports(centerSports);
        fetchCourtsAndBookings(sport);
      })
      .catch((err) => {
        console.error("Error fetching sports data:", err);
      });
  }, []);

  useEffect(() => {
    if (sport) {
      fetchCourtsAndBookings(sport);
    }
  }, [sport]);

  const fetchCourtsAndBookings = () => {
        sports.map((game)=>{
          if(game.sportname===sport) setCourts(Array.from({ length: game.courts }, (_, i) => i + 1)); 
        })
        setBookings(bookings); 
      
  };

  const handleBooking = (court, time) => {
    const bookingData = {
      username: "CurrentUser", 
      center,
      sport: sport,
      time: new Date(`${format(date, "yyyy-MM-dd")} ${time}`), 
      courtNo: court,
      booked: true,
    };

    // API call to post booking data
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
      {/* Dropdown to change sports */}
      <div className="mb-4">
        <label htmlFor="sport" className="font-semibold">
          Select Sport:
        </label>
        <select
          id="sport"
          className="ml-2 p-2 border"
          value={sport}
          onChange={(e) => setGame(e.target.value)}
        >
          {sports.map((sport, idx) => (
            <option key={idx} value={sport.sportname}>
              {sport.sportname}
            </option>
          ))}
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
