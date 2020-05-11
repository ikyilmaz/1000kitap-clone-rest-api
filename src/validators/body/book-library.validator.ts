import { checkSchema } from "express-validator";

const createOrUpdate = (isCreate: boolean) => checkSchema({
    name: {
        isString: {

        },

    }
})

export const bookLibraryValidator = {
    createOrUpdate
}