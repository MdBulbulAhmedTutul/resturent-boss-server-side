const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());



// get all api item
app.get('/', (req, res) =>{
    res.send('Boss is Running');
})

app.listen(port, () =>{
    console.log(`RESTURENT boss is running on port ${port}`);
})

// app.listen(port, () =>{
//     console.log(`RESTURENT boss is running on port ${port}`);
// })