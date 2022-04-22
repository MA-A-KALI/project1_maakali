var mongoose = require('mongoose');
var { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var JobSchema = new Schema(
    {
        job_name: {type: String, required: true, maxlength: 200},
        creation_date: {type: Date, default: Date.now},
        status: {type: String, required: true, enum:[
            'Available',
            'Taken,'
        ]},
        description: {type: String, required: true, maxlength: 500},
        creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        deadline: {type: Date, default: Date.now},
    }
);

JobSchema
    .virtual('url')
    .get(function() {
        return '/users/jobs' + this._id;
    });

JobSchema
    .virtual('deadline_formatted')
    .get(function() {
        return DateTime.FromJSDate(this.deadline).toLocaleString(DateTime.DATE_MED);
    })

module.exports = mongoose.model('Job', JobSchema);