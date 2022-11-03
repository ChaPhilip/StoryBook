const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require ('../middleware/auth')//we are destructuring to bring both(list of things) to perform a singular action.get both from same location simultaneously.

const Story =require('../models/Story')

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
router.get('/dashboard', ensureAuth, async (req,
    res)=> {
            
        //we made the dashboard  async we're hitting the database so we need to wait before we render.  
       try {
            const stories = await Story.find({ user: 
            req.user.id}).lean() // .lean()get a smaller json file only the basic. lite version 
            //pass user and stories to be render in dashboard
            res.render('dashboard',{
                name: req.user.firstName,
                stories
            })
        }catch (err){
            console.error(err)
            //made an error folder and files in the view folder
            res.render('error/500')

        }
    
})
module.exports = router