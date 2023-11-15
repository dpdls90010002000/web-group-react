/*import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
*/
/*import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
//import devBundle from './devBundle' 
import path from 'path'
const app = express()
const CURRENT_WORKING_DIR = process.cwd()
//devBundle.compile(app)
//...
app.get('*', (req, res) => {
// 1. Generate CSS styles using Material-UI's ServerStyleSheets 
// 2. Use renderToString to generate markup which renders components specific to the route requested
// 3. Return template with markup and CSS styles in the response 
})*/
/*app.get('/', (req, res) => {
res.status(200).send(Template()) 
})*/
//...
/*app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use((err, req, res, next) => {
if (err.name === 'UnauthorizedError') {
res.status(401).json({"error" : err.name + ": " + err.message}) 
}else if (err) {
res.status(400).json({"error" : err.name + ": " + err.message}) 
console.log(err)
} 
})
const sheets = new ServerStyleSheets()
const context = {}
const markup = ReactDOMServer.renderToString( 
sheets.collect(
<StaticRouter location={req.url} context={context}>
<ThemeProvider theme={theme}>
<MainRouter /> 
</ThemeProvider> 
</StaticRouter> 
)
)
if (context.url) {
return res.redirect(303, context.url) 
}
const css = sheets.toString() 
res.status(200).send(Template({
markup: markup, 
css: css
}))
export default app
*/
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
// app.get('*', (req, res) => {
//  const sheets = new ServerStyleSheets();
//  const context = {};
//  const markup = ReactDOMServer.renderToString(
//  sheets.collect(
//  <StaticRouter location={req.url} context={context}>
//  {/* Your components here */}
//  </StaticRouter>
// )
//  );
//  if (context.url) {
// return res.redirect(303, context.url);
// }
//  const css = sheets.toString();
// res.status(200).send(
// Template({
// markup: markup,
//  css: css,
// }) );
// });
export default app;



// import express from 'express'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import compress from 'compression'
// import cors from 'cors'
// import helmet from 'helmet'
// import Template from './../template.js'
// import userRoutes from './routes/user.routes.js'
// import productRoutes from './routes/product.routes.js'
// import categoryRoutes from './routes/category.routes.js'

// const app = express()
// //...
// app.get('/', (req, res) => {
// res.status(200).send(Template()) 
// })
// //...
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', userRoutes)
// app.use('/', productRoutes)
// app.use('/', categoryRoutes)
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use(compress())
// app.use(helmet())
// app.use(cors())
// export default app
