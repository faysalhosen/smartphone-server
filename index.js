const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wzxk65v.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb://127.0.0.1:27017";
console.log(process.env.DB_USERNAME)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db('mobileo');
    const typeCollection = database.collection('types');
    const brandCollection = database.collection('brands');

    app.get('/types', async(req, res) => {
      const options = {projection: {_id: 0, name: 1, icon: 1}};
      const result = await typeCollection.find({}, options).toArray();
      res.send(result);
    })
    app.get('/brands', async(req, res) => {
      const options = {projection: {_id: 0, name: 1, icon: 1, thumbnail: 1}};
      const result = await brandCollection.find({}, options).toArray();
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("Welcome to smartPhone server!");
})
app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
})

module.exports = app;