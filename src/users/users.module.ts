import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UserController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UserService } from './users.services';

@Module({
    providers:[UserService],
    controllers:[UserController],
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    exports:[UserModule]
})
export class UserModule{}