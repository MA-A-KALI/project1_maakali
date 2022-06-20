var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PengalamanKerjaSchema = new Schema(
    {
        nama_perusahaan: {type: String},
        jabatan: {type: String},
        lokasi: {type: String},
        tanggal_mulai: {type: Date},
        tanggal_selesai: {type: Date},
        deskripsi_pekerjaan: {type: String},
    }
)

module.exports = mongoose.model('PengalamanKerja', PengalamanKerjaSchema);