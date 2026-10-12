const express=require("express")

const {detaload}=require("../Controllers/Aboutcontrollers")

const router=express.Router();
router.post("/postDeta",detaload)

module.exports={detaload}
