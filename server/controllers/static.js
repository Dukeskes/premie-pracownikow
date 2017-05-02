/**
 * Created by BartDukes on 22.07.2016.
 */
var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../../assets'));
router.use(express.static(__dirname + '/../../templates'));

module.exports = router;