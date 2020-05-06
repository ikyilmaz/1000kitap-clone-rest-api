import { Types, Document } from 'mongoose';

export interface IBaseModel extends Document {
    id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}