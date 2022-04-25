var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsumerSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100},
        email: {type: String, required: true, maxlength: 100},
        password: {type: String, required: true},
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