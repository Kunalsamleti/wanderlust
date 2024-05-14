const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
const { name } = require("ejs");

const sessionoption={
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(session(sessionoption));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    let {name="kunal"}=req.query;
    req.session.name=name;
    console.log(req.session.name);
    if(name==="kunal"){
        req.flash("error",("user not register yet"))
    }
    else{
        req.flash("success","user register successfully"); 
    }
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name });
    // res.send(`hello ${req.session.name}`);
})
// app.get("/test",(req,res)=>{
//     if(req.session.count){
//         req.session.count++
//     }else{
//         req.session.count=1;
//     }
//     res.send(`session count is ${req.session.count}`);
// })

app.listen(3000,()=>{
    console.log("server is listenning port 3000");
})