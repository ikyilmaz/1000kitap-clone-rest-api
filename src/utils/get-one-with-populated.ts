import { getOneWithOptions } from '../types/types';
import { paginate } from './api-features-funcs';
import { DocumentQuery } from 'mongoose';

export const getOneWithPopulated = (
    {
        documentQuery,
        query,
        options
    }: {
        documentQuery: DocumentQuery<any, any>,
        options: getOneWithOptions,
        query: Pick<any, any>
    }) => {

    const populate = (option: getOneWithOptions) => {
        if (options && !Array.isArray(options)) {
            documentQuery.populate({
                path: options.populate.path,
                select: options.populate.select,
                options: {
                    ...paginate(query),
                    sort: options.populate.sortBy || '-createdAt'
                },
                populate: options.populate.populate ? options.populate.populate : undefined
            });

            if (options.populate.count) documentQuery.populate(options.populate.count.path);
        }
    };

    if (options && !Array.isArray(options)) populate(options);
    else if (options && Array.isArray(options)) options.forEach(option => populate(option));
};