const db = require("../models");
let solutions = require("../scripts/solutions.js")
let usersRepository = require("../repository/usersRepository.js")
const User = db.users;
const express = require('express')
const jwt = require('jsonwebtoken')

let timeUuid = {}

let jwtExpirySeconds = 1800
let jwtKey = "my_secret_key"

// Create and Save a new User
exports.create = (req, res) => {

    let token = jwt.sign({ email: req.body.email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })

    // Create a User
    let user = {
        uid: solutions.uuid(),
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
    };

    // Save User in the database
    if (req.body.password.length >= 8 && req.body.password.replace(/\D/g, '').length > 0
        && req.body.password.match(/[A-Z]/g).length != req.body.password.length
        && req.body.nickname.length > 0 && req.body.email.length > 0
        && req.body.email.replace('@', '').length != req.body.email.length) {
        User.create(user)
        timeUuid[token] = 1800;
        res.cookie("token", token, {maxAge: jwtExpirySeconds})
        res.status(201).send(
            {
                "token": `${token}`,
                "expire": jwtExpirySeconds
            }
        )
    } else {
        res.status(400).send(`valid error!`);
    }
};

exports.login = (req, res) => {

    let token = jwt.sign({ email: req.body.email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })

    usersRepository.findUserByEmailPassword(req.body.email, req.body.password, function (err, data) {
        if (err) {
            res.status(400).send("ERROR :", err)
        } else {
            if (data > 0) {
                res.cookie("token", token, {maxAge: jwtExpirySeconds})
                res.status(200).send(
                    {
                        "token": `${token}`,
                        "expire": jwtExpirySeconds
                    }
                );
            } else {
                res.status(400).send(`user not found`);
            }

        }
    })


};
