import express from "express";
import actions from "./action.js"

const app = express();

app.set("view engine" , "ejs" )
app.set("views","views")

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/api",actions);


const port=4001;

app.listen(port,function(){
    console.log(`server is running on port ${port}`)
})