const express = require('express');
const router = express.Router()

const Entity = require('../controller/entityController')

router.get('/', Entity.getAll)
router.get('/:uuid', Entity.getByID)
router.post('/', Entity.create)
router.patch('/:uuid', Entity.update)
router.delete('/', Entity.remove)

module.exports = router