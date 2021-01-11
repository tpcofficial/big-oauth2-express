//Require the OAuth2 library
const OAuth2Lib = require('big-oauth2');

//Require express router
const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.send(400).json({error:400,description:'Not a valid method, available methods are: '});
});

// This project will not be worked on until we have a functioning version of big-oauth2

module.exports = router;