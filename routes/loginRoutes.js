const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    const {name, password} = req.body;

    const user = await User.findOne({name, password});

    if(user){
        res.status(200).json({ message: 'Login Successful!!' });
    } else{
        res.status(401).json({ message: 'Invalid email or password!!' })
    }
});

module.exports = router;