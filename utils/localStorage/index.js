const storeLocal = (objKey, obj) => {
    localStorage.setItem(objKey, JSON.stringify(obj))
}

const retrieveLocal = (objKey) => (
    JSON.parse(localStorage.getItem(objKey))
)

const deleteLocal = (objKey) => {
    localStorage.removeItem(objKey)
}

export { storeLocal, retrieveLocal, deleteLocal }