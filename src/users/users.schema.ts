import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserModule } from './users.module';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({maxlength:80,required:true})
    name:string
    @Prop({minlength:4,required:true})
    password:string

    @Prop({required:true})
    email:string
    @Prop({required:true})
    token:string

}
export const UserSchema = SchemaFactory.createForClass(User);