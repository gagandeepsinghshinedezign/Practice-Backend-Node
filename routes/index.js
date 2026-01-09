var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/onboarding',onboardingRouter);

module.exports = router;
