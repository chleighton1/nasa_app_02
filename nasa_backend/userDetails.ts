import mongoose, { Schema, Document } from 'mongoose';

interface IUserDetails extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const UserDetailsSchema: Schema<IUserDetails> = new Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

export const UserModel = mongoose.model<IUserDetails>('UserInfo', UserDetailsSchema);
