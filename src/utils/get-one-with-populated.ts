import { getOneWithOptions } from '../types/types';
import { paginate } from './api-features-funcs';
import { DocumentQuery } from 'mongoose';

/**
 * @description short hand for populating user data with mongoose
 * */
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
        if (option && !Array.isArray(option) && option.populate) {
            documentQuery.populate({
                path: option.populate.path,
                select: option.populate.select,
                option: {
                    ...paginate(query),
                    sort: option.populate.sortBy || '-createdAt'
                },
                populate: option.populate.populate ? option.populate.populate : undefined
            });

            if (option.populate.count) documentQuery.populate(option.populate.count.path);
        }
    };

    if (options && !Array.isArray(options)) populate(options);
    else if (options && Array.isArray(options)) options.forEach(option => populate(option));
};