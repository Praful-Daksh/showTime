const Joi = require('joi')

const createEventValidation = (req,res,next)=>{
    const schema = Joi.object({
        title:Joi.string().required(),
        date:Joi.date().required(),
        user:Joi.string().id().required(),
        city:Joi.string().required(),
        venue:Joi.string().required(),
        access:Joi.string().required(),
        publish:Joi.boolean().required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message:"Invalid data",error:error.details[0].message})
    }
    next()
}

module.exports = createEventValidation