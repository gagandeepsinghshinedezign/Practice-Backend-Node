const express=require('express')
const router=express.Router()
const validator=require('./validator')
const controller=require('./controller')

/**
 * @description signup
 */
router.post('/signup',validator.validateSignup,controller.signup)

module.exports=router