import express from "express";
import cors from "cors";

const app = express();

const opts = {
  origin: ["http://localhost:5173"], 
//process.env.ORG || "http://localhost:5173/"
  methods: ["POST", "GET"],
  credentials: true};

app.use(cors(opts));
app.use(express.json());

//i've gutted the records stuff from the tutorial and put it all here...

const PORT = process.env.PORT || 5545;
const dbn = process.env.DBN || "dbname";//not used here...
const colln = "board1";
//collection == board, so the board name to use in query will actually need to be passed in

// This; dbname is specified and used here
import db from "./connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

const router = express.Router();


// start the Express server
app.listen(PORT, () => {
  console.log(`server running? you'd better catch it!! ${PORT}`);
});


app.get("/", async (req,res) => {
//board name would be req.params.board i guess
  let collection = await db.collection(colln);//also this
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//this but with queries

//for a board, group posts by threadid.
//next, get x most recent threads/most recently updated threads...
//needs let's say 2 boards with 2 threads each

//returns unique threadids from specified board...
app.get("/a/", async (req,res) => {
//board name would be req.params.board i guess
  let collection = await db.collection(colln);//also this

const grope = {$group: {_id: "$threadid"} };//yatta
  let results = await collection.aggregate([grope]).toArray();

//console.log(results);//[ { _id: 12345 }, { _id: 52345 } ]

//next, use results to get all posts in a given thread, and return the block of results. for i in res, i._id
//sort posts in thread by id. op post should always be first anyway
  //let result2 = await collection.find({threadid == i._id}).sort({_id: 1}).toArray();

//return a dictionary of arrays like-
//{threadid1: [{postdata1},{postdata2}], threadid2:[{postdata3},{postdata4}]}

  res.send(results).status(200);
});

