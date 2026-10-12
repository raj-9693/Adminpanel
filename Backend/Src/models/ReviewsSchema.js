const mongoose=require("mongoose")

const Reviews = mongoose.Schema({
    
    titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},
})

const Deta = mongoose.model("Reviews",Reviews)

module.exports=Deta;