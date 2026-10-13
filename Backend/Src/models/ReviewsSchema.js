const mongoose=require("mongoose")

const Reviews = mongoose.Schema({
    
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},
    
    profiles:{type:String,required:false},
    titalheader:{type:String},
    titaldes:{type:String},

    processSteps:[{

     step: { type: String, required: true },   
    title: { type: String, required: true },  
    text: { type: String, required: true },  

    }],
   
      
    artistsCard:[{
        profileImage:{type:String,},

        titalname:{type:String,required:true},

        role:{type:String,required:true},

        years:{type:Number,required:true},

        bio:{type:String,required:true},

        tag:{type:[String],required:true}
    }]


})

const Deta = mongoose.model("Reviews",Reviews)

module.exports=Deta;