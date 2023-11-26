import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
// import React from 'react'; // Import React
// import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
// import { StaticRouter } from 'react-router-dom'; // Import StaticRouter from react-router-dom
// import { ServerStyleSheets, ThemeProvider } from '@material-ui/core'; // Import MUI components if used
import Template from './../template.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
// import staticRouter from 'react'

// import devBundle from './devBundle';
const app = express();
const CURRENT_WORKING_DIR = process.cwd(); 
// devBundle.compile(app);

// ...
app.get('/', (req, res) => {
    res.status(200).send(Template()) 
})
// ...   
// Middleware
app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use((err, req, res, next) => {
 if (err.name === 'UnauthorizedError') {
 res.status(401).json({ "error": err.name + ": " + err.message });
} else if (err) {
res.status(400).json({ "error": err.name + ": " + err.message });
console.log(err);
 }
});

export default app;
