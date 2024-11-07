const express =  require('express');
const router = express.Router();

const order = require('../controller/orderController');


router.post('/',order.create);

module.exports = router;