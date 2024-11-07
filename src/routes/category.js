const express = require('express');
const { getAll, getByID, create, update, remove } = require('../controller/categoryController');
const router = express.Router()


router.get('/', getAll);
router.get('/:id', getByID);
router.post('/', create);
router.patch('/:id', update);
router.delete('/', remove);

module.exports = router