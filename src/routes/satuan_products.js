const express = require('express');

const router = express.Router();
const satuan_controller = require('../controller/SatuanProductController')
router.get('/:id', satuan_controller.getByIDProduct)
router.post('/', satuan_controller.create)

module.exports = router;