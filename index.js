require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.port || 5000;
const app = express();

// middleware
app.use(express.json());
app.use(cors());




app.get("/", (req,res)=>{
    res.send("This is Game Heist Server")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pv5o1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


    

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const gameCollection = client.db("GameHeist").collection("games");
    const defaultgameCollection =client.db("GameHeist").collection("defaultGames");
    const userCollection = client.db("GameHeist").collection("users");

    // game collection api

    app.get('/users',async(req,res)=>{
       const cursor = userCollection.find();
       const result = await cursor.toArray();
       res.send(result);
    })
    app.post('/users',async(req,res)=>{
       const user = req.body;
       const result = await userCollection.insertOne(user);
       res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})