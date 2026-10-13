
const express=require("express")

const router=express.Router();
const{PostDeta,GetDeta}=require("../Controllers/Homecontrollers")

router.post("/postDeta",PostDeta)
router.get("/getDeta",GetDeta)

module.exports = router;