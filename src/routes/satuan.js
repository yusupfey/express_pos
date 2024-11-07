const express = require('express');
const router = express.Router();

const satuan = require("../controller/satuanController")

router.get("/", satuan.getAllSatuan);
router.get("/:id", satuan.getAllSatuanByID);
router.post("/",satuan.createSatuan);
router.patch("/:id",satuan.updateSatuan);
router.delete("/",satuan.deleteSatuan);

module.exports = router;