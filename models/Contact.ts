import mongoose, { Schema, models, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    firstContactDate: { type: Date, default: Date.now },
    messages: { type: [MessageSchema], default: [] },
  },
  { timestamps: true }
);

export const Contact = models.Contact || model('Contact', ContactSchema);
