require("dotenv").config()
const app=require("./Src/app")
const authRoutes=require("./Src/routers/Homerouter")
const MongoDB=require("./Src/Config/DB")

MongoDB()

app.use("/Api/Home",authRoutes)


app.listen(5000,()=>{
    console.log("server start hua he bahi ")
})