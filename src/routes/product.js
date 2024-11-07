const express =  require('express');
const router = express.Router();

const product = require("../controller/productController")

router.get('/', product.getAll)
router.get('/:uuid', product.getByID)
router.post('/', product.create)
router.patch('/:uuid', product.update)
router.delete('/', product.remove)

module.exports = router