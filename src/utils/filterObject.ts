export const filterObject = (obj: { [key: string]: string }, ...allowedFields: string[]) => {
    const newObj: Partial<{ [key: string]: string }> = {};
    Object.keys(obj).forEach(el => allowedFields.includes(el) ? newObj[el] = obj[el] : null);
    return newObj;
};