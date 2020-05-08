export const filterObject = (obj: { [key: string]: any }, ...allowedFields: string[]) => {
    const newObj: Partial<{ [key: string]: any}> = {};
    Object.keys(obj).forEach(el => allowedFields.includes(el) ? newObj[el] = obj[el] : null);
    return newObj;
};