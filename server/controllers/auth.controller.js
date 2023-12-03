import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
//import expressJwt from 'express-jwt' change
import { expressjwt } from "express-jwt";
import config from './../../config/config.js'


const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user){
            return res.status('401').json({ error: "User not found" })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                seller: user.seller
            }
        })
    } catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}
// const requireSignin = expressjwt({
//     secret: config.jwtSecret,
//     algorithms: ["HS256"],
//     userProperty: 'auth'
// })

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth',
    getToken: function fromHeaderOrQuerystring(req) {
      // Check if the authorization token is present in the headers
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        // Check if the authorization token is present in the query string
        return req.query.token;
      }
      return null;
    }
  });

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}
export default { signin, signout, requireSignin, hasAuthorization }