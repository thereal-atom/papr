const express = require("express")
const router = express.Router();

const controller = require("../controllers/position");

router.get('/', controller.getPositions);
router.post('/', controller.buyPosition);
router.delete('/:id', controller.sellPosition);

module.exports = router;