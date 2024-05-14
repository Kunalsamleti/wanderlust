const User = require("../models/user");
module.exports.rendersignuppage=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    let {username,email,password}=req.body;
    const newuser=new User({  email,username });
    let registeruser=await User.register(newuser,password);
    console.log(registeruser);
    req.logIn(registeruser,(err)=>{
        if(err){
            return next(err);
        }
        // req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");
    })
}
module.exports.renderloginpage=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login=async(req,res)=>{
    // req.flash("success","welcome back to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        // req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}