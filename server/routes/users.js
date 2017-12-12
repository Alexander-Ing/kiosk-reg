const express = require('express'),
      User = require('../models/user')

module.exports = (() => {
    'use strict'
    const router = express.Router()

    /* User listing endpoint. */
    router.get('/list', (req,res) => {
        console.log("test api endpoint reached")
        res.status(200).send()
      })

    /* Register user */
    router.post('/register', (req, res) => {
        const kioskUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company: req.body.company,
            officialVisit: req.body.officialVisit,
            escortNeeded: req.body.escortNeeded,
            escortName: req.body.escortName
        })
        User.create(kioskUser, (err) => {
            if (err) {
                res.statusMessage = 'user create failed!!!!!!'
                console.log(err)
                return res.status(409).send()  
            }
            res.status(200).send()   
        })
    })
    return router
})()