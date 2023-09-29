const express = require("express");
const cors = require("cors");
const connect = require("./src/configs/db");
require("dotenv").config();
const app = express();
const paymentRoutes = require("./src/controllers/payment");
const productApi = require("./src/controllers/ProductsController");
const passport = require("./src/configs/google-oauth");
const userController = require("./src/controllers/user.controller");
const {
  register,
  login,
  newToken,
} = require("./src/controllers/auth.controller");

app.use(cors());
app.use(express.json());

let port = process.env.PORT || 2345;

// register
app.post("/register", register);
// .login
app.post("/login", login);
app.use("/users", userController);

//payment
app.use("/api/payment/", paymentRoutes);

//product
app.use("/product", productApi);

//google oauth
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);
    return res.redirect(
      `https://aglecha-diamond-frontend.vercel.app/?token=${token}&name=${user.name}&profile=${user.profileImage}`
    );
  }
);

app.get("/auth/google/failure", (req, res) => {
  return res.status(400).json({ msg: "Login Failed" });
});

app.listen(port, async () => {
  try {
    await connect();
    console.log(`server is running on port ${port}`);
  } catch (err) {
    console.error(err.message);
  }
});
