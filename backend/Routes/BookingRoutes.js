const express = require("express");
const authcontrol =require("../Controllers/controls-booking")
const Booking_router= express.Router();
// diary_router.route('/Book').post( authcontrol.Write);
Booking_router.route('/View').get(authcontrol.View);
Booking_router.route('/Book').post(authcontrol.Book);
Booking_router.route('/Booked').get(authcontrol.Booked);
module.exports = Booking_router;