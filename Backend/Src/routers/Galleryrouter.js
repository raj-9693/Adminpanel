const express=require("express")

const router=express.Router()
const {PostDeta}=require("../Controllers/Homecontrollers")

router.get("/postDeta",PostDeta)

module.exports=router;