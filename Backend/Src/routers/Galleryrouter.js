const express=require("express")
const {PostDeta, GetDeta}=require("../Controllers/Gallerycontrollers")

const router=express.Router()

router.post("/postDeta",PostDeta)
router.get("/getDeta",GetDeta)

module.exports=router;