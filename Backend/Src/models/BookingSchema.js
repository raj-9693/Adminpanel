const mongoose = require("mongoose")

const Booking=mongoose.Schema({

    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
    
})

const deta=mongoose.model("Booking",Booking)

module.exports=deta;