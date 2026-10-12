require("dotenv").config()
const app=require("./Src/app")

const RoutesHome=require("./Src/routers/Homerouter")
const Routesgallery=require("./Src/routers/Galleryrouter")
const RoutesServices=require("./Src/routers/Servicesrouter")

const MongoDB=require("./Src/Config/DB")

MongoDB()

app.use("/Api/Home",RoutesHome)
app.use("/Api/gallery",Routesgallery)
app.use("/Api/services",RoutesServices)



app.listen(5000,()=>{
    console.log("server start hua he bahi ")
})