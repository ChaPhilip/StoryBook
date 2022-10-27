//this is to protect the user from going to different pages/routes
//middle man to see if you have access to access the page if not get the boot
//securing 

module.exports={
    ensureAuth: function(req, res,next){
        if(req.isAuthenticated()){
            return next() //if yes go to the next middleware
        }else{
            res.redirect('/')//if no take to homepage, to log in
        }
    },
    ensureGuest: function (req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else{
            return next() // dont need to go to homepage b/c theyre already logged in
        }
    }
}

//go to routes(index.js) to link the middleware route