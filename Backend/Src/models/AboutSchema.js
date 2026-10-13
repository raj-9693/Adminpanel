const mongoose=require("mongoose")

const About = mongoose.Schema({
    
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
})

const Deta = mongoose.model("About",About)

module.exports=Deta;