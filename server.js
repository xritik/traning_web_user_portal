const express = require('express');
const cors = require('cors'); // Import cors
require('dotenv').config();
const app = express();
const PORT = 5000
require('./db');

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only requests from this origin
    credentials: true,                // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));

app.use(express.json());



const loginRoutes = require('./routes/loginRoutes')
app.use('/login', loginRoutes);

const addTrainingRoutes = require('./routes/add_trainingRoutes')
app.use('/add_training', addTrainingRoutes);

const searchData = require('./routes/searchData')
app.use('/search', searchData);

const adminConformation = require('./routes/adminConformationRoute')
app.use('/admin', adminConformation);

const trainings = require('./routes/trainingRoutes')
app.use('/trainings', trainings);

app.listen(PORT, () => console.log('Server is running at port ', PORT));