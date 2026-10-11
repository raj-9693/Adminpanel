
const mongoose=require("mongoose")

const HomeSchema=new mongoose.Schema({
    titalPrime:{type:String, default:null},

    titalTech:{type:String, require:true},

    titalBase:{type:String,require:true},

    BannerImage:{type:String,require:null},

    Bridesitem:{type:Number, require:true},

    years:{type:Number , require:true},

    review:{type:String, require:true},


})

const Home=mongoose.model("Home",HomeSchema)

module.exports=Home;