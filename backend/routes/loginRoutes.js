const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    const {name, password} = req.body;

    const allUsers = await User.find();
    const user = await User.findOne({name, password});

    if (allUsers.length==0){
        if(name=='user' && password=='pass'){
            res.status(200).json({ message: 'Login Successful!!' });
        }else{
            res.status(401).json({ message: 'Invalid name or password!!' });
        }
    }else{
        if(user){
            res.status(200).json({ message: 'Login Successful!!' });
        } else{
            res.status(401).json({ message: 'Invalid name or password!!' });
        }
    }


});

module.exports = router;