require('dotenv').config();

const Heros = require('../models/hero');
const Pendidikan = require('../models/pendidikan');
const PengalamanKerja = require("../models/pengalamanKerja");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


exports.hero_register_post = async function(req, res) {
    const { nama, email, password } = req.body

     // Check wheter username or email has already existed in Database
    const HeroCheckEmail = await Heros.findOne({ email });
 
    if (HeroCheckEmail) {
        return res.json({status: 'error', error: 'Email already in use'});
    } else if (!HeroCheckEmail) {
        try {
            const hero = new Heros({
                nama: nama,
                email: email,
                // password: Heros.encryptPassword(password),
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
            });
     
            await hero.save();
            console.log('success' + hero);
            return res.status(200).redirect('/');
        } catch(error) {
            return res.status(400).json({message: "Bad Request", error: error});
        }
    }
   
}

exports.hero_login_post = async function(req, res) {
    const { email, password } = req.body

    const hero = await Heros.findOne({email: email}).lean();

    if(!hero) {
        return res.json({ status: 'error', error: 'Invalid email'});
    }
    
    try {
        if (bcrypt.compareSync(password, hero.password)) {

            const token = jwt.sign({ 
                id: hero._id, username: hero.username 
            }, process.env.ACCESS_TOKEN_SECRET
            );

            return res.cookie('token', token, {}).cookie('hero', true).status(200).redirect('/');
        }

        res.status(404).json({ status: 'error', error: 'Invalid username/password'})
    } catch (err) {
        res.status(400).json({err})
    }

}

exports.hero_update_data = async function(req, res) {
    const { 
        nama, 
        no_handphone, 
        tanggal_lahir, 
        gender, 
        deskripsi_profile, 
        personal_link, 
        profesi, 
        skill, 
        sekolah, 
        jurusan, 
        gelar, 
        tahun_lulus, 
        nama_perusahaan, 
        jabatan, 
        lokasi, 
        tanggal_mulai, 
        tanggal_selesai, 
        deskripsi_pekerjaan 
    } = req.body;
    const foto = req.file;
    const id = req.params._id;

    const pendidikan = new Pendidikan({
        sekolah, 
        jurusan, 
        gelar, 
        tahun_lulus
    });

    const pengalamanKerja =  new PengalamanKerja({
        nama_perusahaan, 
        jabatan, 
        lokasi, 
        tanggal_mulai, 
        tanggal_selesai, 
        deskripsi_pekerjaan 
    })

    Heros.findByIdAndUpdate(req.params.id, {
        nama : nama,
        no_handphone: no_handphone,
        tanggal_lahir: tanggal_lahir,
        gender: gender,
        deskripsi_profile: deskripsi_profile,
        personal_link: personal_link,
        profesi: profesi,
        skill: skill,
        pendidikan: pendidikan,
        pengalaman_kerja: pengalamanKerja,
        foto : foto
    }, {new: true}).then((hero) => {
        if(!hero) {
            res.json({status: "error", error: "User not found!"});
        }
        pendidikan.save();
        pengalamanKerja.save();
        hero.save();
        res.json({status: "ok", message: "Info has been updated!"});
    }).catch((err) => {
        res.json({status: "error", error: err});
    })
}

exports.hero_logout = function(req, res) {
    res.cookie('token', '', { maxAge: 1});
    res.redirect('/');
}

