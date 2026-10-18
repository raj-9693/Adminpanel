const express=require("express")
const {PostDeta}=require("../Controllers/Bottemcontrollers")

const router=express.Router()
router.post("/postDeta",PostDeta)

module.exports=router;