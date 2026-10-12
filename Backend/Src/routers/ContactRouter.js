const express=require("express")

const {PostDeta}=require("../Controllers/Contactcontrollers")

 const router=express.Router()
 router.post("/PostDeta",PostDeta)

 module.exports=router