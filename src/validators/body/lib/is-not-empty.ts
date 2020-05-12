/**
 * @description short hand for required messages
 **/
export const isNotEmpty = (field: string, param?: true) => {
    return {
        errorMessage: `${param ? 'param' : 'field'} '${field}' is required`,
        options: {
            ignore_whitespace: true
        }
    };
};