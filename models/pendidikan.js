var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PendidikanSchema = new Schema(
    {
        kampus: {type: String},
        Jurusan: {type: String},
        gelar: {type: String},
        tahun_lulus: {type: Date}
    }
)

module.exports = mongoose.model('Pendidikan', PendidikanSchema);