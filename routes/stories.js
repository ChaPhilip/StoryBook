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
//@Route POST /stories
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

//@desc Showw all public stories
//@Route GET /stories
router.get('/', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
        res.render('stories/index', {
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc Show single story
//@Route GET /stories/:id
router.get('/:id', ensureAuth, async (req,res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()
        
        if (!story) {
            return res.render('error/404')
            }
        
        res.render('stories/show', {
            story
        })
        } catch (err) {
            console.error(err)
            res.render('error/404')
        }
})

//@desc Show edit Page
//@route Get /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req,res) => {
    try{
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()
    
    if(!story) {
        return res.render('error/400')

    }

    if(story.user != req.user.id) {
        res.redirect('/stories')
    }else{
        res.render('stories/edit',{
            story,
        }) 
    }
} catch(err) {
    console.error(err)
    return res.render('error/500')
}
})


//@desc Update story
//@route PUT /stories/:id
router.put('/:id', ensureAuth, async (req,res) => {
    try{
        let story = await Story.findById(req.params.id).lean()

        if(!story) {
            return res.render('error/404')
        }

        if(story.user != req.user.id) {
            res.redirect('/stories')
        } else {
        story = await Story.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })

        res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


//@desc Delete Story
//@route Get /stories/user/:Id
router.delete('/:id', ensureAuth, async (req,res) => {
    try{
        await Story.remove({_id: req.params.id})
        res.redirect('/dashboard')

    }catch(err){
        console.error(err)
        return res.render('error/500')

    }
})

//@desc User Stories
//@route Get /stories/user/:userId

router.get('/user/:userId', ensureAuth, async (req,res) => {
    try{
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'

        })
        .populate('user')
        .lean()

        res.render('stories/index', {
            stories
        })
    

}catch (err){
    console.error(err)
    res.render('erorr/500')

}
})


module.exports = router