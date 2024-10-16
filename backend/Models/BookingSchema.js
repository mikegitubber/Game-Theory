const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const BookingSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    center:{
        type:String,
        require:true,
    },
    sport:{
        type:String,
        require:true,
    },
    timeSlot:
    {
        type: String,
        require:true ,
    },
    Date:
    {
        type: Date,
        require:true
    },
    courtNo:{
        type: Number,
        required: true
    },
    booked:{
        type:Boolean,
        require:true,
    }
})

const Booking = new mongoose.model("Booking",BookingSchema);
module.exports = {Booking};