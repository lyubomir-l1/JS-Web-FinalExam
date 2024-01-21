const User = require('../models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');
const {SECRET} = require('../config/config');

exports.login = async(username, password) => {
const user = await User.findOne({username});
if (!user){
    throw new Error('Invalid user ot password');
}
const isValid = await bcrypt.compare(password, user.password);
if (!isValid){
    throw new Error('Invalid user ot password');
}

const token = await generateToken(user);
return token;

}

exports.register = async(userData) => {
    const user = await User.findOne({username: userData.email})
    if (user){
        throw new Error('Username already exists')
    }

    const createdUser = await User.create(userData);
    const token = generateToken(createdUser);
    return token;

}

async function generateToken(user){
    const payload = {
        username: user.username,
        _id: user._id,
    }
    
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});
    return token;
}
