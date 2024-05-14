const Listing=require("./models/listing");
const Review=require("./models/review");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        // req.flash("error","Please login to wanderlust");
        return res.redirect("/login");
    }
    next();
}
module.exports.savedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list.owner._id.equals(res.locals.curruser._id)){
        // req.flash("error","you are not owner of this place");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isauthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        // req.flash("error","you are not author of this review");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}