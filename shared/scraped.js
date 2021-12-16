const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./mongo");

data = ()=>{
  let Amazon =[];
   //fetching amazon website----------------------------->
   axios.get("https://www.amazon.in/s?k=mobiles&i=electronics&rh=n%3A1389432031%2Cp_89%3ARedmi%7CSamsung&dc&qid=1639626195&rnid=3837712031&ref=sr_nr_p_89_2")
   .then(res=>{
    const $ = cheerio.load(res.data);
    let count =0;

//getting required data from html body
  $(".s-asin").each((index,element)=>{
      if(count <10)
      {
      let title = $(element).find("span.a-text-normal").text();
      let image = $(element).find(".aok-relative").children().attr("src");
      let rating = $(element).find(".a-icon-star-small").children().text();
      let price = $(element).find("span.a-text-price").children("span.a-offscreen").text();
      let offerprice = $(element).find("span.a-price-whole").text();
                 
      //to push only elements which are not null 

      if(title !=="" || price !==""||offerprice!=="")
      {
        Amazon[index] = {title,image,rating,price,offerprice};
        count++;
      }
      }
  })
  
  db.mobiles.insertMany(Amazon)
  }).catch(err=>console.log(err));
  
//fetching data from flipcart--------------------------------------------->
  let flipkart =[];
   axios.get("https://www.flipkart.com/search?q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off")
   .then(res=>{
    
       const $ = cheerio.load(res.data);
     let count =0;
     $("._1AtVbE").each((index,element)=>{
        
        
            if(count <10)
            {
               let title = $(element).find("div._4rR01T").text();
               let image = $(element).find("img._396cs4 ").attr("src");
               let rating = $(element).find("div._3LWZlK").text();
               let price = $(element).find("div._3I9_wc").text();
               let offerprice = $(element).find("div._30jeq3").text();
               //to push only elements which are not null
               if(title !=="" || price !==""||offerprice!=="")
              {
                flipkart[count]={image,title,rating,price,offerprice}
                count++;
              }
            }
     })
     db.mobiles.insertMany(flipkart)
   }).catch(err=>console.log(err));

  //fetching data from snapdeal-------------------------------------->
  let snapdeal =[];
  axios.get("https://www.snapdeal.com/search?keyword=mobile%20phone&santizedKeyword=&catId=&categoryId=0&suggested=true&vertical=&noOfResults=20&searchState=&clickSrc=suggested&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=plrty")
  .then(res=>{

      const $ = cheerio.load(res.data);

       let count =0;
          $(".favDp").each((index,element)=>{
       if(count <10)
        {
          let title = $(element).find("p.product-title").text();
           let image = $(element).find(".picture-elem source").attr("srcset");
           let rating = "NA";
           let price = $(element).find("span.product-desc-price").text();
           let offerprice = $(element).find("span.product-price").text();
           //to push only elements which are not null 
           if(title !=="" || price !==""||offerprice!=="")
          {
            snapdeal[count]={title,image,rating,price,offerprice}
            count++;
          }
        }
    })
    db.mobiles.insertMany(snapdeal)
  }).catch(err=>console.log(err));
  
}
module.exports = data;
