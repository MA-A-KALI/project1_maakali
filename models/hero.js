var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        last_name: {type: String, required: true, maxlength: 100},
        email: {type: String, required: true, maxlength: 100},
        service: {type: Schema.Types.ObjectId, ref: 'Service', required: true},
        cv: {
            file: {type: Buffer, required: false},
            filename: {type: String, required: false},
        }
    }
);

HeroSchema
    .virtual('name')
    .get(function() {
        var fullname = '';
        if (this.first_name && this.last_name) {
          fullname = this.first_name + ' ' + this.last_name;
        } else if (!this.first_name && !this.last_name) {
          fullname = '';
        }
        return fullname;
    });

HeroSchema
    .virtual('url')
    .get(function() {
        return '/users/hero/' +this._id;
    });


module.exports = mongoose.model('User', HeroSchema);