const mongoose=require("mongoose");
const initdata=require("./data");
const Listing=require("../models/listing");

main().then(()=>{console.log("run successfully")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'6627bf2b0262ba1a3a446292'}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initDb();