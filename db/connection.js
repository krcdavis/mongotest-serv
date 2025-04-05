import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "aaa";
//you're not supposed to use quotes in the env file what ok

console.log(URI);

const dbn = process.env.DBN || "eposts";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
//console.log(URI);
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

//this
let db = client.db(dbn);

export default db;