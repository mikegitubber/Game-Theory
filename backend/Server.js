const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT||5000;
const Booking_router =require('./Routes/BookingRoutes.js')
const MongoDB = require('./utils/ConnectDb.js');
const path = require('path');
MongoDB();
app.use(cors());
app.use(express.json())
app.use("/api",Booking_router)
app.use('/api',require('./Routes/Createuser'))
// app.use('/api',require('./Routes/DisplayData'))
// app.use('/api',require('./Routes/OrderData'))
// app.use('/api',require('./Routes/DefaultOrderdata'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})