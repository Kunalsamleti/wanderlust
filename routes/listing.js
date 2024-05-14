const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const {isLoggedIn,isowner}=require("../middleware");
const listingcontroller=require("../controller/listings");
const multer=require("multer");
const {storage}=require("../cloudConfig");
const upload = multer({ storage });

router.route("/")
.get(listingcontroller.index)
.post(upload.single('listing[image]'),listingcontroller.createnewlisting);
// isLoggedIn

router.get("/new",listingcontroller.rendernewform);
// ,isLoggedIn

router.route("/:id")
.get(listingcontroller.showlisting)
.put(upload.single('listing[image]'),listingcontroller.updatelisting)
// isLoggedIn,isowner,
.delete(listingcontroller.destroylisting);
// isLoggedIn,isowner,

router.get("/:id/edit",listingcontroller.rendereditform)
// ,isLoggedIn,isowner
module.exports=router;
