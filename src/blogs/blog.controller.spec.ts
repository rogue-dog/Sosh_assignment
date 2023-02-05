import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { assert } from 'console';
import { AppModule } from '../app.module';
import { User, UserSchema } from '../users/users.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.provider';
import { Blog, BlogSchema } from './blog.schema';


describe('BlogController', () => {
  let blogController: BlogController;
  let app :TestingModule;

  beforeEach(async () => {
     app = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
      imports: [
        MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AppModule
      ],
    }).compile();

    blogController = app.get<BlogController>(BlogController);
  });

  var blogData = {
    _id: '63dfcc53de2835a8dd1adf93',
    title: 'Hello WOrld,',
    description: 'NestJS Rockss!! So does NOdeJS!!',
  };
  var LoggedInUser = { id: '63dfb3e4f0a338a6c5791f85' };
  var LoggedOutUser = {id:"Random"}

  //Logged In User Tests

  describe('Logged In User Creating a Blog', () => {
    it('API should return a message along with the blog details.', async () => {
      expect(
        await blogController.createBlog({
          ...blogData,
          createdBy: LoggedInUser.id,
        }),
      ).toHaveProperty('blog_details');
    });
  });

  describe("LoggedIn User editing his blog",()=>{
    it("API should return the updated blog",async()=>{
      const new_blog ={title:"I am an awesome Backend Dev",description:"I am the best around, where is my crown"};
      const res= await blogController.updateBlog({...new_blog,createdBy:LoggedInUser.id,_id:blogData._id});
      expect(res).toHaveProperty('title',new_blog.title)
      //we are checking if the API is returning the updated blog or not
    })
  });
  describe("LoggedIn User deleting his blog",()=>{
    it("API should return the message that the blog has been deleted successfully ", async ()=>{
      const res = await blogController.deleteBlog({user_id:LoggedInUser.id,blog_id:blogData._id});
      
      expect(res).toBe('Deleted Successfully');
    })
  })

  //LoggedOut User Test

  describe('Logged Out User Creating a Blog', () => {
    it('API should return a error message ', async () => {
      expect(
        await blogController.createBlog({
          ...blogData,
          createdBy: LoggedOutUser.id,
        }),
      ).toHaveProperty('blog_details');
    });
  });

  describe('LoggedOut User editing his blog', () => {
    it('API should return the updated blog', async () => {
      const new_blog = {
        title: 'I am an awesome Backend Dev',
        description: 'I am the best around, where is my crown',
      };
      const res = await blogController.updateBlog({
        ...new_blog,
        createdBy: LoggedOutUser.id,
        _id: blogData._id,
      });
      expect(res).toHaveProperty('title', new_blog.title);
      //we are checking if the API is returning the updated blog or not
    });
  });
  describe('LoggedOut User deleting his blog', () => {
    it('API should return the message that the blog has been deleted successfully ', async () => {
      const res = await blogController.deleteBlog({
        user_id: LoggedOutUser.id,
        blog_id: blogData._id,
      });
      expect(res).toBe("Deleted Successfully");
    });
  });
  afterAll(async()=>{
   await app.close()
  })

  //Tests for Other API Endpoints
  describe("Fetching All Blogs to LoggedIn Users",()=>{
    it("API should return an array with all the blogs",async()=>{
      const res = await blogController.getAllBlogs({user_id:LoggedInUser.id});
      expect(res).toBeInstanceOf(Array);
    });
  })

  
});
