require('dotenv').config();

const Heros = require('../models/hero');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


exports.hero_register_post = async function(req, res) {
    const { first_name, last_name, email, password } = req.body

     // Check wheter username or email has already existed in Database
    const HeroCheckEmail = await Heros.findOne({ email });
 
    if (HeroCheckEmail) {
        return res.json({status: 'error', error: 'Email already in use'});
    } else if (!HeroCheckEmail) {
        try {
            const hero = new Heros({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hero.encryptPassword(password),
            });
     
            await hero.save();
            console.log('success' + hero);
            return res.status(200).redirect('/');
        } catch(error) {
            return res.json(error);
        }
    }
   
}

exports.hero_login_post = async function(req, res) {
    const { email, password } = req.body

    const hero = await Heros.findOne({ email }).lean()

    if(!hero) {
        return res.json({ status: 'error', error: 'Invalid email/password'});
    }

    if (bcrypt.compareSync(password, hero.password)) {

        const token = jwt.sign({ 
            id: hero._id, username: hero.username 
        }, process.env.ACCESS_TOKEN_SECRET
        );

        return res.cookie('token', token, {}).cookie('hero', true).status(200).redirect('/');
    }

    res.json({ status: 'error', error: 'Invalid username/password'})

}

exports.hero_update_data = function(req, res) {
    const { service, cv } = req.body

    Heros.findByIdAndUpdate(req.params._id, {
        cv: cv,
        service: service,
    }, {new: true}).then((hero) => {
        if(!hero) {
            hero.save();
            res.json({status: "error", error: "User not found!"});
        }
        res.json({status: "ok", data: {cv, service}});
    }).catch((err) => {
        res.json({status: "error", error: err});
    })
}

exports.hero_logout = function(req, res) {
    res.cookie('token', '', { maxAge: 1});
    res.redirect('/');
}

