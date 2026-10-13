const mongoose = require("mongoose")

const GallerySchema = new mongoose.Schema({

    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},

})
const Gallery=mongoose.model("Gallery",GallerySchema)
module.exports=Gallery;
