var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ServiceSchema = new Schema(
    {
        service_name: {type: String, required: true, enum:[
            'Web Programming',
            'Design Graphic',
            'Writing',
            'Service and Repair',
            'Sales and Marketing',
        ]},
    }
);

ServiceSchema
    .virtual('url')
    .get(function() {
        return '/users/service/'  + this._id
    });

module.exports = mongoose.model('Service', ServiceSchema);