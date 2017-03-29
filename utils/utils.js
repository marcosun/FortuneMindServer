export const filterObjectWithKeys = (object = {}, keys = []) => {
    //accept array of keys
    let filteredObject = {};
    
    for (let key of keys) {
        
        if (object[key] !== undefined) {
            filteredObject[key] = object[key];
        }
    }
    
    return filteredObject;
}