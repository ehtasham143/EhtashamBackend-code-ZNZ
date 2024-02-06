const Joi=require('joi')

const Schema=Joi.object({
    status:Joi.string().valid('accepted','rejected')
});


const validateUpdateStatus=(body)=>{
    return Schema.validate(body)
}


module.exports=validateUpdateStatus