module.exports=(fn)=>{
    return (req,res,err)=>{
        fn(req,res,next).catch(err=>next(err));
    };
};