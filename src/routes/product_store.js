const express =  require('express');
const router = express.Router();

const product = require("../controller/productController")

router.get('/', product.getAllProductStore)
router.get('/:uuid', product.getProductStoreByID)
router.post('/', product.createProductStore)
router.get('/category/:id', product.getByIDCategory)
router.post('/search', product.getByNameAndCategory)
router.post('/barcode', product.getByBarcode)

// router.patch('/:uuid', product.update)
// router.delete('/', product.remove)

module.exports = router