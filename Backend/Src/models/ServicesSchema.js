const mongoose=require("mongoose")

const Services=new mongoose.Schema({

    titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},
})

const ServicesDeta=mongoose.model("Services",Services)

module.exports=ServicesDeta;