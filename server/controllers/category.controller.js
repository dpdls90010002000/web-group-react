import Category from '../models/category.model.js';
//import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
	const category = new Category(req.body);
	try {
	  await category.save();
	  res.status(201).json(category);
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
  
	  let categories = await Category.find(query);
  
	  res.json(categories);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  }
  

  const update = async (req, res) => {
	try {
	  const category = req.profile;
	  await Category.updateOne({ _id: category._id }, { $set: req.body });
	  res.json(category);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  };
  
  const read = async (req, res) => {
	const category = req.profile;
	if (category) {
	  res.json(category);
	} else {
	  res.status(404).json({ error: 'Category not found' });
	}
  };
  
  const remove = async (req, res) => {
	try {
	  const category = req.profile;
	  await Category.deleteOne({ _id: category._id });
	  res.json(category);
	} catch (err) {
	  return res.status(400).json({
		error: errorHandler.getErrorMessage(err),
	  });
	}
  };
  
  const userByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }
    req.profile = category;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve category' });
  }
}
  export default { create, list, read, update, remove,userByID };