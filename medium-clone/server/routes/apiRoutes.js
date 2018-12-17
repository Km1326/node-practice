const express = require("express");
const user = require('../controllers/user.controllers');

var router = express.Router();

router.post('/login', user.login)

module.exports = router;
