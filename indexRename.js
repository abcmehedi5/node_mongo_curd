const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abcmehedi5:WD1kd4J7lElqvmJN@cluster0.mbjz2.mongodb.net/?retryWrites=true&w=majority";
// const password = 'WD1kd4J7lElqvmJN'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))  //for use in the form

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const productcollection = client.db("organicdb").collection("products");
  // Data Send in Database start......

  app.post('/addProduct', (req, res) => {
    const product = req.body
    productcollection.insertOne(product)
      .then(result => {
        console.log(" one product added sucessfull")
      })

    res.send('sucess')
  })

  // Data Send in Database end......


  // Data read in Database start........

  app.get('/products', (req, res) => {
    productcollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  // Data read in Database end........



  // data delete in dtabase start........


  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    productcollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {

      })
  })


  // data delete in dtabase end........


  app.get('/product/:id', (req, res) => {
    productcollection.find({ _id: ObjectId(req.params.id) })
      .toArray((arr, document) => {
        res.send(document[0])
      })
  })

  app.patch('/update/:id', (req, res) => {
      productcollection.updateOne({ _id: ObjectId(req.params.id) },
        {
          $set: { name: req.body.name, price: req.body.price, quantity: req.body.quantity }
        })

        .then(result => {
          console.log(result)
        })
  })

})

app.listen(port, () => {
  console.log("listen workings")
})
