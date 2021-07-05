const express = require("express")
const router = express.Router();

const controller = require("../controllers/account");

router.get('/:email', controller.getAccount);
router.post('/create', controller.createAccount);
router.put('/update', controller.updateAccount);

module.exports = router;