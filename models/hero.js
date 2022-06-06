var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        last_name: {type: String, required: true, maxlength: 100},
        email: {type: String, required: true, maxlength: 100},
        service: {type: String, required: false, enum:[
            'Web Programming',
            'Design Graphic',
            'Writing',
            'Service and Repair',
            'Sales and Marketing',
        ]},
        password: {type: String, required: true},
        cv: {
            file: {type: 'Buffer', required: false},
            filename: {type: String, required: false},
        }
    }
);

// encrypt password
HeroSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// validate password for signing in
HeroSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Heros', HeroSchema);