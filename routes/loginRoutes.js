const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {jwtAuthMiddleware, generateToken} = require('../jwt')

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email, password});

    if(user){
        // const payload ={
        //     id: user.id,
        //     email: user.email
        // }
        // const token = generateToken(payload)
        // console.log("Token is:- ", token);
        // res.status(200).json({ message: 'Login Successful!!', token: token });

        res.status(200).json({ message: 'Login Successful!!' });
    } else{
        res.status(401).json({ message: 'Invalid email or password!!' })
    }
});

module.exports = router;