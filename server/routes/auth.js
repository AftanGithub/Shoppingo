const express = require("express");

const router = express.Router();
//importing middlewares
const {authCheck,adminCheck} = require('../middlewares/auth');
//importing contollers
const {createOrUpdateUser,currentUser} = require('../controllers/auth');
router.post("/create-or-update-user",authCheck, createOrUpdateUser);
router.post("/current-user",authCheck, currentUser);
router.post("/current-admin",authCheck,adminCheck, currentUser);
module.exports = router;
