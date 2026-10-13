const mongoose=require("mongoose")

const contact = mongoose.Schema({
    
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
})

const Deta = mongoose.model("Contact",contact)

module.exports=Deta;