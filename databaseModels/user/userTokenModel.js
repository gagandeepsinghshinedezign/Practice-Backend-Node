const {mongoose,Schema}=require('mongoose')

const userTokenSchema=new Schema({
userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
token:{
    type:String,
    trim:true,
},
type:{
    type:String,
    enum:["EMAIL_VERIFICATION","PASSWORD_RESET"],
    required:true
},
},{timestamps:true})

const UserTokenModel=mongoose.model('UserToken',userTokenSchema)
module.exports=UserTokenModel