const mongoose=require("mongoose")

const Services=new mongoose.Schema({

    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
})

const ServicesDeta=mongoose.model("Services",Services)

module.exports=ServicesDeta;