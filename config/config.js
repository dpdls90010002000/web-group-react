
const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://dpdls300:HBek6i66lX7noA3W@yeinan.zy7tzqm.mongodb.net/ShoesLocker"
  };
export default config
