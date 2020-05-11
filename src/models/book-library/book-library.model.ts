import { Schema, SchemaTypes } from 'mongoose';
import { IBookLibrary } from './book-library.interface';
import { Models } from '../models.enum';

const bookLibrarySchema = new Schema<IBookLibrary>({
    name: {
        type: SchemaTypes.String,
        required: [true, 'field \'name\' is required'],
        maxlength: 64,
        minlength: 1
    },
    description: {
      type: SchemaTypes.String,
      maxlength: 255,
      minlength: 1
    },
    photo: {
        type: SchemaTypes.String,
        default: 'default.jpeg'
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'user\' is required'],
        ref: Models.USER
    }
});
