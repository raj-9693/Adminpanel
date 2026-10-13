const express= require("express")

const {PostDeta, GetDeta}=require("../Controllers/Servicescontrollers")

const router=express.Router()

router.post("/PostDeta",PostDeta)
router.get("/GetDeta",GetDeta)

module.exports=router;

