import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../Constants/UserContext"; // Import UserContext to get center and sport

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
                disabled={bookings[court] && bookings[court][time]} // Disable if already booked
              >
                {bookings[court] && bookings[court][time] ? (
                  <span>Booked by: {bookings[court][time].username}</span> // Display booked user's name
                ) : (
                  <span>Available</span> // Display available if no booking
                )}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Slider = ({ selectedDate }) => {
  const [date, setDate] = useState(selectedDate || new Date()); // Set the initial date
  const [sports, setSports] = useState([]); // Store available sports
  const [courts, setCourts] = useState([]); // Store available courts for the selected sport
  const [bookings, setBookings] = useState({}); // Store booking data
  const timeslots = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"]; // Define available time slots
  const { center, sport, setGame } = useContext(UserContext); // Get center and sport from context

  // Fetch sports and initial court bookings when the page loads
  useEffect(() => {
    if (center) {
      axios
        .get(`http://localhost:5000/api/View?center=${center}`)
        .then((res) => {
          const centerSports = res.data[0].sports;
          setSports(centerSports);
          
          // Set initial sport if not already selected
          if (!sport) {
            setGame(centerSports[0]?.sportname); // Default to the first sport
          }
          
          // Fetch courts and bookings for the default or selected sport
          fetchCourtsAndBookings(sport || centerSports[0]?.sportname);
        })
        .catch((err) => {
          console.error("Error fetching sports data:", err);
        });
    }
  }, [center]);

  // Fetch courts and bookings when sport or date changes
  useEffect(() => {
    if (sport) {
      fetchCourtsAndBookings(sport);
    }
  }, [sport, center]);

  // Function to fetch courts and bookings for the selected sport
  const fetchCourtsAndBookings = (selectedSport) => {
    sports.forEach((game) => {
      if (game.sportname === selectedSport) {
        setCourts(Array.from({ length: game.courts }, (_, i) => i + 1)); // Generate court numbers based on the selected sport
      }
    });

    axios
      .get(`http://localhost:5000/api/Booked?center=${center}&sport=${selectedSport}&date=${date}`)
      .then((res) => {
        const bookingsData = res.data.reduce((acc, booking) => {
          const courtNo = booking.courtNo;
          const time = booking.time;
          const username = booking.username;

          // Initialize court if it doesn't exist yet
          if (!acc[courtNo]) {
            acc[courtNo] = {};
          }

          // If the slot is not already booked, store the booking
          if (!acc[courtNo][time]) {
            acc[courtNo][time] = {
              username: username,
              booked: true,
            };
          }

          return acc;
        }, {});
        setBookings(bookingsData); // Update the state with the bookings
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  };

  // Handle booking by sending the selected court and time to the backend
  const handleBooking = async (court, time) => {
    try {
      const userProfileResponse = await axios.post("http://localhost:5000/api/userprofile", {
        email: localStorage.getItem("userEmail"),
      });

      const userProfileData = userProfileResponse.data;
      const user = userProfileData.userData.name;

      const bookingData = {
        username: user,
        center,
        sport,
        timeSlot: time,
        Date: date,
        courtNo: court,
        booked: true,
      };

      // Send booking data to the backend
      await axios.post("http://localhost:5000/api/Book", bookingData);

      // Update the state to reflect the new booking
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
      {/* Dropdown to select sport */}
      <div className="mb-4">
        <label htmlFor="sport" className="font-semibold">
          Select Sport:
        </label>
        <select
          id="sport"
          className="ml-2 p-2 border"
          value={sport}
          onChange={(e) => setGame(e.target.value)} // Change sport when a new sport is selected
        >
          {sports.map((sport, idx) => (
            <option key={idx} value={sport.sportname}>
              {sport.sportname}
            </option>
          ))}
        </select>
      </div>

      {/* Display the booking schedule */}
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
