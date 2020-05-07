import { model, Schema, SchemaTypes } from 'mongoose';
import { ICategory } from './category.interface';
import { Models } from '../models.enum';

const categorySchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    description: SchemaTypes.String
}, {
    timestamps: true
});

categorySchema.virtual('books', {
    ref: Models.BOOK,
    foreignField: 'category',
    localField: '_id'
});

export const Category = model<ICategory>(Models.CATEGORY, categorySchema);