const express = require('express');
const router = express.Router();

const userDB = require('./userDb.js');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

// GET all users
router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The USERS could not be retrieved." });
    })
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
