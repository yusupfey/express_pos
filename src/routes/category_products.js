const express = require('express')

const router = express.Router();
const categoryProduct = require('../controller/categoryProductController')

router.post('/', categoryProduct.create)
router.get('/:id', categoryProduct.getByIDProduct)

module.exports = router