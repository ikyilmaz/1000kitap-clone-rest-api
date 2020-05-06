import { model, Schema, SchemaTypes } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    description: {
        type: SchemaTypes.String,
        default: '-'
    }
}, {
    timestamps: true
});

export const Category = model<ICategory>(Models.CATEGORY, categorySchema);