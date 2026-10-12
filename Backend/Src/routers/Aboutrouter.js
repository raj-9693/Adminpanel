const express=require("express")

const {PostDeta}=require("../Controllers/Aboutcontrollers")

const router=express.Router();
router.post("/postDeta",PostDeta)

module.exports=router
