const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    const allList=await Listing.find();
    res.render("listings/index.ejs",{allList});
}

module.exports.rendernewform=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!list){
        // req.flash("error","List you requested does not exit!");
        res.redirect("/listings");
    }
    // console.log(list);
    res.render("listings/show.ejs",{list});
}
module.exports.createnewlisting=async (req, res) => {
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    // console.log(req.body.listing);
    // newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let save=await newListing.save();
    console.log(save);
    // req.flash("success","New List added!");
    res.redirect("/listings");
}
module.exports.rendereditform=async(req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list){
        // req.flash("error","List you requested does not exit!");
        res.redirect("/listings");
    }
    let originimage_url=list.image.url;
    originimage_url=originimage_url.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{list, originimage_url});
}
module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
   let list=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        list.image={url,filename};
        await list.save();
    }
    // req.flash("success","List updated successfully!");
    res.redirect(`/listings/${id}`);
}
module.exports.destroylisting=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    // req.flash("success","List deleted successfully!");
    res.redirect("/listings");
}