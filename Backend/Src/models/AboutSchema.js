const mongoose=require("mongoose")

const About = mongoose.Schema({
    
    titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},
})

const Deta = mongoose.model("About",About)

module.exports=Deta;