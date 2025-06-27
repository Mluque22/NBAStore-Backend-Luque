const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => req?.cookies?.token
        ]),
        secretOrKey: process.env.JWT_SECRET
    }, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
};

module.exports = initializePassport;
