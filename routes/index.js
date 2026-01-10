var express = require('express');
var router = express.Router();
const onboardingRouter=require('../app/v1/onBoarding/router')

/* GET home page. */
router.use('/onboarding',onboardingRouter);

module.exports = router;
