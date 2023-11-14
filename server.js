import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose'
mongoose.Promise = global.Promise; 
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  throw new Error(`Unable to connect to the database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ShoeStore application." });
  });
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('Server started on port %s.', config.port);
    console.log("http://localhost:3000")
  });