const Users = require('../models/users');
const ValidateLogin = require('../validation/login');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.getUser = function(req, res){
}

exports.loginUser = function(req, res){
    const { error, isValid } = ValidateLogin(req.params);
    if (!isValid){
        return res.status(400).json({error: error});
    }

    const { email, password } = req.params;
    Users.findOne({ email: email }).then((user) => {
        console.log(user || "No user");
        console.log(user.password, " : ", password)
        if (!user) res.status(404).json({ error: "User Not Found"});
        bcryptjs.compare(password, user.password).then((isMatch) => {
            if (isMatch){
                const payload = {
                    id: user._id,
                    email: user.email._id,
                    admin: user.admin || false
                };
                jwt.sign(
                    payload,
                    process.env.AUTH_SECRET,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );

            } else {
                console.log("Bad Pass");
                return res.status(400).send({error: "Password Incorrect"});
            }
        });
    })
    .catch(() => {
        console.log("here");
        res.status(404).send({ error: "User Not Found"});
    });
}