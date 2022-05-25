var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsumerSchema = new Schema(
    {
        username: {type: String, required: true, maxlength: 100, unique:true},
        email: {type: String, required: true, maxlength: 100, unique: true},
        password: {type: String, required: true},
        description: {type: String, maxlength: 100},
        user_img: {type: String},
        job_posted: {type: Schema.Types.ObjectId, ref: 'Job'}
    }
);

// encrypt password
ConsumerSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// validate password for signing in
ConsumerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

ConsumerSchema.virtual('url')
    .get(function() {
    return '/users/consumer' +this._id;
});

module.exports = mongoose.model('Consumers', ConsumerSchema);