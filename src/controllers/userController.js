const router = require('express').Router();

const userManager = require('../managers/userManager');
const {TOKEN_KEY} = require('../config/config');
const {getErrorMessage} = require('../utils/errorHelpers');


router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try{
    const token = await userManager.login(username, password);
    res.cookie(TOKEN_KEY, token)
   res.redirect('/');
    } catch(err){
        res.render('users/login', {error: getErrorMessage(err)});
    }
})

router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', async(req, res) => {
    const { email, password, repeatPassword} = req.body;
    try {
    const token = await userManager.register({ email, password, repeatPassword});
    res.cookie(TOKEN_KEY, token);
   res.redirect('/');
    } catch(err){
        res.render('users/register', {error: getErrorMessage(err)})
        console.log(err.message)
    }
 });

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
});

router.get('/search', (req, res) => {
    res.render('users/search')
});


module.exports = router;
