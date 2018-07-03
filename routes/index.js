var express = require('express');
var router = express.Router();

//mongodb
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/blog");
var Schema = mongoose.Schema;
var User = new Schema({
  name:String,
  email:String,
  age:String
});
var myModel = mongoose.model('user',User);

//查

/* GET home page. */
router.get('/', function(req, res, next) {
  myModel.find({},{age:"18"},function(error,result){
    if(!error) {
      res.send(result);
    }else{
      res.send(error);
    }
  });
});

//增

router.get('/add',function(req, res ,next) {
  var name = req.query.name;
  var email = req.query.email;
  var age = req.query.age;
  var record = {
    name,
    email,
    age
  };
  myModel.create(record,function(error,result) {
    if(!error){
      res.send(result);
    }else {
      res.send(error)
    }
  });
  // record.save(function(err,user){
  //   res.send(user);
  // }); 
});

//删

router.get('/delete',function(req, res, next) {
  var id = req.query.id;
  var condition = {_id:id};
  myModel.remove(condition,function(error,result) {
    if(!error) {
      res.send("删除成功");
    }else {
      res.send(error);
    }
  });
});

//改

router.get('/update',function(req, res, next) {
  var conditions = {_id: req.query.id};
  var updates = {$set: {name:req.query.name}};
  myModel.update(conditions,updates,function(error,result) {
    if(!error) {
      console.log(result);
    }
  });
  myModel.findOne(conditions,function(error,result) {
    if(!error) {
      res.send(result);
    }else {
      res.send(error);
    }
  });
});

router.get('/findbyid',function(req,res,next) {
  myModel.findById(req.query.id,function(error,result) {
    if(!error) {
      res.send(result);
    }else {
      res.send(error);
    }
  });
});

router.get('/find',function(req,res,next) {
  myModel.find({age:{$exists:false}},function(error,result) {
    if(!error) {
      var data = {};
      data.data = result;
      data.length = result.length;
      res.send(data);
    }else {
      res.send(error);
    }
  });
});
module.exports = router;
