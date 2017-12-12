const express = require('express'),
    Admin = require('../models/admin'),
    User = require('../models/user'),
    bcrypt = require('bcryptjs')

module.exports = (() => {
    'use strict'
    const router = express.Router()

    /* User listing endpoint. */
    router.get('/list', (req,res) => {
        User.find({}, function(err,users) {
          if (err) throw err
          else {
            var userMap = []
              users.forEach(function(user) {
                var arg = {
                    name: user.name, 
                    email: user.email, 
                    phone: user.phone, 
                    company: user.company, 
                    officialVisit: user.officialVisit, 
                    escortNeeded: user.escortNeeded, 
                    escortName: user.escortName
                }
                userMap.push(arg)
              })
            res.send(JSON.stringify(userMap))         
          }
        })
    })

    router.get('/isauth', (req, res, next) => {
        if (req.user) {
            res.send(req.user)
        }
    })

    router.get('/logout', (req, res, next) => {
        req.session.destroy(function (err) {
            res.redirect('/admin'); 
        });
    })

    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        }
        else {
            res.redirect('/admin')
        }
    }

    /* Register Admin */
    router.post('/register', (req, res) => {
        /* Hash User password first and then create User object to store in DB on 
        * hash success */
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) {
                res.status(499).send()
            }
            else {
                const newAdmin = new Admin({
                    username: req.body.username,
                    password: hash // Hash, not plain!
                })

                Admin.create(newAdmin, (err) => {
                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                    //search error message body for error source = 'email' or 'username'
                    if (err.message.search('username') != '-1') {
                        res.statusMessage = 'username'
                        return res.status(409).send()
                    }
                    else if (err.message.search('email') != '-1') {
                        res.statusMessage = 'email'
                        return res.status(409).send()
                    }  
                    }
                    
                    /* Error message not displayed by default, included this to make stack trace 
                    * more descriptive. */
                    console.log(err.message)
                    throw err
                }
                })
            }
        })
    })

    return router
})()