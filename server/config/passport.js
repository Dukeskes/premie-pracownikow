var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

    passport.use('local', new LocalStrategy(
        function(username, password, done) {

            console.log(username);
            console.log(password);
            User.findOne({ username: username }, function (err, user) {

                console.log(username);

                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

};