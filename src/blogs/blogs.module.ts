import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/users.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.provider';
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogsModule {}
