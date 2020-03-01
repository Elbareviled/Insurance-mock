const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex:true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB connection stablished");
});

const insuranceRouter = require('./routes/insurance');
const userRouter = require('./routes/user');

app.use('/plans', insuranceRouter);
app.use('/user', userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
