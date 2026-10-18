require("dotenv").config()
const app=require("./Src/app")

const RoutesHome=require("./Src/routers/Homerouter")
const Routesgallery=require("./Src/routers/Galleryrouter")
const RoutesServices=require("./Src/routers/Servicesrouter")
const RoutesAbout=require("./Src/routers/Aboutrouter")
const RoutersContact=require("./Src/routers/ContactRouter")
const RoutersBooking=require("./Src/routers/Bookingrouter")
const RouterReviews=require("./Src/routers/Reviewsrouter")
const RouterImage=require("./Src/routers/uploadRouter")
const RouterBottem=require("./Src/routers/Bottemrouter")

const MongoDB=require("./Src/Config/DB")

MongoDB()

app.use("/Api/Home",RoutesHome)
app.use("/Api/gallery",Routesgallery)
app.use("/Api/services",RoutesServices)
app.use("/Api/about",RoutesAbout)
app.use("/Api/contact",RoutersContact)
app.use("/Api/booking",RoutersBooking)
app.use("/Api/Reviews",RouterReviews)
app.use("/Api",RouterImage)
app.use("/Api/bottem",RouterBottem)



app.listen(5000,()=>{
    console.log("server start hua he bahi ")
})