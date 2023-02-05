import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { newBlog } from './blog.dto';
import { BlogService } from './blog.provider';


describe('BlogController', () => {
  let blogController: BlogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();

    blogController = app.get<BlogController>(BlogController);
  });

  var blogData ={title:"Hello World",description:"C++ is cooool! "}
  var LoggedInUser = { id: '63dfcfbada8488289686d5dc' };
  var LoggedOutUser = {id:"Random"}

  describe('Logged In User Creating a Blog', () => {
    it('should return "Hello World!"', () => {
      expect(blogController.createBlog({...blogData,createdBy:LoggedInUser.id})).toHaveProperty('blog_details')
    });
  });
});
