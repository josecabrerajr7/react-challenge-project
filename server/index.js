const express 							= require('express');
const mongoose 							= require('mongoose');
const morgan 							= require('morgan');
const bodyParser 						= require('body-parser');

const authRoutes 						= require('./routes/auth.routes');
const routes 							= require('./routes/public.routes');
const app 								= express();
const port 								= 4000;

require('dotenv').config();

// DATABASE SETUP
// connect to db
mongoose.connect(process.env.MONGODATABASE);

// display message on connect
mongoose.connection.on('connected', () => {
	console.log('Connected to databse: ', process.env.MONGODATABASE);
});

// display message on error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ', err);
});

// logger
app.use(morgan('dev'));

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
// This allows client applications from other domains use the API Server
app.use((req, res, next) => {
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Expose-Headers', 'Authorization, refresh');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, refresh');
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

// use routes
app.use('/api', authRoutes);
app.use('/api', routes);

// test route
app.get('/', (req, res) => {
    console.log('Hi!');
    res.send('Hi!');
})

app.listen(port, () => { console.log(`Listening on port ${port}`)});