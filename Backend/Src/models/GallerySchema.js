const mongoose = require("mongoose")

const GallerySchema = new mongoose.Schema({

    titalPrime:{type:String,default:null},
    titalTech:{type:String,require:true},
    titalBase:{type:String, require:true},




})
const Gallery=mongoose.model("Gallery",GallerySchema)
module.exports=Gallery;
