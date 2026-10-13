const mongoose=require("mongoose")

const Reviews = mongoose.Schema({
    
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
})

const Deta = mongoose.model("Reviews",Reviews)

module.exports=Deta;