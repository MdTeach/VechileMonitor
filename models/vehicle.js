var mongoose = require('mongoose');
var VehicleSchema = mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    },
    v_type:{
        type:String
    }
})

// authenticate input against database documents
VehicleSchema.statics.authenticate = function(number, callback) {
    Vehicle.findOne({ number: number })
        .exec(function (err, data) {
          if (err) {
            return callback(err);
          } else if ( !data ) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
          } else {
              return callback(null,data);
          }    
    });
}
var Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
