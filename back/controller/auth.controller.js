const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            try {
                User.create({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    password: hash
                }).then(user => {
                    res.status(201).json({ message: "Utilisateur créé" });
                }).catch(error => {
                    res.status(500).json({ message: error });
                })
                
            } catch (error) {
                res.status(500).json(error);
            }

        })
        .catch(error => {
            res.status(500).json(error);
        });

}

exports.login = async (req, res, next) => {
    console.log('coucou');
    try {
        let user = await User.findOne({email: req.body.email})
        bcrypt.compare(req.body.password, user.password)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        id: user.email,
                        token: jwt.sign({
                            email: user.email,
                            id: user._id
                        }, process.env.JWT_TOKEN)
                    });
                } else {
                    res.status(401).json({ message: "Mot de passe incorrect" });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}