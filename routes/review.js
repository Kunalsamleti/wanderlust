const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing");
const Review=require("../models/review");
const {isLoggedIn,isauthor}=require("../middleware");
const reviewcontroller=require("../controller/reviews");

router.post("/",isLoggedIn,reviewcontroller.createreview);

router.delete("/:reviewId",isLoggedIn,isauthor,reviewcontroller.destroyreview);

module.exports=router;