const mongoose=require("mongoose")

const contact = mongoose.Schema({
    
    titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},
})

const Deta = mongoose.model("Contact",contact)

module.exports=Deta;