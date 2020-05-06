import { Types } from 'mongoose';
import { IBaseModel } from '../base-model.interface';

export interface ICategory extends IBaseModel{
    id: Types.ObjectId;
    name: string;
    description?: string;
}