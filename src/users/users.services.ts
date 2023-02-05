import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogIn, UserSignUp } from './users.dto';
import { User, UserDocument } from './users.schema';
import { JWT } from '../helper_functions/JWT';
@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private readonly user:Model<UserDocument>){};

    async SignUp(details : UserSignUp){
       const token =  JWT.createJwt(); //Gives a Session Token to the User
        var user_details = {...details,token};
       const doc=await this.user.findOne({email:user_details.email});
       if(doc)return {status:402,msg:"User with this email already exists"}; 
        await this.user.create(user_details);
        return {status :201,msg:"User Signed Up Successfully!"}
    }
    async Login(details:UserLogIn){
        const token = JWT.createJwt();
        const doc = await this.user.findOneAndUpdate(details,{token},{new:true}).lean().exec();
        if(!doc)return {status:404,msg:"Invalid Credentials"};
        return {status:200,msg:"logged In",user_details:doc}
    }


}