var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user:req.user });
});

router.get('/sign_up',userController.sign_up_get);

router.post('/sign_up',userController.sign_up_post);

router.get('/log-in',userController.log_in_get);
//router.post('/log-in',userController.log_in_post);
router.get('/join-club',userController.join_club_get);
router.post('/join-club',userController.join_club_post);



module.exports = router;
