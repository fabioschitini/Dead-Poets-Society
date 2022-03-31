var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController')
const messageController=require('../controllers/messageController')

/* GET home page. */
router.get('/',messageController.home_get);
router.post('/',messageController.home_post);

router.get('/sign_up',userController.sign_up_get);
router.post('/sign_up',userController.sign_up_post);
router.get('/log-in',userController.log_in_get);
router.get('/join-club',userController.join_club_get);
router.post('/join-club',userController.join_club_post);
router.get('/create-message',messageController.create_message_get);
router.post('/create-message',messageController.create_message_post);



module.exports = router;
