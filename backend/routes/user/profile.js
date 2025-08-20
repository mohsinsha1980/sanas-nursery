const express = require("express");
const router = express.Router();
const profileCtrl = require("../../controllers/user/profile");
const { userAuth } = require("../../middleware/user-auth");

router.post("/updateUserProfile", userAuth, profileCtrl.updateUserProfile);

module.exports = router;
