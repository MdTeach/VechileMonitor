var express = require('express');
var router = express.Router();

//Include data model vehicle
var Vehicle = require('../models/vehicle');

router.get('/', function (req, res) {
    res.render('home');
});

//Get / render register page
router.get('/register', function(req, res){
    return res.render('register');
});

//Post / send data from register page
router.post('/register', function(req, res, next){
    console.log(req.body);
    const name = req.body.name;
    const number = req.body.number;
    const type = req.body.type;
    
    if(name && number && type){
        // create object with form input
        var vData = {
            name: name,
            number_plate: number,
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
    const number_plate = req.query.number_plate;
    if(!number_plate){
        return res.redirect('/profiles');    
    }else{
        Vehicle.findOne({ number_plate:number_plate }, function(err, data) {
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
