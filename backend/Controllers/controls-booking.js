const {Center} =require("../Models/Centers")
const View = async (req, res) => {
try{
    console.log(req.query)
    const {center,sport}=req.query
    if(sport!=undefined){
        Center.findOne(
            { Name: center }
          )
            .then(center => {
              if (center && center.sport && center.sport.length > 0) {
                const courts = center.sport[0].courts;
                console.log(`Number of courts: ${courts}`);
              } else {
                console.log("Sport not found.");
              }
            })
            .catch(err => {
              console.error("Error fetching data:", err);
            });
    }
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
const Book = async(req,res)=>{
    try{
        console.log(req.query)
        const {center,sport}=req.query
        if(sport!=undefined){
            Center.findOne(
                { Name: center }
              )
                .then(center => {
                  if (center && center.sport && center.sport.length > 0) {
                    const courts = center.sport[0].courts;
                    console.log(`Number of courts: ${courts}`);
                  } else {
                    console.log("Sport not found.");
                  }
                })
                .catch(err => {
                  console.error("Error fetching data:", err);
                });
        }
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
}
module.exports = { View };
