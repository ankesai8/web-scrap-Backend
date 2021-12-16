const {MongoClient} = require("mongodb");
const client =  new MongoClient(process.env.URL);
//const URL = "mongodb://localhost:27017" 
let mongo = {
    db:null,
    mobiles:null,
    async connect(){
        try{
             //connect mongodb to SERVER-8080
        await client.connect();
        this.db = client.db(process.env.DATA_BASE);
        this.mobiles=this.db.collection("mobiles");
        }
        catch(err)
        {
            console.log(err);
        }
    } 
}

module.exports = mongo;
