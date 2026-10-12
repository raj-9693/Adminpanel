const express= require("express")

const {Services}=require("../Controllers/Servicescontrollers")


const router=express.Router()

router.post("/PostDeta",Services)

module.exports=router;

