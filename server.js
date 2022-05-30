console.log("'Life is but a dream' is hidden somewhere.")
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://kerlinaugustin:sneakyboi7@yamsuniverse.igt8y.mongodb.net/yamsuniverse?retryWrites=true&w=majority'

// const data = require('./MOCK_DATA.json')

// app.use('/random_destination', (req, res) => {
//   const { city } = data[Math.round(Math.random() * data.length)]
//   const { country } = data[Math.round(Math.random() * data.length)]
//   return res.json({city, country})
// })

MongoClient.connect(url, { useUnifiedTopology: true })
.then(client => {
  const db = client.db('yamsuniverse')
  const quotesCollection = db.collection('quotes')
  
  
  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(bodyParser.json())
  // app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  
  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results })
    })
    .catch(error => console.error(error))
  })
  
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })
  
  app.put("/quotes", (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: "Yoda" },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }
      )
      .then(result => res.json("Success"))
      .catch((error) => console.error(error))
    })
    
    app.delete("/quotes", (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
        )
        .then((result) => {
          console.log(result)
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json(`Deleted Darth Vadar's quote`);
        })
        .catch((error) => console.error(error));
      });
      
      app.listen(3000, (req, res) => {
        console.log('Listen on 3000')
      })
      
    })
    .catch(error => console.error(error))
    