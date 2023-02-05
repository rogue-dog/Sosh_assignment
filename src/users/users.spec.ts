import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UserService } from './users.services';

describe('UserController', () => {
  let userController: UserController;
  let app :TestingModule;

  beforeEach(async () => {
     app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AppModule
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    
  })
  const newUser = {
    name: 'Keshav',
    email: 'g@e.deop',
    password: 'abcdefg',
  };
  describe("New User Signing Up",()=>{
    it("API should return status 201",async ()=>{
        const res = await userController.signUp(newUser);
        expect(res).toHaveProperty("status",201)
    })
  })
  describe('User Logging In', () => {
    it('API should return status 200 along with User Details', async () => {
      const res = await userController.Login({email:newUser.email,password:newUser.password});
      expect(res).toHaveProperty('status', 200);
    });
  });
})
