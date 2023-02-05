import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ maxlength: 80, required: true })
  title: string;
  @Prop({ minlength: 4, required: true })
  description: string;

  @Prop({ required: true,type:mongoose.Types.ObjectId })
  createdBy: string;

  @Prop({required:true,})
  createdOn :Date
}
export const BlogSchema = SchemaFactory.createForClass(Blog);