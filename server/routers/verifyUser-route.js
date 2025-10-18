const express=require('express')
const {VerifyUser}=require("../utils/verifyInitData.js")
const route=express.Router()

route.post("/user",VerifyUser)

module.exports=route