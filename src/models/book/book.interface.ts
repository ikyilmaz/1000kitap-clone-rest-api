import { Types } from 'mongoose';
import { IAuthor } from '../author/author.interface';
import { ICategory } from '../category/category.interface';
import { IBaseModel } from '../base-model.interface';

export interface IBook extends IBaseModel {
    title: string;
    printDate: number;
    author: IAuthor | Types.ObjectId;
    numberOfPages: number;
    format: string;
    ISBN: bigint;
    category: ICategory | Types.ObjectId;
    language: string;
    country: string;
    publisher: string;
    edition: number;
}