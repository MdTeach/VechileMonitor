var express = require('express');
var Vehicle = require('../models/vehicle');
var mid = require('../middleware/index');
var router = express.Router();

//Include data model vehicle
var Vehicle = require('../models/vehicle');

router.get('/', function (req, res) {
    res.render('home');
});

// GET /profile
router.get('/vehicle', mid.requiresLogin, function(req, res, next) {
    Vehicle.findById(req.session.Id)
        .exec(function (error, data) {
          if (error) {
            return next(error);
          } else {
            return res.render('vehicle', { data:data});
          } 
        });
});
  
//Get / render register page
router.get('/register', function(req, res){
    return res.render('register');
});

//Post / send data from register page
router.post('/register', function(req, res, next){
    const name = req.body.name;
    const number = req.body.number;
    const type = req.body.type;
    
    if(name && number && type){
        // create object with form input
        var vData = {
            name: name,
            number: number,
            v_type: type
        };

        // use schema's `create` method to insert document into Mongo
        Vehicle.create(vData, function (error, data) {
            if (error) {
                return res.sed("error");
            } else {
                return res.send('Done sucessfully');
            }
        });

    }
});

// /GET login/ => Login  form
router.get('/login',function(req,res,next){
    return res.render('login');
});

// /POST login/ => Login  form / Authenticate the input against db
router.post('/login',function(req,res,next){
    const name = req.body.name;
    const number = req.body.number;
    if(name && number){
        //TODO: Authetication
        Vehicle.authenticate(number, function(err, data){
            if (err || !data) {
                var err = new Error('Wrong input.');
                err.status = 401;
                return next(err);
            }else{
                req.session.Id = data._id;
                return res.send('Log in sucessfull');
            }
        });
    }else{
        res.redirect('/login');
    }
});

// GET profiles/ => show the lists of registered vehicles
router.get('/profiles', (req,res,next)=>{
    Vehicle.find({}, function (err, data) {
        if (err) {
            return next(err);
        } else {
            console.log(data);
            console.log(err);
            return res.render('user_list',{data});
        }
    });
});

// GET details/ show the details about the vehicle
router.get('/details',(req,res,next)=>{
    const number = req.query.number;
    if(!number){
        return res.redirect('/profiles');    
    }else{
        Vehicle.findOne({ number:number}, function(err, data) {
            if (err) {
                return next(err);
            } else {
                if (!data) {
                    return res.send('Data not found :(');
                } else {
                    console.log(data);
                    return res.render('user_profile', { data: data });
                }
            }
        });
    }
});

module.exports = router;
