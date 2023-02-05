import { Body, Controller, Get, Post, Req, Res,Put, Delete } from '@nestjs/common';
import { Request } from 'express';
import { defaultMaxListeners } from 'stream';
import { newBlog, upDatedBlog } from './blog.dto';
import { BlogService } from './blog.provider';

@Controller('api')
export class BlogController {
  constructor(private readonly service: BlogService) {}
  @Post('blog')
  async createBlog(@Body() blog_details: newBlog) {
    const result = await this.service.createBlog(blog_details);
    return result;
  }
  @Get('blog')
  async getAllBlogs(@Body() body) {
    const result = await this.service.GetAllBlogs(body.user_id);
    return result;
  }
  @Put('blog')
  async updateBlog(@Body() body: upDatedBlog) {
    const result = await this.service.UpdateBlog(body);
    return result;
  }
  @Delete('blog')
  async deleteBlog(@Body() body) {
const result = await this.service.DeleteBlog(body.blog_id, body.user_id);
  return result;
}
}
