const User = require('./server/models/admin'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs')

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user)
        })
    })

    passport.use(new LocalStrategy({
        usernameField: 'username'
      },
      (username, password, done) => {
        User.findOne({ username: username}, (err, user) => {
          if (err) { 
            return done(err) 
          }
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false)
          }
  
          bcrypt.compare(password, user.password, function(err, res) {
            if (err) {
              return done(null, false)
            }
            else {
              return done(null, user)
            }
          })
        })
      }
    ))

    //code here
}