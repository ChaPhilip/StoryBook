const express = require('express')
const router = express.Router()
const {ensureAuth} = require ('../middleware/auth')//we are destructuring to bring both(list of things) to perform a singular action.get both from same location simultaneously.

const Story = require('../models/Story')

//@desc Show add page
//@route GET/stories/add
//server is going to see /stories and send it to the right route of /add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('stories/add') 
       
    }) 


module.exports = router