const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq1fqp2.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection
        const menuCollection = client.db('ResturentBoss').collection('menu');
        const ReviewCollection = client.db('ResturentBoss').collection('review');

        // get all menu data api
        app.get('/menu', async (req, res) => {
            const cursor = menuCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // get all review data api
        app.get('/reviews', async (req, res) => {
            const cursor = ReviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// get all api item
app.get('/', (req, res) => {
    res.send('Boss is Running');
})

app.listen(port, () => {
    console.log(`RESTURENT boss is running on port ${port}`);
})

// app.listen(port, () =>{
//     console.log(`RESTURENT boss is running on port ${port}`);
// })
// app.listen(port, () =>{
//     console.log(`RESTURENT boss is running on port ${port}`);
// })
// app.listen(port, () =>{
//     console.log(`RESTURENT boss is running on port ${port}`);
// })
