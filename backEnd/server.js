require('dotenv').config()

const express = require("express");
const app = express();

const passport = require("passport");
const flash = require("connect-flash");
const cors = require("cors");
const fileUpload = require("express-fileupload");




// const auth = require("./src/connection/auth")

const cookieParser = require("cookie-parser");


const path = require("path");

// cloud
const cloudinary = require("cloudinary");

// cloud config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});





const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
 // optionsSuccessStatus: 204, no
  allowedHeaders: [   
    "set-cookie",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials", 
    'Content-Type', 
    // 'Authorization', no
  ],  
};



app.use(cors(corsOptions));
app.use(cookieParser());

// mongodb configuration
// view engine setup
app.set("view engine", "ejs");

// admin route
// const adminRouter = require("./src/routes/admin");


// app.use("/admin", adminRouter);

// app.use(express.json());
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl.startsWith('/payment/webhook')) {
      req.rawBody = buf.toString();
    }
  },
   }));
app.use(express.urlencoded({ extended: false }));



app.use(flash());

path.join(process.cwd(), 'tmp')

app.use(
  fileUpload({
    useTempFiles: true,
    debug: false,
    tempFileDir: "/tmp/"
  })
);









//route importing and mounting
const adminadd = require('./src/routes/admin/add');



const router = express.Router()





router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});



app.use('/admin/add', adminadd)











var port = process.env.PORT || 8000;
app.set("port", port);




app.listen(port, () => {
  console.log("Server running at port " + port);
});

module.exports = app;
