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

export const regexpAlphabetAndNumberOnly = (string) => {
    
    //return false if string is empty
    if (!string) {
        return false;
    }
    
    let matchedNumbers = string.match(/\d/g),
        matchedLetters = string.match(/[a-z]/ig);
    
    //if one of number or letter does not appear in string, test does not pass
    if (!matchedNumbers || !matchedLetters) {
        return false;
    }
    
    //if number of numbers and letters equal to string length, test passes
    if (string.length == matchedNumbers.length + matchedLetters.length) {
        return true;
    }
    
    return false;
    
};

/*
    1. accept user from passport middleware via req.user
    2. if user does not exist, reject api with status 401 unauthorised
*/
export const ensureAdmin = (req, res, next) => {
    
    if (req.user && req.user.role && req.user.role.indexOf('admin') !== -1 ) {
        return next();
    } else {
        return res.status(401).send({ error: 'Unauthorised'});
    }
};

/*
    1. accept user from passport middleware via req.user
    2. if user cannot view rebate, set req.user.isForbiddenViewingRebate = true;
*/
export const isForbiddenViewingRebate = (req, res, next) => {
    
    if (req.user && req.user.role && (req.user.role.indexOf('admin') !== -1 || (req.user.role.indexOf('financialPlanner') !== -1 && isFinancialPlannerVerified === true)) ) {
        req.isForbiddenViewingRebate = false;
        return next();
    } else {
        req.isForbiddenViewingRebate = true;
        return next();
    }
};