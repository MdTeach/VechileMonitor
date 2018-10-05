var mongoose = require('mongoose');
var VehicleSchema = mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    }
})
var Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
