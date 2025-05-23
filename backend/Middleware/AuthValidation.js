const Joi =require('joi')

 const registerValidation = (req,res,next)=>{
    const schema = Joi.object({
         name:Joi.string().required(),
         email:Joi.string().email().required(),
         password:Joi.string().required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message:"Invalid data",error:error.details[0].message})
    }
    next()
}
const LoginValidation = (req,res,next)=>{
    const schema = Joi.object({
         email:Joi.string().email().required(),
         password:Joi.string().required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message:"Invalid data",error:error.details[0].message})
    }
    next()
}

module.exports= {registerValidation,LoginValidation}