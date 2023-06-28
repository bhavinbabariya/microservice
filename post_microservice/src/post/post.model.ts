import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  postedBy: number;

  @Prop({ type: [{ userId: Number }], default: [] })
  likes: { userId: number }[];

  @Prop({
    type: [{ userId: Number, commentData: String }],
    default: [],
  })
  comments: { userId: number; commentData: string }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
