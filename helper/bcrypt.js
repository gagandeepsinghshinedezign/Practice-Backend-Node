
const bcrypt=require('bcrypt');

const generateHashedPassword=(data)=>{
    const salt= bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data,salt);
}

const comparePassword=(pass,encPass)=>{
    return bcrypt.compareSync(pass,encPass)
}

module.exports={
    generateHashedPassword,
    comparePassword
}