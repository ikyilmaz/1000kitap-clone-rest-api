export const limitFields = (fields: string, options?: { defaults?: string[], unwantedFields?: string[] }): string => {
    if (fields) {
        const arrFields: string[] = [];

        fields.split(',').forEach(field => {
            field = field.trim();
            field = field.replace('+', ''); // we do not want plus sign

            let shouldReturn = false;

            options?.unwantedFields?.forEach(unwantedField => {
                if (field == unwantedField) shouldReturn = true;
            });

            if (shouldReturn) return;

            arrFields.push(field);
        });

        return arrFields.join(' ');

    }

    return options?.defaults ? options.defaults.join(' ') : '-__v';

};

export const paginate = (query: Pick<string, any>, options?: { pageKey?: string, limitKey?: string, defaultLimit?: number, maxLimit?: number }) => {
    let limit = +query[(options?.limitKey || 'limit')] || (options?.defaultLimit || 20);
    const page = +query[(options?.pageKey || 'page')] || 1;

    if (options?.maxLimit && limit > options.maxLimit) limit = options.maxLimit;

    const skip = (page - 1) * limit;
    console.log({ skip, limit });
    return { skip, limit };
};