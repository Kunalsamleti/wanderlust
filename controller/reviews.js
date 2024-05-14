const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createreview=async(req,res)=>{
    let list=await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review);
    // newreview.author=req.user._id;
    // console.log(newreview);
    list.reviews.push(newreview);
    await newreview.save();
    await list.save();
    console.log("new review added");
    // req.flash("success","review added successfully!");
    res.redirect(`/listings/${list._id}`);
}
module.exports.destroyreview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log("delete review");
    // req.flash("success","review deleted successfully!");
    res.redirect(`/listings/${id}`);
}