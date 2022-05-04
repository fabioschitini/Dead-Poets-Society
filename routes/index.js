var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController')
const messageController=require('../controllers/messageController')
const passport = require("passport");

/* GET home page. */
router.get('/',messageController.home_get);
router.post('/',messageController.home_post);

router.get('/sign_up',checkNotAuthenticated,userController.sign_up_get);
router.post('/sign_up',userController.sign_up_post);
router.get('/log-in',checkNotAuthenticated,userController.log_in_get);
router.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
      failureFlash: true
    })
  );

  router.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
  });


router.get('/join-club',userController.join_club_get);
router.post('/join-club',userController.join_club_post);
router.get('/create-message',messageController.create_message_get);
router.post('/create-message',messageController.create_message_post);


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


module.exports = router;
