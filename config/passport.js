import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.js";

const cookieExtractor = (req) => {
  if (req && req.cookies && req.cookies.token) return req.cookies.token;
  return null;
};

const initializePassport = () => {
  passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      return done(null, user || false);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user || null);
    } catch (e) {
      done(e, null);
    }
  });
};

export default initializePassport;
