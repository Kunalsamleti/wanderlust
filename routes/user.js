const express=require("express");
const router=express.Router();
const User = require("../models/user");
const passport=require("passport");
const {savedirectUrl}=require("../middleware");
const usercontroller=require("../controller/users");

router.route("/signup")
.get(usercontroller.rendersignuppage)
.post(usercontroller.signup);

router.route("/login")
.get(usercontroller.renderloginpage)
.post(savedirectUrl,passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true }),usercontroller.login);

router.get("/logout",usercontroller.logout);
module.exports=router;