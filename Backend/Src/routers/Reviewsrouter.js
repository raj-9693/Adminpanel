const express=require("express")

const {PostDeta, GetDeta}=require("../Controllers/Reviewscontrollers")

 const router=express.Router()
 router.post("/postDeta",PostDeta)
 router.get("/getDeta",GetDeta)

 module.exports=router