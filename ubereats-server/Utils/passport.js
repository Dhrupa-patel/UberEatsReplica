"use strict"
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const secret = "CMPE273";
const Owners = require("../model/Owner");
const Customers = require("../model/Customer");

function auth(){
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret,
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            if(jwt_payload.type==="customer"){
                Customers.findById(user_id, (err, results) => {
                    if(err){
                        return callback(err, false);
                    }
                    if(results){
                        callback(null, results);
                    } else{
                        callback(null, false);
                    }
                });
            }
            else{
                Owners.findById(user_id, (err, results) => {
                    if(err){
                        return callback(err, false);
                    }
                    if(results){
                        callback(null, results);
                    } else{
                        callback(null, false);
                    }
                });
            }
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session:false });