const express = require('express');
const router = express.Router();

const userDB = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
    const userInfo = req.body;
    userDB.insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be saved." });
        })
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

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params;

    userDB.getById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId,  (req, res) => {
    const { id } = req.params;
    userDB.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be deleted." });
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const { id } = req.params;
    userInfo = req.body;
    userDB.update(id, userInfo)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be updated." });
    })

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    userDB.getById(id)
        .then(user => {
            if (user === undefined) {
                return res.status(404).json({ message: "The User ID does not exist." });
            } else {
                next();
            }
        })
        .catch(error => {
            return res.status(400).json({ errorMessage: "There was an error accessing the database." });
        })
};

function validateUser(req, res, next) {
    const userInfo = req.body;
    if (userInfo.name === undefined) {
        return res.status(400).json({ errorMessage: "Please provide name for the user." });
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    const postInfo = req.body;
    if (postInfo.text === undefined) {
        return res.status(400).json({ errorMessage: "Please provide post text." });
    } else {
        next();
    }
};

module.exports = router;
