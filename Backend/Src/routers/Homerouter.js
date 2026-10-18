
const express=require("express")

const router=express.Router();
const{PostDeta,GetDeta,UpdateDeta}=require("../Controllers/Homecontrollers")


// router.post("/home", PostDeta);
// router.get("/home", GetDeta);
// router.put("/home", UpdateDeta);

router.post("/postDeta",PostDeta)
router.get("/getDeta",GetDeta)
router.put("/putDeta",UpdateDeta)

module.exports = router;