require('dotenv').config();

const Consumers = require('../models/consumer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

/**  
 * !MIGHT NEED!
 * 
 * const Job_posted = require('../models/job');
 * const { body, validationResult } = require('express-validator');
 *  
*/


exports.consumer_register_post = async function(req, res) {
    const { username, email, description, password } = req.body

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid Username'});
    }

    if (!email) {
        return res.json({ status: 'error', error: 'Please enter Email'});
    }

    if (!password || typeof password !== 'string') {
        return res.json({ status: 'error', error: 'Please insert password'});
    }

    if (password.length < 8) {
        return res.json({ status: 'error', error: 'Please insert password more than 8 characters'});
    }

    // Check wheter username or email has already existed in Database
    const consumerCheckUsername = await Consumers.findOne({ username })
    const consumerCheckEmail = await Consumers.findOne({ email })

    if (consumerCheckUsername || consumerCheckEmail) {
        return res.json({status: 'error', error: 'Username or Email already in use'})
    } else if (!consumerCheckUsername && !consumerCheckEmail) {
        try {
            const consumer = new Consumers();
    
            consumer.username = username;
            consumer.email = email;
            consumer.description = description;
            consumer.password = consumer.encryptPassword(password);
    
            consumer.save();
            return res.status(200).redirect('/'); //json({status: "New User has Been Added!", username: username, email: email});
        } catch(error) {
            return res.json(error);
        }
    }
}

exports.consumer_login_post = async function(req, res) {
    const { username, password } = req.body

    const consumer = await Consumers.findOne({ username }).lean()

    if(!consumer) {
        return res.json({ status: 'error', error: 'Invalid username/password'});
    }

    if (bcrypt.compareSync(password, consumer.password)) {

        const token = jwt.sign({ 
            id: consumer._id, username: consumer.username 
        }, process.env.ACCESS_TOKEN_SECRET
        );

        return res.json({ status: 'ok', data: token });
    }

    res.json({ status: 'error', error: 'Invalid username/password'})

}

exports.consumer_update_data = function(req, res) {
    const { file, description } = req.body

    Consumers.findByIdAndUpdate(req.params._id, {
        user_img: file,
        description: description,
    }, {new: true}).then((consumer) => {
        if(!consumer) {
            consumer.save();
            res.json({status: "error", error: "User not found!"});
        }
        res.json({status: "ok", data: description});
    }).catch((err) => {
        res.json({status: "error", error: err});
    })
}

exports.consumer_logout = function(req, res) {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}
