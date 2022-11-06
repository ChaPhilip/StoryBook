const express = require('express')
const router = express.Router()
const {ensureAuth} = require ('../middleware/auth')//we are destructuring to bring both(list of things) to perform a singular action.get both from same location simultaneously.

const Story = require('../models/Story')

//@desc Show add page
//@route GET/stories/add
//server is going to see /stories and send it to the right route of /add
router.get('/add', ensureAuth, (req,res) => {
    res.render('stories/add')
})

//@desc Process add form
//@route POST /stories
//we have to make middleware in app.js "Body Parser"

router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router