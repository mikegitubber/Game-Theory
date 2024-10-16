const { BookingSchema } = require("../Models/BookingSchema");
const {Center} =require("../Models/Centers")
const {ConnectDB} =require("../utils/ConnectDb")
const View = async (req, res) => {
try{
    console.log("hello");
    await ConnectDB.connect();
    const db = ConnectDB.db(Center); 
    const Centers = db.collection('Centers');
    const data=Centers.find({});
    res.json({data});
}
catch(err){
    console.error("Error in Media function:", err);
    res.status(500).json({ error: "Internal Server Error" });
}
};

module.exports = { View };
