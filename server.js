const cors = require("cors");
require("dotenv").config();

const express = require("express");

const mongo = require("./shared/mongo");
const scrapdata = require("./shared/scraped");
const productroute = require("./Routes/products");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (request, response) => {
    response.send("WEB-SCRAPING-MOBILES");
  });

server = async()=>{
    
        await mongo.connect();
        await scrapdata();
       
        //Db resets for every 12 hrsi.e,43200*1000;

        setInterval(async() => {
            await scrapdata(); 
            console.log("data reseted sucessfully");
        }, 43200*1000);
         
        //to allow cors
        app.use(cors());

        //to parse data->json
        app.use(express.json());
       
        app.use((req,res,next)=>{
         console.log("MiddleWare Log");
         next();
       })
       
       app.use("/products", productroute)
       app.listen(PORT,()=>{console.log(`App listening at ${PORT}`);})

    }
    
server();

