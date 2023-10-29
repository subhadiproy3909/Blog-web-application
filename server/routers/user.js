const router = require('express').Router();
const User = require('../dbconn/models/userModel');

router.post('/user/signup', async (req, res) =>{
    
    try {
        const {email, password} = req.params;
        
        const isUserExists = await User.exists({email});

        if(isUserExists){
            res.status(401).json({message: "Account already exists"});
        }

        const data = await User.create({email, password});

        if(data){
            res.status(200).json({
                email: data.email,
                password: data.password,
            })
        }
    } catch (error) {
        console.error(`signup post method: ${error.message}`);
    }
});

router.get('/user/signup/:email', async (req, res) =>{
    
})