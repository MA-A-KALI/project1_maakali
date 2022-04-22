var async = require('async');
var Consumer = require('../models/consumer');
var Job_posted = require('../models/job');
const { body, validationResult } = require('express-validator');
const { Model } = require('mongoose');
const { json } = require('express');

// Get list of all consumer
exports.consumer_list_get = async function (req, res, next) {
    await Consumer.find({}, 'name')
        .sort({name: 1})
        .populate('job_posted')
        .exec(function(err, list_name) {
            if (err) {
                res.status(500).json({message: err.message});
                return next(err);
            }
            res.status(500).jason(list_name);
        })
};

// find consumer by name and return list of names
exports.consumer_find_by_name_get = async function (req, res, next) {
   await Consumer.findOne({name: /req.params.name/i}, 'name')
    .exec(function(err, list_name) {
        if(err) { 
            res.status(500).json({message: err.message});
            return next(err); 
        }
        res.status(200).json(list_name);
    })
};

// get customer by ID
exports.consumer_find_by_id_get = async function (req, res, next) {
   try {
       const data = Consumer.findById(req.params.id);
       res.status(200).json(data);
   } catch (error) {
        res.status(500).jason({message: error.message});
   }
}

// display consumer create form
exports.consumer_create_get = function(req, res, next) {
    res.render('consumer_create');
};

// consumer create post
exports.consumer_create_post = [
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email must not be empty.').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        
        //create new consumer
        var consumer = new Consumer({
            name: req.body.name,
            email: req.body.email,
        });

        if(!errors.isEmpty()) {
            res.render('create_form');
        }

        consumer.save(function(err) {
            if (err) {
                res.status(400).json({message: err.message});
            }
            res.status(200).redirect(consumer.url);
        });
    },
];
