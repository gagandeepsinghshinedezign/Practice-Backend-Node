const { generatePassword } = require("../../../../wagersBackend/helper/bcrypt");
const { profileLastActivity, otpTypes } = require("../../../constants/enum");
const { statusCode } = require("../../../constants/statusCode");
const { UserModel } = require("../../../databaseModels");

module.exports = {
  /**
   * @description signup controller
   */
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;

      if (!email) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send("email must be required.");
      }

      if(password!==confirmPassword){
        return res.status(statusCode.BAD_REQUEST).send("Password and confirm password not match.")
      }

      const isUserExist = await UserModel.findOne(email);

      if (isUserExist) {
        const isVerified=isUserExist.isVerified
        if(isVerified){
            return res.status(statusCode.BAD_REQUEST).send("User already exist.");
        }
        
      }

      const hashedPassword = generatePassword(password)
      const otp=generateOtp(4,true)


      const user=await UserModel.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        lastActivity:profileLastActivity.SIGNUP
      })

      const createdUser=user[0]

      const userToken=await UserTokenModel.create({
        userId:createdUser._id,
        token:otp,
        type:otpTypes.SignUp
      })



      return res
        .status(statusCode.CREATED)
        .send("User created successfully.")
    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  },
};
