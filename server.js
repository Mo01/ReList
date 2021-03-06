const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
// const db = config.get('mongoURI');
const db = require('./config/keys').mongoURI;
console.log('Mo connecting to', db);
// Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

console.log('Mo connected call initiated');

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/public'));

app.get('*', (req, res) => {
	console.log('MO', path.resolve(__dirname, 'client', 'public', 'index.html'));
	res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});
// }

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
