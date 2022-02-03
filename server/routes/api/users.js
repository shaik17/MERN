const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const keys = require('../../config/key');
const passport = require('passport');

// load a User model
const User = require('../../model/User');

//load validate register model
const validateRegisterInput = require('../../validation/register');

// load validate  login model

const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
    const { errors, isvalid } = validateRegisterInput(req.body);
    if (!isvalid) {
        return res.status(404).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = "email alredy exist";
                res.status(404).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm', //deafult
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw (err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));

                    })
                })
            }
        })
});
router.post('/login', (req, res) => {
    const { isvalid, errors } = validateLoginInput(req.body);
    if (!isvalid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {

            if (!user) {
                errors.email = 'User Not Found';
                return res.status(404).json(errors)
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    /*if(isMatch){
                        res.json({msg:"success"});
                    }*/

                    // Using jwt token

                    if (isMatch) {
                        const payload = { id: user.id, name: user.name, avatar: user.avatar };
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer '  + token
                            });
                        });
                    }
                    else {
                        errors.password = 'Password is incorrect';
                        return res.status(400).json(errors);
                    }
                })

        })


});
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email

    });
}
);
router.get('/getusers', (req, res) => {

    User.find({})
        .then(user => {
            if (user) {
                res.json(user)
            }

            return res.status(400).json(err)

        })
        .catch(err => res.json(err))
})
router.get('/deleteuser/:email', (req, res) => {
    const errros = {};

    User.deleteOne({ email: req.params.email })
        .then(user => {
            if (user) {
                res.send("deleted");
            }

            return res.status(400).json(err)

        })
        .catch(err => res.json(err))
})



module.exports = router;