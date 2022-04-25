const Consumer = require('../models/consumer');
const Job_posted = require('../models/job');
const bcrypt = require('bcrypt-nodejs');
const { body, validationResult } = require('express-validator');

// consumer register
exports.consumer_register = function (req, res) {
    Consumer.findOne({email: req.body.email})
    .then( consumer => { // search for consumer with same email
        if (consumer) {
            res.status(409).json({message: "user already exist!"});
        } else { 
            // don't found consumer with same email, okay to save
            let hashPassword = bcrypt.hash(req.body.password, 16);
            let newConsumer = new Consumer({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
            newConsumer.save()
                .then(() => res.status(200).redirect('/consumer_page'))
                .catch( err => {
                    res.status(500).json({message: err.message});
                })
        }
    })
    .catch( err => {
        res.status(401).json({message: err.message});
    })
};

exports.consumer_login = async function (req, res) {
    try {
        let foundConsumer = Consumer.find( (consumer) => req.body.email === consumer.email);
        if (foundConsumer) {
            let submittedPass = req.body.password;
            let storedPass = foundConsumer.password;

            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                res.send
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

