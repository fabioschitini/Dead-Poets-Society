#! /usr/bin/env node
//console.log('This script populates some test games,category and plataforms to your database. Specified database as argument - e.g.: populatedb mongodb+srv://schitini:Fabiolindo1@node-projects.zykqj.mongodb.net/node-projects?retryWrites=`online`&w=majority');

//var userArgs = process.argv.slice(2);



const async = require('async')
require('dotenv').config();
const Users = require('./models/users')
const Messages = require('./models/messages')
var mongoose = require('mongoose');
var mongoDB = process.env.mongoDb
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users  = []
var messages = []



function userCreate(first_name, family_name,username,  password, status,cb){
    let userDetail={first_name, family_name,username,  password, status}
const user=new Users(userDetail)
user.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New User:`+user)
    users.push(user)
    cb(null, user)
})
}
function messageCreate(title,time,content,username,cb){
    let messageDetail={title,time,content,username,cb}
const message=new Messages(messageDetail)
message.save(function(err){
    if(err){
        cb(err,null)
        return
    }
    console.log(`New Message`+message)
    messages.push(message)
    cb(null, message)
})
}



function createUsers(cb) {
    async.series([

        function(callback) {
            userCreate("Fabio",`Schtini`,`schitini`,`yolo123`,`offline`, callback);
        },
        function(callback) {
            userCreate("Tulio",`Schtini`,`schitini123`,`yep123`,'online', callback);
        },
        function(callback) {
            userCreate("Diego",`Schtini`,`reis123`,`yepse123`,`online`, callback);
        },
        function(callback) {
            userCreate("Maisa",`Schtini`,`reis1234`,`yepse1234`,`online`, callback);
        },
        ],
        // optional callback
        cb);
}


function createMessages(cb) {
    async.parallel([
        function(callback) {
          messageCreate('Bahia e uma bosta',`01/27/2022`, ' Vei, bahia e uma bosta, tanto o estado quanto o time ', users[0], callback);
        },
        function(callback) {
            messageCreate('Bahia NAO e uma bosta',`01/28/2022`, ' Vei, bahia nao e uma bosta, temos historia e orgulho ', users[1], callback);
        },
        function(callback) {
            messageCreate('Feche teu cu',`01/28/2022`, ' Feche teu cu, mothefucker piece of shit gangbangin cocksucker', users[2], callback);
        },
        
       
        ],
        // optional callback
        cb);
}

async.series([
    createUsers,
    createMessages,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log(`worked?`);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});






