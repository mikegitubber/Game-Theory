const {Center} =require("../Models/Centers")
const View = async (req, res) => {
try{
    console.log(req.query)
    const {center}=req.query
    console.log(req.query)
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

module.exports = { View };
