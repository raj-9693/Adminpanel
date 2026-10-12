const mongoose = require("mongoose")

const Booking=mongoose.Schema({

     titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},
    
})

const deta=mongoose.model("Booking",Booking)

module.exports=deta;