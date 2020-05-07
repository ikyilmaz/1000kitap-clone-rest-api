import { HookNextFunction, Model, Schema, SchemaTypes } from 'mongoose';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
import { Models } from '../models.enum';
import { raw } from 'express';


const userSchema = new Schema<IUser>({
    firstName: {
        type: SchemaTypes.String,
        minlength: [2, 'field \'firstName\' must contains at least 2 characters'],
        maxlength: [32, 'field \'firstName\' must contain no more than 32 characters'],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: SchemaTypes.String,
        minlength: [2, 'field \'lastName\' must contains at least 2 characters'],
        maxlength: [32, 'field \'lastName\' must contain no more than 32 characters'],
        lowercase: true,
        trim: true
    },
    isActive: {
        type: SchemaTypes.Boolean,
        default: true
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: SchemaTypes.String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    username: {
        type: SchemaTypes.String,
        minlength: [2, 'field \'username\' must contains at least 2 characters'],
        maxlength: [32, 'field \'username\' must contain no more than 32 characters'],
        trim: true,
        unique: true,
        required: [true, 'field \'username\' is required'],
        validate: (value: string) => validator.isAlphanumeric(value, 'en-US')
    },
    email: {
        type: SchemaTypes.String,
        trim: true,
        unique: true,
        required: [true, 'field \'email\' is required'],
        validate: {
            message: 'field \'email\' must be a valid email address',
            validator: (value: string) => validator.isEmail(value)
        }
    },
    password: {
        type: SchemaTypes.String,
        required: [true, 'field \'password\' is required'],
        select: false
        // validate: {
        //     message: 'field \'password\' must be hashed',
        //     validator: (value: string) => validator.isHash(value, 'sha256')
        // }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

userSchema.pre<IUser>('save', async function(next: HookNextFunction) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // go go go go
    next();
});

userSchema.pre<Model<IUser, { id: string }>>(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 12);

userSchema.methods.comparePasswords = (candidatePassword, hashedPassword) => bcrypt.compare(candidatePassword, hashedPassword);

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
        return +JWTTimestamp < changedTimestamp;
    }

    return false;
};

export const User = mongoose.model<IUser>(Models.USER, userSchema);

