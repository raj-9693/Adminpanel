require("dotenv").config();
const app = require("./Src/app");
const cors = require("cors");

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

// CORS: local dev + deployed frontend dono allow karo
// Render dashboard mein CORS_ORIGIN env var set karo — comma-separated URLs
// Example: https://saanjh-admin.vercel.app,https://saanjhbeauty.in
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman / server-to-server calls mein origin undefined hota hai — allow karo
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use("/Api/home",     RoutesHome);
app.use("/Api/gallery",  Routesgallery);
app.use("/Api/services", RoutesServices);
app.use("/Api/about",    RoutesAbout);
app.use("/Api/contact",  RoutersContact);
app.use("/Api/booking",  RoutersBooking);
app.use("/Api/reviews",  RouterReviews);
app.use("/Api",          RouterImage);
app.use("/Api/bottem",   RouterBottem);

// Health check — Render is endpoint ko ping karta hai server live check ke liye
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Render apna PORT env variable inject karta hai — usse use karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} par`);
});
