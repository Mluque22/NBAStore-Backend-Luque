const passport = require('passport');

exports.authJWT = passport.authenticate('jwt', { session: false });
