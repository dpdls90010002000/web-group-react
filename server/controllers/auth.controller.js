import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
//change
import { expressjwt } from "express-jwt";
//
import config from './../../config/config.js';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ "email": req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }
    // const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

// const requireSignin = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: Missing token' });
//   }

//   jwt.verify(token, config.jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     req.auth = decoded;
//     next();
//   });
// };

const requireSignin = expressjwt({ 
  secret: config.jwtSecret, 
  algorithms: ["HS256"],
userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
