const route = require("express").Router();
const db = require("../shared/mongo");

//to get all products
route.get("/", async(req,res)=>{
   
        const data = await db.mobiles.find().toArray();
        res.send(data);
})

//to get products based on search
route.get("/:id", async(req,res)=>{
   
        //regular expression  based on the first letters
        let search = new RegExp(`^`+req.params.id,`i`);
       
        const data = await db.mobiles.find({title:search}).toArray();
        res.send(data);
})


module.exports = route;
