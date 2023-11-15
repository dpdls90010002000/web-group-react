import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // User's name field
  name: {
    type: String,
    trim: true,
    required: 'Name is required', 
  },
  
  // User's email field
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists', 
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
    required: 'Email is required', 
  },
  
  address:{
    type: String,
    required: 'Address is required'
   },
   
   phone:{
    type: String,
    trim: true,
    required: 'Phone is required'
   },
  
  created: {
    type: Date,
    default: Date.now, 
  },
  
  updated: {
    type: Date,
    default: Date.now, 
  },
  
  hashed_password: {
    type: String,
    required: 'Password is required', 
  },
  salt: String,
});


UserSchema.virtual('password')
  .set(function(password) {
   
    this._password = password;
   
    this.hashed_password = password;
  })
  .get(function() {
   
    return this._password;
  });


UserSchema.path('hashed_password').validate(function(v) {
  
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);


export default mongoose.model('User', UserSchema);
