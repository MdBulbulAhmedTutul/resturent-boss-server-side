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

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const menuCollection = client.db('ResturentBoss').collection('menu');
        const ReviewCollection = client.db('ResturentBoss').collection('reviews');
        const cartCollection = client.db('ResturentBoss').collection('carts');

        // get all menu data api
        app.get('/menu', async (req, res) => {
            const cursor = menuCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // get all review data api
        app.get('/review', async (req, res) => {
            const cursor = ReviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // cart collection
        app.post('/carts', async(req, res) => {
            const cartItem = req.params;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
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
