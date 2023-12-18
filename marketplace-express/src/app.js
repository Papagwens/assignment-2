// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config'); // Adjust the path based on your project structure
const productRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());


//mongo connection

mongoose.connect('mongodb+srv://wendyparaizo:BPcnCkxiw2jziPOP@wendy.al34jwy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
    res.send('Welcome to the DressStore application!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
