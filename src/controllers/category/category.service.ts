import { Document, Model } from 'mongoose';

export class CategoryService {
    constructor(public model: Model<Document, {}>) {}
}