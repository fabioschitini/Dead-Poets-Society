const LocalStrategy = require('passport-local').Strategy
const bcrypt=require("bcryptjs")

function initialize(passport, Users) {
    passport.use(
        new LocalStrategy((username, password, done) => {
          Users.findOne({ username: username }, (err, user) => {
            try{
              if (!user) {
          
                return done(null, false, { message: "Username not found" });
              }
              bcrypt.compare(password, user.password, (err, res) => {
                  if (res) {
                    // passwords match! log user in
                    return done(null, user)
                  } else {
                    // passwords do not match!
                  return done(null, false, { message: "Incorrect password" })
                  }
                })
            }
            catch(err){
              return done(err,false);
            }
          });
        })
      );
      passport.serializeUser(function(user, done) {
        done(null, user.id);
     });
     
     passport.deserializeUser(function(id, done) {
       Users.findById(id, function(err, user) {
         done(err, user);
       });
     });
}

module.exports = initialize