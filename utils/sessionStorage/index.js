const storeLocal = (objKey, obj) => {
    sessionStorage.setItem(objKey, JSON.stringify(obj))
}

const retrieveLocal = (objKey) => (
    JSON.parse(sessionStorage.getItem(objKey))
)

const deleteLocal = (objKey) => {
    sessionStorage.removeItem(objKey)
}

export { storeLocal, retrieveLocal, deleteLocal }