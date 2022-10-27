const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require ('../middleware/auth')//we are destructuring to bring both(list of things) to perform a singular action.get both from same location simultaneously.

//@desc Login/Landing page
//@route GET/
//
router.get('/', ensureGuest,(req,res)=>{
    res.render('login', {
        layout:'login',
    })
       
})

//@desc Dashboard
//route GET/ dashboard
//ensureAuth reusable keeps you where you belong,kicks you out if not Auth
router.get('/dashboard',ensureAuth, (req,res)=>{
    res.render('dashboard')
})
module.exports = router