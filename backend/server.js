const express = require('express');
const cors = require('cors'); // Import cors
require('dotenv').config();
const app = express();
const PORT = 5000;
require('./db');

const corsOptions = {
    origin: 'http://portal.vikasweb.xyz:3000',  // Allow only requests from this origin
    // origin: 'http://localhost:3000',  // Allow only requests from this origin
    credentials: true,                // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));

app.use(express.json());



const loginRoutes = require('./routes/loginRoutes');
const searchTrainingsRouter = require('./routes/searchTrainingRoutes');
const trainings = require('./routes/trainingRoutes');
const users = require('./routes/userRoute');



app.use('/login', loginRoutes);
app.use('/search', searchTrainingsRouter);
app.use('/trainings', trainings);
app.use('/user', users);

app.listen(PORT, () => console.log('Server is running at port ', PORT));