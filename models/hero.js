var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Pendidikan = require('./pendidikan');

var HeroSchema = new Schema(
    {
        nama: {type: String, required: true, maxlength: 100},
        email: {type: String, required: true, maxlength: 100},
        no_handphone: {type: String, maxlength: 100},
        tanggal_lahir: {type: Date},
        gender: {type: String, enum: [
            'Laki-laki',
            'Perempuan'
        ]},
        deskripsi_profile: {type: String},
        personal_link: [{
            type: String
        }],
        profesi: {},
        skill: [{
            type: String
        }],
        pendidikan: [{
            type: Schema.Types.ObjectId, ref: "Pendidikan"
        }],
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