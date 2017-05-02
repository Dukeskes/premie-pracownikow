/**
 * Created by BartDukes on 22.07.2016.
 */
var router = require('express').Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var jwt = require('jwt-simple');
var User = require('../../models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {

            User.findOne({ username: username }, function (err, user) {

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

passport.serializeUser(function(user, done) {
        done(null, user.id);
});

passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
                done(err, user);
        });
});

router.post('/login', function(req, res, next) {

        passport.authenticate('local', function(err, user, info) {

                if (err) {
                    return next(err);
                }

                if (!user) {
                    console.log('Ni ma');
                }

                req.logIn(user, function(err) {

                    if (err) {
                            return next(err);
                    }
                    return res.send(200, user);

                });
        })(req, res, next);

});

module.exports = router;