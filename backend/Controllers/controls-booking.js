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
    const { center } = req.query;
  try {
    const bookings = await Booking.find({ center }).sort({ time: 1 });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching bookings" });
  }
}
const Book = async(req,res)=>{
    const { username, center, sport, timeSlot,Date, courtNo, booked } = req.body;
    try {
      // Create a new booking document
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
