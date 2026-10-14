
const express=require("express")

const router=express.Router();
const{PostDeta,GetDeta}=require("../Controllers/Homecontrollers")


// router.post("/home", PostDeta);
// router.get("/home", GetDeta);
// router.put("/home", UpdateDeta);

router.post("/postDeta",PostDeta)
router.get("/getDeta",GetDeta)

module.exports = router;