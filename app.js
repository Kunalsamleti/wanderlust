if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

// console.log(process.env.SECRET) ;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=8080;
const Listing=require("./models/listing");
const Review=require("./models/review");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");
const listings=require("./routes/listing");
const reviews=require("./routes/review");
const userroute=require("./routes/user");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User = require("./models/user");
const { register } = require("module");
const multer=require("multer");
const upload = multer({ dest: 'uploads/' })
const mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const atlas_url=process.env.ATLASDB


// console.log(atlas_url);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
main().then(()=>{console.log("run successfully")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

// const store= MongoStore.create({
//     mongoUrl: atlas_url,
//     crypto:{
//         secret:"secretecode"
//     },
//     touchAfter: 24 * 3600
//   })

//   store.on("error",(err)=>{console.log("error in mongostore session",err)});

// const sessionoption={
//     // store,
//     secret:"secretecode",
//     resave:false,
//     saveUninitialized:true,
//     cookie:{
//         expires:Date.now()+7*24*60*60*1000,
//         maxAge:7*24*60*60*1000,
//         httpOnly:true,
//     },
// }
// app.use((req,res,next)=>{
//     res.locals.success=req.flash("success");
//     res.locals.error=req.flash("error");
//     // res.locals.curruser=req.user;
//     next();
// })
// app.use(session(sessionoption));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



app.listen(8080,()=>{
    console.log("app is listening to port 8080");
})

app.get("/",(req,res)=>{
    res.send("hey server is working");
})



// app.get("/user",async(req,res)=>{
//     let user1=new User({
//         email:"student1@gmail.com",
//         username:"student1",
//     })
//     let registeruser=await User.register(user1,"student@@");
//     res.send(registeruser);
// })
app.use("/listings",listings);
app.use("/listings/:id/review",reviews);
app.use("/",userroute);

app.all("*",(req,res,next)=>{
    next(new ExpressError(405,"page not found!"));
})
app.use((err,req,res,next)=>{
    let{ statuscode,message }=err;
    res.status(statuscode).render("listings/error.ejs",{err});
})















































































































































































































































































// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");
// const methodOverride = require("method-override");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

// //Index Route
// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// });

// //New Route
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// //Show Route
// app.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });

// //Create Route
// app.post("/listings", async (req, res) => {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// });

// //Edit Route
// app.get("/listings/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// });

// //Update Route
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });

// //Delete Route
// app.delete("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });

// // app.get("/testListing", async (req, res) => {
// //   let sampleListing = new Listing({
// //     title: "My New Villa",
// //     description: "By the beach",
// //     price: 1200,
// //     location: "Calangute, Goa",
// //     country: "India",
// //   });

// //   await sampleListing.save();
// //   console.log("sample was saved");
// //   res.send("successful testing");
// // });

// app.listen(8080, () => {
//   console.log("server is listening to port 8080");
// });



