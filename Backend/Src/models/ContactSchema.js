const mongoose=require("mongoose")

const contact = mongoose.Schema({
    
    titalPrime:{type:String, required:true},
    titalTech:{type:String, required:true},
    titalBase:{type:String, required:true},

    contactCards: [
  {
    type: { type: String, required: true },    // phone, whatsapp, instagram, location, hours (icon ke liye)
    label: { type: String, required: true },   // STUDIO LINE
    value: { type: String, required: true },   // +91 98765 43210
    value2: { type: String },                  // By appointment only (agar dusri line ho)
    note: { type: String },                    // Mondays reserved for our bridal kits
    link: { type: String },                    // tel:, wa.me ya instagram ka link
  },
],
})

const Deta = mongoose.model("Contact",contact)

module.exports=Deta;