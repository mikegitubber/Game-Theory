// const mongoose =require("mongoose");
// const dotenv = require('dotenv').config();
// const { MongoClient } = require('mongodb');
// const uri_user=process.env.mongoString;
// console.log(uri_user)
// const client = new MongoClient(uri_user, {
   
// });
// const ConnectDB =async()=>{
// try{
//     await client.connect();
//     console.log("connected!");
// }
// catch(err){
//     console.log(err);
// }   
// }

// module.exports = {ConnectDB};



// utils/ConnectDb.js

// utils/ConnectDb.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoString);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
