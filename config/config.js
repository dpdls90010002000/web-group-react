
const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
<<<<<<< HEAD
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://dpdls300:HBek6i66lX7noA3W@yeinan.zy7tzqm.mongodb.net/ShoesLocker?retryWrites=true&w=majority"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
    

    //user,product,category
=======
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://dpdls300:HBek6i66lX7noA3W@yeinan.zy7tzqm.mongodb.net/ShoesLocker"
  };
export default config
>>>>>>> b150a46a373a6c4a36e5daecac61c77329968d4c
