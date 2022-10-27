const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc Auth with google
//@route GET/aut/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))



//@desc Google auth callback
//@route GET/aut/google/callback
//Passport newer version requires a logout to be async
router.get('/google/callback', 
passport.authenticate('google',{failureRedirect: '/'}), (req,res) => {
    res.redirect('/dashboard')
})

//@desc Logout User
//@route /auth/logout
//!Change: Passport 0.6 requires logout to be async
router.get('/logout', (req,res,next) => {
    req.logout(function(err){
        if(err) {return next(err)}
        res.redirect('/')
    })
})


module.exports = router