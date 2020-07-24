import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  tokenVersion?: number;
  verified?: Boolean;
  roles?: string[];
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    tokenVersion: { type: Number, default: 0 },
    roles: [{ type: String }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export the model and return your IUser interface
export const User = mongoose.model<IUser>('User', UserSchema);
