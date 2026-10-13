const express=require("express")
const {PostDeta}=require("../Controllers/Gallerycontrollers")

const router=express.Router()


router.post("/postDeta",PostDeta)

module.exports=router;