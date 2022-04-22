var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConsumerSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100},
        email: {type: String, required: true, maxlength: 100},
        job_posted: {type: Schema.Types.ObjectId, ref: 'Job'}
    }
);

ConsumerSchema.virtual('url')
    .get(function() {
    return '/users/consumer' +this._id;
});

module.exports = mongoose.model('Consumers', ConsumerSchema);