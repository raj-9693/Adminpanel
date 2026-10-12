const express= require("express")

const {PostDeta}=require("../Controllers/Servicescontrollers")


const router=express.Router()

router.post("/PostDeta",PostDeta)

module.exports=router ; 

