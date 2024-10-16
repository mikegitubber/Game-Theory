const mongoose = require("mongoose");
const express = require("express");
const CenterSchema =new mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    sport:
    {
        sportname:{
            type:String,
            require:true
        },
        courts:{
            type:String,
            require:true
        }
    },
    image: 
        {
            type:String,
            require:true
        }
})
const Center = new mongoose.model("Center",CenterSchema);
module.exports = {Center};
