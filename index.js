const express = require('express');
const app = express();
const port = 3000;
// const password = 'WD1kd4J7lElqvmJN'
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abcmehedi5:WD1kd4J7lElqvmJN@cluster0.mbjz2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

client.connect(err => {
  const studentCollection = client.db("college").collection("data");
  // student insert to data base start
  app.post("/addStudent", (req, res) => {
    const student = req.body
    studentCollection.insertOne(student)
      .then(result => {
        console.log(" 1 user added")
      })
    res.redirect('/') //reload
  })
  // student data insert to database end

  // student data read to database start

  app.get('/students', (req, res) => {
    studentCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })
  // student data read to database end

  // student data delete to database start

  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    studentCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
    // student data delete to database end

    // student data update single load data to database start
    .get('/student/:id', (req, res) => {
      studentCollection.find({ _id: ObjectId(req.params.id) })
        .toArray((arr, document) => {
          res.send(document[0]);
        })
    })
  // student data update single load data to database end

  app.patch('/update/:id', (req, res) => {
    studentCollection.updateOne({ _id: ObjectId(req.params.id) },
      {
        $set: { name: req.body.name, roll: req.body.roll, department: req.body.department, shift: req.body.shift }
      })
      .then(result => {

      })

  })
});


app.listen(port, () => {
  console.log("listen workings")
})