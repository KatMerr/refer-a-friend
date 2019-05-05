const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require('../models/users');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_SECRET
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            Users.findById(jwt_payload.id).then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false)
            })
            .catch((err) => console.log(err));
        })
    );
};