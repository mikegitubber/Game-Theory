import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { format } from "date-fns";
import UserContext from "../../Constants/UserContext";
const BookingSchedule = ({ bookings, courts, timeslots, handleBooking }) => {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-100">
      <div className="col-span-1"></div> {/* Empty space for times */}
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
              {/* Check if the slot is booked */}
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
                  ? `Booked by: ${bookings[court][time].username}`  // Display booked user's name
                  : "Available"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


const Slider = ({selectedDate}) => {
  const [date, setDate] = useState(selectedDate);
  // console.log(selectedDate)
  const [sports, setSports] = useState([]); 
  const [courts, setCourts] = useState([]);
  const [bookings, setBookings] = useState({});  // This will now hold booked user data
  const timeslots = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
  const { center, sport, setGame } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/View?center=${center}`)
      .then((res) => {
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
    sports.map((game) => {
      if (game.sportname === sport) {
        setCourts(Array.from({ length: game.courts }, (_, i) => i + 1));
      }
    });

    // Fetch bookings for the selected sport and center
    axios
      .get(`http://localhost:5000/api/View?center=${center}`)
      .then((res) => {
        const bookingsData = res.data.reduce((acc, booking) => {
          const courtBookings = acc[booking.courtNo] || {};
          courtBookings[booking.time] = {
            username: booking.username,
            booked: true,
          };
          acc[booking.courtNo] = courtBookings;
          return acc;
        }, {});
        setBookings(bookingsData);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  };

  const handleBooking = async (court, time) => {
    try {
      const userProfileResponse = await axios.post("http://localhost:5000/api/userprofile", {
        email: localStorage.getItem('userEmail'),
      });

      const userProfileData = userProfileResponse.data;
      const user = userProfileData.userData.name;
      console.log(date);
      const bookingData = {
        username: user,
        center,
        sport: sport,
        timeSlot: time,
        Date: date,
        courtNo: court,
        booked: true,
      };

      const bookingResponse = await axios.post("http://localhost:5000/api/Book", bookingData);

      // Update state to reflect booking
      setBookings((prev) => ({
        ...prev,
        [court]: { ...prev[court], [time]: { username: user, booked: true } },
      }));

    } catch (error) {
      console.error("Error booking slot or fetching user profile:", error);
    }
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

