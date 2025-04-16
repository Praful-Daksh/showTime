import User from '../models/Users.js'

const signUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(409)
            .json({message: 'User is already registered',sucess: false})
        }
        const userMode = new User(name,email,password)
    }catch(err){

    }
}

export default signUp