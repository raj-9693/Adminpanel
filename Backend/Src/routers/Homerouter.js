
const express=require("express")

const router=express.Router();
const{PostDeta}=require("../Controllers/Homecontrollers")

router.post("/postDeta",PostDeta)

module.exports = router;