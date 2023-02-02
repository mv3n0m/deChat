const storeLocal = (objKey, obj) => {
    localStorage.setItem(objKey, JSON.stringify(obj))
    return obj
}

const retrieveLocal = (objKey, defaultValue) => {
    const storedValue = localStorage.getItem(objKey);
    if (!storedValue?.length) {
        if (defaultValue?.length) {
            storeLocal(objKey, defaultValue)
        }
        return defaultValue
    }

    return JSON.parse(storedValue)
};



const deleteLocal = (objKey) => {
    localStorage.removeItem(objKey)
}

export { storeLocal, retrieveLocal, deleteLocal }