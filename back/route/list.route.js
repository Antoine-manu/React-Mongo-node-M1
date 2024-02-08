const express = require("express");
const router = express.Router();
const listController = require("./../controller/list.controller");
const auth = require("./../middleware/auth");
const multer = require("./../middleware/multer");


router.post('/', auth, multer, listController.create);

module.exports = router;