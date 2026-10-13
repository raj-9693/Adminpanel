const mongoose=require("mongoose")

const Services=new mongoose.Schema({

    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},

    // services cards (3 cards ka array)
    cards: [
      {
        eyebrow: { type: String, required: true },
        tital: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        features: { type: [String], required: true },
        popular: { type: Boolean, default: false },
      },
    ],
    //table card (4)
 tableRows: [
      {
        label: { type: String, required: true },
        values: { type: [Boolean], required: true },
        order: { type: Number, default: 0 },
      },
    ],
})

const ServicesDeta=mongoose.model("Services",Services)

module.exports=ServicesDeta;