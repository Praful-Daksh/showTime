const Joi = require('joi')

const createEventValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        date: Joi.date().required(),
        description: Joi.string(),
        city: Joi.string().required(),
        venue: Joi.string().required(),
        access: Joi.string().required(),
        publish: Joi.boolean()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400)
            .json({ message: "Incomplete data", error: error.details[0].message })
    }
    next()
}

const publishEventValidation = (req, res, next) => {
    const schema = Joi.object({
        ticketData: Joi.object({
            ticketName: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            ticketTypes: Joi.array().required(),
            lastDate: Joi.date().required(),
            vipPrice: Joi.number(),
            vipQuantity: Joi.number()
        }),
        eventData: Joi.object({
            title: Joi.string().required(),
            date: Joi.date().required(),
            description: Joi.string(),
            city: Joi.string().required(),
            venue: Joi.string().required(),
            access: Joi.string().required(),
            publish: Joi.boolean()
        }).unknown(true)
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400)
            .json({ message: "Incomplete data", error: error.details[0].message })
    }
    next()
}


module.exports = {
    createEventValidation,
    publishEventValidation
}