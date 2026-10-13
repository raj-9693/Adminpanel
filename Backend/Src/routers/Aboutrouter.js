const express=require("express")

const {PostDeta,GetDeta}=require("../Controllers/Aboutcontrollers")

const router=express.Router();
router.post("/postDeta",PostDeta)
router.get("/getdeta",GetDeta)

module.exports=router
