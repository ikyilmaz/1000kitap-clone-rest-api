import { IBaseModel } from '../base-model.interface';

export interface IAuthor extends IBaseModel {
    firstName: string;
    lastName: string;
    placeOfBirth: string;
    birthday: string;
    image: string;
    biography: string;
    title: string;
}