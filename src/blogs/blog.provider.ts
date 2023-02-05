import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { JWT } from 'src/helper_functions/JWT';
import { User, UserDocument } from 'src/users/users.schema';
import { newBlog, upDatedBlog } from './blog.dto';
import { Blog, BlogDocument } from './blog.schema';
@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blog: Model<BlogDocument>, @InjectModel(User.name) private readonly user:Model<UserDocument>
  ) {}
private async checkLogin(user_id:string){
  try{
    const res = await this.user
      .findById(user_id, { token: 1 })
      .lean()
      .exec();

    if (!res) return false;
    const valid = JWT.verifyJwt(res.token);
    if (!valid) return false;
    return true;
  }
    catch{
      console.log("error")
        return false
      }
}
  async GetAllBlogs(user_id) {
    if(!await this.checkLogin(user_id))return "Invalid/Expired Token"
    return await this.blog.find().lean().exec();
  }
  async createBlog(details:newBlog){
    var r =await  this.checkLogin(details.createdBy);
    console.log("r",r);
if (!r) return 'Invalid/Expired Token';
const date = new Date();
var new_details={...details,createdOn:date}
const doc =await this.blog.create(new_details);
return{msg:"Blog Created Successfully",blog_details:doc}

  }
  async UpdateBlog(details: upDatedBlog) {
    if (!await this.checkLogin(details.createdBy)) return 'Invalid/Expired Token';
    const res = await this.blog.findById(details._id,{createdBy:1}).lean().exec();
    if(!res)return "Invalid User";
    if(res.createdBy!==details.createdBy)return "Invalid User2"
    const doc = await this.blog.findByIdAndUpdate(details._id,{title:details.title,description:details.description},{new:true}).lean().exec();
    return doc
  }
  async DeleteBlog(blog_id:string,user_id:string){
        if (!await this.checkLogin(user_id)) return 'Invalid/Expired Token';
        const result = await this.blog
          .findById(blog_id, { createdBy: 1 })
          .lean()
          .exec();
          if(!result)return "Invalid Blog"
        if (result.createdBy !== user_id) return 'Invalid User';
        const res = await this.blog.findByIdAndDelete(blog_id).lean().exec();
        return "Deleted Successfully";
  }
}
