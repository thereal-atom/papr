const express = require("express")
const router = express.Router();

const controller = require("../controllers/position");

router.get('/:accId', controller.getPositions);
router.post('/', controller.buyPosition);
router.delete('/:accId/:id', controller.sellPosition);

module.exports = router;