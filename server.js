const express = require('express');
const app = express();
const PORT = 5000
require('./db');


app.listen(PORT, () => console.log('Server is running at port ', PORT));