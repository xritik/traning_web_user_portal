const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    const {loginName} = req.body;

    const user = await User.findOne({name: loginName});

    if(user){
        res.status(200).json({ user });
    } else{
        res.status(401).json({ message: 'Invalid email or password!!' })
    }
});

module.exports = router;