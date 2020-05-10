export type getOneWithOptions = {
    fields?: string;
    populate: {
        select?: string,
        path: string,
        sortBy?: string,
        populateWithCount?: {
            path: string
        }
    }
}