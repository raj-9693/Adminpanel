
const mongoose=require("mongoose")

const HomeSchema=new mongoose.Schema({
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
    BannerImage:{type:String, default:null},
    Bridesitem:{type:Number, required:true},
    years:{type:Number, required:true},
    review:{type:String, required:true},
})

const Home=mongoose.model("Home",HomeSchema)

module.exports=Home;