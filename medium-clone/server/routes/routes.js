const express = require("express");
const user = require('../controllers/user.controllers');

var router = express.Router();

router.post('/signup', user.signup)

module.exports = router;
