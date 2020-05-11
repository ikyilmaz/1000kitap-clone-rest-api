type options = {
    fields?: string;
    populate?: {
        select?: string,
        path?: string,
        sortBy?: string,
        count?: {
            path: string
        },
        populate?: Pick<any, any>
    }
}

export type getOneWithOptions = options | options[]