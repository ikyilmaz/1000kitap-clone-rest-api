import { model, Schema, SchemaTypes } from 'mongoose';
import { ICategory } from './category.interface';
import { Models } from '../models.enum';
import { setCategoryVirtuals } from './category.virtuals';

let categorySchema = new Schema({
    name: {
        type: SchemaTypes.String,
        unique: true,
        lowercase: true,
        required: true
    },
    description: SchemaTypes.String
}, {
    timestamps: true
});

setCategoryVirtuals(categorySchema)

export const Category = model<ICategory>(Models.CATEGORY, categorySchema);