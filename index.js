import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

// Add your custom port where you want your server to start
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Initial page
app.get("/", async(req, res) => {
    res.render("index.ejs");
  });

//Fetches the result using the API 
app.post("/", async(req, res)=>{
    console.log(req.body);
    const countryName = req.body.country;
    const breweryType = req.body.type;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_country=${countryName}&by_type=${breweryType}`);
        const result = response.data;
        res.render("index.ejs", { content: result[Math.floor(Math.random()*result.length)]});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No breweries found that match your criteria.",
        });
      }
});
  
// Server is started at port 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });