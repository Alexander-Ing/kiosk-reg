const express = require('express'),
router = express.Router(),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy

router.post('/local',
  passport.authenticate('local', { failureRedirect: '/#/admin' , successRedirect: '/#/adminhome' }),
  function(req, res) {
    res.redirect('/#/adminhome')
  }
)

module.exports = router
