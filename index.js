const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.skcpj7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
      await client.connect();
      const courseCollection = client.db("pathagar_db").collection("courses");
      const bookCollection = client.db("pathagar_db").collection("books");

      app.get('/course', async (req, res) => {
        const courses = await courseCollection.find().toArray();
        res.send(courses)
        
    })

      app.get('/book', async (req, res) => {
        const books = await bookCollection.find().toArray();
        res.send(books)
        
    })
  }

  finally {
      // await client.close();
  }
  
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello from pathagar server')
});

app.listen(port, () => {
    console.log('Successfully listening from', port)
});