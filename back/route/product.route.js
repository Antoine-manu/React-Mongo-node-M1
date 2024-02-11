const express = require("express");
const router = express.Router();
const productController = require("./../controller/product.controller");
const auth = require("./../middleware/auth");
const multer = require("./../middleware/multer");


router.get('/', productController.getAll);
router.post('/', auth, multer, productController.create);
router.put('/', auth, multer, productController.update);
router.get('/:id', auth, multer, productController.getById);
router.delete('/:id', auth, multer, productController.delete);

module.exports = router;