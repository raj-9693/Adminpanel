require("dotenv").config();
const app = require("./Src/app");
const cors = require("cors");

// 1. CORS Configuration (Localhost aur Render/Vercel dono ke liye safe)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman ya server-to-server calls mein origin undefined hota hai — allow karo
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

// Routers
const RoutesHome     = require("./Src/routers/Homerouter");
const Routesgallery  = require("./Src/routers/Galleryrouter");
const RoutesServices = require("./Src/routers/Servicesrouter");
const RoutesAbout    = require("./Src/routers/Aboutrouter");
const RoutersContact = require("./Src/routers/ContactRouter");
const RoutersBooking = require("./Src/routers/Bookingrouter");
const RouterReviews  = require("./Src/routers/Reviewsrouter");
const RouterImage    = require("./Src/routers/uploadRouter");
const RouterBottem   = require("./Src/routers/Bottemrouter");

const MongoDB = require("./Src/Config/DB");
MongoDB();

// API Routes
app.use("/Api/home",     RoutesHome);
app.use("/Api/gallery",  Routesgallery);
app.use("/Api/services", RoutesServices);
app.use("/Api/about",    RoutesAbout);
app.use("/Api/contact",  RoutersContact);
app.use("/Api/booking",  RoutersBooking);
app.use("/Api/reviews",  RouterReviews);
app.use("/Api",          RouterImage);
app.use("/Api/bottem",   RouterBottem);

// Health check route
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} par`);
});