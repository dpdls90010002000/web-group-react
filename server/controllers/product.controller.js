import Product from '../models/product.model.js';
//import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
	const product = new Product(req.body);
	try {
	  await product.save();
	  res.status(201).json(product);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  };

  const list = async (req, res) => {
	try {
	  let query = {}; 
	  if (req.query.name) {
		query.name = req.query.name;
	  }
  
	  let products = await Product.find(query);
  
	  res.json(products);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  }
  

  const update = async (req, res) => {
	try {
	  const product = req.profile;
	  await Product.updateOne({ _id: product._id }, { $set: req.body });
	  res.json(product);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  };
  
  const read = async (req, res) => {
	const product = req.profile;
	if (product) {
	  res.json(product);
	} else {
	  res.status(404).json({ error: 'Product not found' });
	}
  };
  
  const remove = async (req, res) => {
	try {
	  const product = req.profile;
	  await Product.deleteOne({ _id: product._id });
	  res.json(product);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  };
  
  const userByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    req.profile = product;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve product' });
  }
}
  export default { create, list, read, update, remove,userByID };
