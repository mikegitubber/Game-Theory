const {Center} =require("../Models/Centers")
const {Booking}=require("../Models/BookingSchema")
const View = async (req, res) => {
try{

    const {center}=req.query

    if(center!=undefined){
        const data= await Center.find({Name:center});
    return res.json(data);
    }
    const data= await Center.find();
    // console.log(data);
    res.json(data);
}
catch(err){
    console.error("Error in Media function:", err);
    res.status(500).json({ error: "Internal Server Error" });
}
};
const Booked = async (req,res)=>{
    const { center, sport, date } = req.query; // Capture the center and sport from the request query

    try {
      // Fetch all bookings for the selected center and sport
      const bookings = await Booking.find({ center, sport,date }).sort({ time: 1 });
        
      return res.status(200).json(bookings); // Send the bookings data in the response
    } catch (error) {
    //   console.error(error);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
}
const Book = async(req,res)=>{
    const { username, center, sport, timeSlot,Date, courtNo, booked } = req.body;
    // const existingBooking = await Booking.findOne({ courtNo, timeSlot, Date });

    // if (existingBooking) {
    //   res.status(400).json({ error: "This slot is already booked." });
    // }
    try {
      const newBooking = new Booking({
        username,
        center,
        sport,
        timeSlot,
        Date,
        courtNo,
        booked,
      });
  
      await newBooking.save();
      res.json({ message: "Booking successful" });
    } catch (error) {
      res.status(500).json({ error: "Error booking the slot" });
    }
}

const Dash=  async (req, res) => {
    const username = decodeURIComponent(req.query.username);
    console.log("Received decoded username:", username);
    try {
        const userBookings = await Booking.find({ username: username });
        console.log(userBookings)
        res.status(200).json(userBookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }

};

module.exports = { View ,Book,Booked,Dash};
