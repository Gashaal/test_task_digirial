'use strict';

const
  express = require('express'),
  router = express.Router(),
  MongoClient = require('mongodb').MongoClient,
  dbUrl = 'mongodb://localhost:27017/digirial';
  
let data = [
  [1,0,0,1],
  [0,0,0,0],
  [0,0,0,0],
  [1,0,0,1]
];

function insertInitData(db, cb) {
  db.collection('items').insert({_id: 'test_items', data: data}, (err, results) => {
    if (err) {
      console.log(err);
      return cb(new Error());
    }
    
    cb(null);
  });
}
  
router.route('/')
  .get((req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
      db.collection('items').findOne({_id: 'test_items'}, (err, item) => {
        if (!item) {
          insertInitData(db, (err, results) => {
            res.json(data);
          })
        } else {
          res.json(item.data);
        }
        
        db.close();
      });
    });
  })
  .post((req, res, next) => {
    let reqData = req.body.data;
    
    if (!req.body.data) {
      return next(new Error('No data param'));
    }
    
    try {
      data = JSON.parse(reqData);
    } catch (e) {
      return next(new Error('Data param has wrong format'));
    }
    
    MongoClient.connect(dbUrl, (err, db) => {
      db.collection('items').findOne({_id: 'test_items'}, (err, item) => {
        if (item) {
          db.collection('items').updateOne({_id: 'test_items'}, {$set: {data: data}}, err => {
            res.send('OK');
          });
        } else {
          db.collection('items').insert({_id: 'test_items', data: data}, err => {
            res.send('OK');
          });
        }
      });
    });
  });

module.exports = router;
