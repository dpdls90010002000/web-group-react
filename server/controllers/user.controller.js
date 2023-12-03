import User from '../models/user.model.js';
import extend from 'lodash/extend.js';
// import errorHandler from './error.controller.js';
import errorHandler from './../helpers/dbErrorHandler.js'
// import formidable from 'formidable'
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import request from 'request'
import config from './../../config/config.js'
import stripe from 'stripe'
//import { sendFile } from 'express';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const formidable = require('formidable');
// Use path.join to construct the full file path
const profileImagePath = path.join(__dirname, './../../client/assets/images/profile-pic.png');


const myStripe = stripe(config.stripe_test_secret_key)
const defaultPhoto = (req, res) => {
  return res.sendFile(profileImagePath);
};

const create = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  // let form = formidable.IncomingForm();
  let form=new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }

    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  });
};
// const updateUser = async (req, res) => {
//   try {
//     let user = req.profile;
//     user = extend(user, req.body);
//     user.updated = Date.now();

//     await user.save();
//     user.hashed_password = undefined;
//     user.salt = undefined;
//     res.json(user);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     });
//   }
// };
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const isSeller = (req, res, next) => {
  const isSeller = req.profile && req.profile.seller;
  if (!isSeller) {
    return res.status(403).json({
      error: "User is not a seller"
    });
  }
  next();
};
const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const stripe_auth = (req, res, next) => {
  request({
    url: "https://connect.stripe.com/oauth/token",
    method: "POST",
    json: true,
    body: {client_secret:config.stripe_test_secret_key,code:req.body.stripe, grant_type:'authorization_code'}
  }, (error, response, body) => {
    //update user
    if(body.error){
      return res.status('400').json({
        error: body.error_description
      })
    }
    req.body.stripe_seller = body
    next()
  })
}

const stripeCustomer = (req, res, next) => {
  if(req.profile.stripe_customer){
      //update stripe customer
      myStripe.customers.update(req.profile.stripe_customer, {
          source: req.body.token
      }, (err, customer) => {
        if(err){
          return res.status(400).send({
            error: "Could not update charge details"
          })
        }
        req.body.order.payment_id = customer.id
        next()
      })
  }else{
      myStripe.customers.create({
            email: req.profile.email,
            source: req.body.token
      }).then((customer) => {
          User.update({'_id':req.profile._id},
            {'$set': { 'stripe_customer': customer.id }},
            (err, order) => {
              if (err) {
                return res.status(400).send({
                  error: errorHandler.getErrorMessage(err)
                })
              }
              req.body.order.payment_id = customer.id
              next()
            })
      })
  }
}

const createCharge = (req, res, next) => {
  if(!req.profile.stripe_seller){
    return res.status('400').json({
      error: "Please connect your Stripe account"
    })
  }
  myStripe.tokens.create({
    customer: req.order.payment_id,
  }, {
    stripeAccount: req.profile.stripe_seller.stripe_user_id,
  }).then((token) => {
      myStripe.charges.create({
        amount: req.body.amount * 100, //amount in cents
        currency: "usd",
        source: token.id,
      }, {
        stripeAccount: req.profile.stripe_seller.stripe_user_id,
      }).then((charge) => {
        next()
      })
  })
}
// export default { defaultPhoto, create, userByID, read, list, remove, update, updateUser, isSeller, photo,stripe_auth,stripeCustomer,createCharge };
export default { defaultPhoto, create, userByID, read, list, remove, update, isSeller, photo,stripe_auth,stripeCustomer,createCharge };