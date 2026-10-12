const express=require("express")

const {PostDeta}=require("../Controllers/Reviewscontrollers")

 const router=express.Router()
 router.post("/PostDeta",PostDeta)

 module.exports=router