const express=require("express")

const {PostDeta,GetDeta,UpdateDeta}=require("../Controllers/Contactcontrollers")

 const router=express.Router()
 router.post("/postDeta",PostDeta)
 router.get("/getDeta",GetDeta)
 router.put("/putDeta",UpdateDeta)

 module.exports=router