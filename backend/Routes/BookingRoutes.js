const express = require("express");
const authcontrol =require("../Controllers/controls-booking")
const Booking_router= express.Router();
// diary_router.route('/Book').post( authcontrol.Write);
Booking_router.route('/View').get(authcontrol.View);
module.exports = Booking_router;