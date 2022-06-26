const express = require('express')
const cors = require('cors')
const app = express()
const port = 7000
const ObjectID = require('bson-objectid');
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    next()
    // res.send(200)
  } else {
    next()
  }
}
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(allowCrossDomain)
app.use(cors({ origin: true, credentials: true }));

// 一覧表示 getで受信
app.get('/', (req, res) => {
  client.connect(err => {
    const collection = client.db("todo").collection("task");
    collection.find().toArray(function(err, result) {
      // view側へ値を送信
      res.send(result)
      client.close();
    });
  });
})
// update postで受信
app.post('/todo/update', (req, res) => {
  var where = {
    name: req.body.name,
    calories: req.body.calories,
    fat: req.body.fat,
    carbs: req.body.carbs,
  }
  var whereId = ObjectID(req.body._id);
    client.connect(err => {
            const collection = client.db("todo").collection("task");
        collection.findOneAndUpdate({_id : whereId}, {$set: where}, false);
    });
})
// inser postで受信
app.post('/todo/insert', (req, res) => {
  var where = req.body;
    client.connect(err => {
        const collection = client.db("todo").collection("task");
        collection.insertOne(where);
    });
})
// delete postで受信
app.post('/todo/delete', (req, res) => {
  var whereId = ObjectID(req.body._id);
    client.connect(err => {
        const collection = client.db("todo").collection("task");
        collection.deleteOne({_id : whereId});
    });
})

const { MongoClient, LoggerLevel, ObjectId } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
