import { Schema } from 'mongoose';

const favoriteBookSchema = new Schema({
    user: {

    },
    book: {

    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});